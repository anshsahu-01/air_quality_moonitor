import { calculateAqi, movingAverage } from "@/lib/air-quality";

const now = Date.now();

function makeHistory(points) {
  return points.map((point, index) => {
    const timestamp = new Date(now - (points.length - index) * 15 * 60 * 1000).toISOString();
    const aqi = calculateAqi(point);
    return {
      ...point,
      aqi,
      predictedAqi: movingAverage([aqi, aqi + 6], 2),
      timestamp,
    };
  });
}

export const SAMPLE_NODES = [
  {
    nodeId: "Node1",
    location: "Rajwada",
    latitude: 22.7185,
    longitude: 75.8553,
    pm25: 110,
    co: 9,
    no2: 25,
    deviceEnabled: true,
    updatedAt: new Date(now - 3 * 60 * 1000).toISOString(),
    history: makeHistory([
      { pm25: 82, co: 7, no2: 20 },
      { pm25: 91, co: 7.5, no2: 21 },
      { pm25: 98, co: 8, no2: 23 },
      { pm25: 104, co: 8.5, no2: 24 },
      { pm25: 110, co: 9, no2: 25 },
    ]),
  },
  {
    nodeId: "Node2",
    location: "Palasia",
    latitude: 22.7244,
    longitude: 75.8839,
    pm25: 62,
    co: 5.5,
    no2: 18,
    deviceEnabled: false,
    updatedAt: new Date(now - 5 * 60 * 1000).toISOString(),
    history: makeHistory([
      { pm25: 48, co: 4.3, no2: 15 },
      { pm25: 52, co: 4.8, no2: 16 },
      { pm25: 57, co: 5, no2: 17 },
      { pm25: 60, co: 5.2, no2: 18 },
      { pm25: 62, co: 5.5, no2: 18 },
    ]),
  },
  {
    nodeId: "Node3",
    location: "Bhawarkuan",
    latitude: 22.6916,
    longitude: 75.8672,
    pm25: 160,
    co: 12.7,
    no2: 32,
    deviceEnabled: true,
    updatedAt: new Date(now - 7 * 60 * 1000).toISOString(),
    history: makeHistory([
      { pm25: 140, co: 10.1, no2: 29 },
      { pm25: 145, co: 11.2, no2: 30 },
      { pm25: 152, co: 12.4, no2: 31 },
      { pm25: 158, co: 12.5, no2: 32 },
      { pm25: 160, co: 12.7, no2: 32 },
    ]),
  },
  {
    nodeId: "Node4",
    location: "Vijay Nagar",
    latitude: 22.7533,
    longitude: 75.8937,
    pm25: 34,
    co: 2.7,
    no2: 12,
    deviceEnabled: false,
    updatedAt: new Date(now - 7 * 60 * 1000).toISOString(),
    history: makeHistory([
      { pm25: 28, co: 2.1, no2: 9 },
      { pm25: 31, co: 2.2, no2: 10 },
      { pm25: 33, co: 2.4, no2: 11 },
      { pm25: 32, co: 2.5, no2: 12 },
      { pm25: 34, co: 2.7, no2: 12 },
    ]),
  },
  {
    nodeId: "Node5",
    location: "Annapurna",
    latitude: 22.6961,
    longitude: 75.8436,
    pm25: 45,
    co: 3.5,
    no2: 14,
    deviceEnabled: true,
    updatedAt: new Date(now - 4 * 60 * 1000).toISOString(),
    history: makeHistory([
      { pm25: 40, co: 3.1, no2: 12 },
      { pm25: 42, co: 3.2, no2: 13 },
      { pm25: 43, co: 3.4, no2: 14 },
      { pm25: 44, co: 3.5, no2: 14 },
      { pm25: 45, co: 3.5, no2: 14 },
    ]),
  },
];
