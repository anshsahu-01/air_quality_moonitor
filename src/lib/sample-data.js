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
    location: "College Gate",
    latitude: 28.6129,
    longitude: 77.2295,
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
    location: "Central Market",
    latitude: 28.6304,
    longitude: 77.2177,
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
    location: "Metro Station",
    latitude: 28.621,
    longitude: 77.205,
    pm25: 34,
    co: 2.7,
    no2: 12,
    deviceEnabled: true,
    updatedAt: new Date(now - 7 * 60 * 1000).toISOString(),
    history: makeHistory([
      { pm25: 28, co: 2.1, no2: 9 },
      { pm25: 31, co: 2.2, no2: 10 },
      { pm25: 33, co: 2.4, no2: 11 },
      { pm25: 32, co: 2.5, no2: 12 },
      { pm25: 34, co: 2.7, no2: 12 },
    ]),
  },
];
