import { buildDashboardSnapshot, calculateAqi, movingAverage } from "@/lib/air-quality";
import { getFirebaseAdminDb } from "@/lib/firebase-admin";
import { SAMPLE_NODES } from "@/lib/sample-data";

function getStore() {
  if (!globalThis.__airQualityStore) {
    globalThis.__airQualityStore = {
      nodes: new Map(SAMPLE_NODES.map((node) => [node.nodeId, node])),
      subscribers: new Set(),
    };
  }

  return globalThis.__airQualityStore;
}

function syncStoreFromNodes(nodes) {
  const store = getStore();
  store.nodes = new Map(nodes.map((node) => [node.nodeId, node]));
  return store;
}

function emitSnapshot(snapshot) {
  const store = getStore();
  for (const subscriber of store.subscribers) {
    subscriber(snapshot);
  }
}

async function readFirebaseNodes() {
  const db = getFirebaseAdminDb();
  if (!db) return null;

  try {
    const snapshot = await db.collection("air-quality-nodes").get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error reading from Firebase:", error.message);
    return null;
  }
}

async function persistNodeToFirebase(node) {
  const db = getFirebaseAdminDb();
  if (!db) return;

  try {
    await db.collection("air-quality-nodes").doc(node.nodeId).set(node, { merge: true });
  } catch (error) {
    console.error("Error persisting to Firebase:", error.message);
  }
}

export async function getDashboardSnapshot() {
  const persistedNodes = await readFirebaseNodes();
  if (persistedNodes?.length) {
    syncStoreFromNodes(persistedNodes);
    return buildDashboardSnapshot(persistedNodes);
  }

  const store = getStore();
  return buildDashboardSnapshot(Array.from(store.nodes.values()));
}

export function subscribeToSnapshots(listener) {
  const store = getStore();
  store.subscribers.add(listener);
  return () => store.subscribers.delete(listener);
}

export async function ingestAirQualityReading(payload) {
  const store = getStore();
  const existing = store.nodes.get(payload.nodeId);
  const timestamp = new Date().toISOString();
  const historySeed = existing?.history ?? [];
  const readingEntry = {
    pm25: payload.pm25,
    co: payload.co,
    no2: payload.no2,
    timestamp,
  };
  const mergedHistory = [...historySeed, readingEntry].slice(-8);
  const aqiSeries = mergedHistory.map((item) => calculateAqi(item));
  const nextNode = {
    nodeId: payload.nodeId,
    location: payload.location,
    latitude: payload.latitude ?? existing?.latitude ?? 28.6139,
    longitude: payload.longitude ?? existing?.longitude ?? 77.209,
    pm25: payload.pm25,
    co: payload.co,
    no2: payload.no2,
    deviceEnabled: existing?.deviceEnabled ?? false,
    updatedAt: timestamp,
    history: mergedHistory.map((entry, index) => ({
      ...entry,
      aqi: aqiSeries[index],
      predictedAqi: movingAverage(aqiSeries.slice(0, index + 1), 4),
    })),
  };

  store.nodes.set(nextNode.nodeId, nextNode);
  await persistNodeToFirebase(nextNode);

  const snapshot = await getDashboardSnapshot();
  emitSnapshot(snapshot);
  return snapshot;
}

export async function updateDeviceState(nodeId, enabled) {
  const store = getStore();
  let node = store.nodes.get(nodeId);

  if (!node) {
    const persistedNodes = await readFirebaseNodes();
    if (persistedNodes?.length) {
      syncStoreFromNodes(persistedNodes);
      node = getStore().nodes.get(nodeId);
    }
  }

  if (!node) {
    throw new Error("Node not found");
  }

  const nextNode = {
    ...node,
    deviceEnabled: enabled,
    updatedAt: new Date().toISOString(),
  };

  store.nodes.set(nodeId, nextNode);
  await persistNodeToFirebase(nextNode);

  const snapshot = await getDashboardSnapshot();
  emitSnapshot(snapshot);
  return snapshot;
}

export async function injectDemoPulse() {
  const store = getStore();
  const nodes = Array.from(store.nodes.values());
  const target = nodes[Math.floor(Math.random() * nodes.length)] ?? SAMPLE_NODES[0];

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