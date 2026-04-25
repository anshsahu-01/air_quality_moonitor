"use client";

import dynamic from "next/dynamic";

const RealtimeMap = dynamic(() => import("@/components/dashboard/realtime-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-[24px] border   bg-white/70 text-sm  ">
      Loading map layer...
    </div>
  ),
});

export default function DashboardMapCard({ nodes, selectedNodeId, onSelectNode }) {
  return <RealtimeMap nodes={nodes} selectedNodeId={selectedNodeId} onSelectNode={onSelectNode} />;
}
