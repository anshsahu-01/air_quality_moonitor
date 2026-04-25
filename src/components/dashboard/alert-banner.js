"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function AlertBanner({ alerts }) {
  const primaryAlert = alerts[0];
  const isHighAlert = primaryAlert?.aqi > 150;

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel rounded-[20px] border p-4 ${
        isHighAlert 
          ? "border-red-400 bg-red-50 shadow-[0_0_15px_rgba(248,113,113,0.3)] animate-pulse" 
          : "border-[#e8c7d1] bg-[#fbf0f3]"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className={`rounded-2xl p-2.5 ${isHighAlert ? "bg-red-100 text-red-600" : "bg-white/75 text-[#8d7179]"}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className={`text-sm font-bold ${isHighAlert ? "text-red-700" : "text-[#7a646c]"}`}>
              HIGH ALERT: Air quality hazardous across {alerts.length} node
              {alerts.length > 1 ? "s" : ""}
            </p>
            <p className={`mt-1 text-sm ${isHighAlert ? "text-red-600 font-medium" : "text-[#8d7179]"}`}>
              {primaryAlert.location} is reporting AQI {primaryAlert.aqi}. Please stay indoors!
            </p>
          </div>
        </div>
        <div className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-bold ${isHighAlert ? "border-red-400 bg-red-100 text-red-700" : "border-[#e8c7d1] bg-white/70 text-[#7a646c]"}`}>
          Threshold exceeded
        </div>
      </div>
    </motion.section>
  );
}
