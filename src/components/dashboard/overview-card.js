import { ArrowRight, BrainCircuit, Siren, Zap } from "lucide-react";
import AqiBadge from "@/components/dashboard/aqi-badge";

export default function OverviewCard({ summary, selectedNode }) {
  return (
    <div className="glass-panel h-full rounded-[24px] p-5 sm:p-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.16em]  ">
            Network Summary
          </p>
          <div className="flex items-center gap-3">
            <span className="text-5xl font-semibold tracking-tight   ">
              {summary.networkAqi}
            </span>
            <AqiBadge severity={summary.networkSeverity} label={summary.networkSeverityLabel} />
          </div>
          <p className="max-w-xl text-sm leading-7  ">
            {summary.predictionMessage}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px]">
          <div className="rounded-2xl border   bg-[#f3f7f8] p-4">
            <div className="flex items-center gap-2 text-sm   ">
              <BrainCircuit className="h-4 w-4" />
              Prediction
            </div>
            <p className="mt-3 text-2xl font-semibold   ">
              {summary.predictedNetworkAqi}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em]  ">
              Next Hour
            </p>
          </div>
          <div className="rounded-2xl border   bg-[#fbf2f4] p-4">
            <div className="flex items-center gap-2 text-sm   ">
              <Siren className="h-4 w-4" />
              Hotspot
            </div>
            <p className="mt-3 text-lg font-semibold   ">
              {summary.hottestLocation}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em]  ">
              Highest Exposure
            </p>
          </div>
          <div className="rounded-2xl border   bg-[#eef5ec] p-4">
            <div className="flex items-center gap-2 text-sm   ">
              <Zap className="h-4 w-4" />
              Active Node
            </div>
            <p className="mt-3 text-lg font-semibold   ">
              {selectedNode?.location ?? "No node selected"}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em]  ">
              Live Focus
            </p>
          </div>
        </div>
      </div>

      {selectedNode ? (
        <div className="mt-5 rounded-[22px] border   bg-[var(--surface-soft)] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em]  ">
                Selected Node
              </p>
              <h2 className="mt-2 text-2xl font-semibold   ">
                {selectedNode.location}
              </h2>
              <p className="mt-1 text-sm  ">
                {selectedNode.nodeId} • PM2.5 {selectedNode.pm25} • CO {selectedNode.co} • NO2{" "}
                {selectedNode.no2}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border   bg-white/75 px-4 py-2 text-sm   ">
              Prediction delta {selectedNode.predictionDelta >= 0 ? "+" : ""}
              {selectedNode.predictionDelta}
              <ArrowRight className="h-4 w-4" />
              {selectedNode.predictedAqi}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
