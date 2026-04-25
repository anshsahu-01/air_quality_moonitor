import mongoose from "mongoose";

/**
 * Node Schema
 */
const NodeSchema = new mongoose.Schema({
  nodeId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  pm25: {
    type: Number,
    required: true,
  },
  co: {
    type: Number,
    required: true,
  },
  no2: {
    type: Number,
    required: true,
  },
  deviceEnabled: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  history: [
    {
      pm25: Number,
      co: Number,
      no2: Number,
      aqi: Number,
      predictedAqi: Number,
      timestamp: Date,
    },
  ],
});

export default mongoose.models.Node || mongoose.model("Node", NodeSchema);
