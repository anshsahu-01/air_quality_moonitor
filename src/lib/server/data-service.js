import { buildDashboardSnapshot, calculateAqi, movingAverage } from "@/lib/air-quality";
import dbConnect from "./db";
import Node from "@/models/Node";
import { SAMPLE_NODES } from "@/lib/sample-data";

/**
 * Ensures MongoDB is connected, and seeds the db with SAMPLE_NODES if it is empty.
 */
async function initializeDb() {
  await dbConnect();
  const count = await Node.countDocuments();
  if (count === 0) {
    console.log("Database is empty. Seeding with sample data...");
    await Node.insertMany(SAMPLE_NODES);
  }
}

function getStore() {
  if (!globalThis.__airQualitySubscribers) {
    globalThis.__airQualitySubscribers = new Set();
  }
  return globalThis.__airQualitySubscribers;
}

function emitSnapshot(snapshot) {
  const subscribers = getStore();
  for (const subscriber of subscribers) {
    subscriber(snapshot);
  }
}

export async function getDashboardSnapshot() {
  await initializeDb();
  const persistedNodes = await Node.find().lean();
  
  // Clean up MongoDB _id and ensure proper formatting for the frontend app
  const cleanNodes = persistedNodes.map(node => {
    const { _id, __v, ...rest } = node;
    return {
      ...rest,
      // Date formatting normalization since DB returns Date objects
      updatedAt: new Date(node.updatedAt).toISOString(),
      history: node.history?.map(h => ({
        ...h,
        _id: undefined,
        timestamp: new Date(h.timestamp).toISOString()
      })) || []
    };
  });

  return buildDashboardSnapshot(cleanNodes);
}

export function subscribeToSnapshots(listener) {
  const subscribers = getStore();
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export async function ingestAirQualityReading(payload) {
  await initializeDb();
  
  const existingDoc = await Node.findOne({ nodeId: payload.nodeId });
  const timestamp = new Date().toISOString();
  
  // Merge and maintain only the last 8 entries based on the existing history
  const historySeed = existingDoc ? existingDoc.history.map(h => h.toObject()) : [];
  const readingEntry = {
    pm25: payload.pm25,
    co: payload.co,
    no2: payload.no2,
    timestamp,
  };
  const mergedHistory = [...historySeed, readingEntry].slice(-8);
  const aqiSeries = mergedHistory.map((item) => calculateAqi(item));
  
  const historyWithCalcs = mergedHistory.map((entry, index) => ({
    ...entry,
    aqi: aqiSeries[index],
    predictedAqi: movingAverage(aqiSeries.slice(0, index + 1), 4),
  }));

  const nextNodeData = {
    nodeId: payload.nodeId,
    location: payload.location,
    latitude: payload.latitude ?? existingDoc?.latitude ?? 28.6139,
    longitude: payload.longitude ?? existingDoc?.longitude ?? 77.209,
    pm25: payload.pm25,
    co: payload.co,
    no2: payload.no2,
    deviceEnabled: existingDoc?.deviceEnabled ?? false,
    updatedAt: timestamp,
    history: historyWithCalcs,
  };

  // Upsert into MongoDB
  await Node.findOneAndUpdate(
    { nodeId: payload.nodeId },
    { $set: nextNodeData },
    { upsert: true, new: true }
  );

  const snapshot = await getDashboardSnapshot();
  emitSnapshot(snapshot);
  return snapshot;
}

export async function updateDeviceState(nodeId, enabled) {
  await initializeDb();
  
  const node = await Node.findOne({ nodeId });
  if (!node) {
    throw new Error("Node not found");
  }

  node.deviceEnabled = enabled;
  node.updatedAt = new Date();
  await node.save();

  const snapshot = await getDashboardSnapshot();
  emitSnapshot(snapshot);
  return snapshot;
}

export async function injectDemoPulse() {
  await initializeDb();
  
  // Pick random node from MongoDB
  const nodes = await Node.find().lean();
  let target;
  if (nodes.length > 0) {
    target = nodes[Math.floor(Math.random() * nodes.length)];
  } else {
    target = SAMPLE_NODES[0];
  }

  const nextPayload = {
    nodeId: target.nodeId,
    location: target.location,
    latitude: target.latitude,
    longitude: target.longitude,
    pm25: Math.max(12, Math.round(target.pm25 + (Math.random() * 24 - 8))),
    co: Number(Math.max(1.5, target.co + (Math.random() * 2 - 0.6)).toFixed(1)),
    no2: Math.max(8, Math.round(target.no2 + (Math.random() * 8 - 2))),
  };

  return ingestAirQualityReading(nextPayload);
}
