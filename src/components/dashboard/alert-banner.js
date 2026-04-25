"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function AlertBanner({ alerts }) {
  const primaryAlert = alerts[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-[20px] border border-[#e8c7d1] bg-[#fbf0f3] p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-white/75 p-2.5 text-[#8d7179]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#7a646c]">
              Air quality alert active across {alerts.length} node
              {alerts.length > 1 ? "s" : ""}
            </p>
            <p className="mt-1 text-sm text-[#8d7179]">
              {primaryAlert.location} is reporting AQI {primaryAlert.aqi}. Sensitive
              groups should minimize exposure near this zone.
            </p>
          </div>
        </div>
        <div className="rounded-full border border-[#e8c7d1] bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[#7a646c]">
          Threshold exceeded
        </div>
      </div>
    </motion.section>
  );
}
