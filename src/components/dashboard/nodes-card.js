"use client";

import { Cpu, MapPin, Radio } from "lucide-react";
import AqiBadge from "@/components/dashboard/aqi-badge";
import { Switch } from "@/components/ui/switch";
import { formatDateTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export default function NodesCard({
  nodes,
  activeNodeId,
  onSelectNode,
  onToggleDevice,
}) {
  return (
    <div className="glass-panel rounded-[24px] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold   ">Node Fleet</h3>
          <p className="mt-1 text-sm  ">
            Monitor live telemetry and purifier state.
          </p>
        </div>
        <div className="rounded-full border   bg-[var(--surface-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.16em]  ">
          {nodes.length} active
        </div>
      </div>

      <div className="space-y-3">
        {nodes.map((node) => (
          <div
            key={node.nodeId}
            className={cn(
              "rounded-[20px] border p-4",
              activeNodeId === node.nodeId
                ? "border-[#b8d7de] bg-[#f2f7f8]"
                : "  bg-white/72 hover:bg-[var(--surface-soft)]"
            )}
          >
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => onSelectNode(node.nodeId)}
                className="w-full text-left"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold   ">{node.location}</p>
                      <AqiBadge severity={node.severity} label={node.severityLabel} />
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em]  ">
                      <span className="inline-flex items-center gap-1.5">
                        <Radio className="h-3.5 w-3.5" />
                        {node.nodeId}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {node.latitude.toFixed(3)}, {node.longitude.toFixed(3)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold tracking-tight   ">
                      {node.aqi}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em]  ">
                      AQI
                    </p>
                  </div>
                </div>
              </button>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border   bg-[var(--surface-soft)] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em]  ">PM2.5</p>
                  <p className="mt-2 text-xl font-semibold   ">{node.pm25}</p>
                </div>
                <div className="rounded-2xl border   bg-[var(--surface-soft)] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em]  ">CO</p>
                  <p className="mt-2 text-xl font-semibold   ">{node.co}</p>
                </div>
                <div className="rounded-2xl border   bg-[var(--surface-soft)] p-3">
                  <p className="text-[11px] uppercase tracking-[0.14em]  ">NO2</p>
                  <p className="mt-2 text-xl font-semibold   ">{node.no2}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border   bg-[var(--surface-soft)] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-medium   ">
                    <Cpu className="h-4 w-4" />
                    Purifier Control
                  </p>
                  <p className="mt-1 text-sm  ">
                    Last update {formatDateTime(node.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm  ">
                    {node.deviceEnabled ? "Enabled" : "Disabled"}
                  </span>
                  <Switch
                    checked={node.deviceEnabled}
                    onCheckedChange={(checked) => onToggleDevice(node.nodeId, checked)}
                    aria-label={`Toggle purifier for ${node.location}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
