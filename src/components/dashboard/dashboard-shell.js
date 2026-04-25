"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bell,
  Droplets,
  LogOut,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Wind,
} from "lucide-react";
import { logoutAction } from "@/app/login/actions";
import AlertBanner from "@/components/dashboard/alert-banner";
import DashboardMapCard from "@/components/dashboard/dashboard-map-card";
import EmptyState from "@/components/dashboard/empty-state";
import TrendCharts from "@/components/dashboard/trend-charts";
import { Switch } from "@/components/ui/switch";
import SiteHeader from "@/components/shared/site-header";
import { formatDateTime } from "@/lib/formatters";
import { useRealtimeAirQuality } from "@/hooks/use-realtime-air-quality";

const tips = [
  {
    title: "Avoid outdoor activities",
    copy: "Stay indoors when AQI is above 150.",
    icon: Wind,
    tone: "bg-[#EEF6EC]",
  },
  {
    title: "Wear a mask",
    copy: "Use N95 or outdoor mask for protection.",
    icon: ShieldCheck,
    tone: "bg-[#EEF4F6]",
  },
  {
    title: "Keep windows closed",
    copy: "Prevent outdoor air from coming inside.",
    icon: MapPin,
    tone: "bg-[#F6EFF8]",
  },
  {
    title: "Stay hydrated",
    copy: "Drink water and monitor respiratory symptoms.",
    icon: Droplets,
    tone: "bg-[#FBF4EA]",
  },
];

function getAqiTone(severity) {
  if (severity === "poor") {
    return {
      badge: "bg-[#FF6A55]",
      text: "Poor",
      line: "#FF6A55",
      fill: "#F6D5D0",
    };
  }
  if (severity === "moderate") {
    return {
      badge: "bg-[#F2B84A]",
      text: "Moderate",
      line: "#F2B84A",
      fill: "#F7E4BF",
    };
  }
  return {
    badge: "bg-blue-600",
    text: "Good",
    line: "#2DBE60",
    fill: "#CDEFD9",
  };
}

function MiniSparkline({ points, severity }) {
  const tone = getAqiTone(severity);
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${index * 26} ${54 - point}`)
    .join(" ");

  return (
    <svg viewBox="0 0 220 60" className="h-14 w-full">
      <path d={path} fill="none" stroke={tone.line} strokeWidth="2.5" strokeLinecap="round" />
      {points.map((point, index) => (
        <circle
          key={`${severity}-${index}`}
          cx={index * 26}
          cy={54 - point}
          r="2.5"
          fill={tone.line}
        />
      ))}
    </svg>
  );
}

function HeroGauge({ aqi, severity }) {
  const tone = getAqiTone(severity);
  const percentage = Math.min((aqi / 250) * 100, 100);

  return (
    <div
      className="relative h-44 w-44 rounded-full"
      style={{
        background: `conic-gradient(${tone.line} ${percentage}%, rgba(255,255,255,0.12) ${percentage}% 100%)`,
      }}
    >
      <div className="absolute inset-4 rounded-full bg-[#293243]" />
      <div className="absolute inset-8 flex items-center justify-center rounded-full bg-[#1f2736] text-center text-white">
        <div>
          <Wind className="mx-auto h-8 w-8 opacity-70" />
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/55">Air</p>
        </div>
      </div>
    </div>
  );
}

function OverviewCard({ node, isActive, onSelect }) {
  const tone = getAqiTone(node.severity);
  const points = (node.history ?? []).slice(-8).map((item) => Math.min(item.aqi / 4, 48));

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`min-w-[240px] rounded-[24px] border p-5 text-left shadow-sm transition glass-panel ${
        isActive
          ? "border-[var(--ring)] bg-[rgba(59,130,246,0.1)]"
          : "hover:border-[rgba(255,255,255,0.2)]"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-semibold  ">{node.location}</p>
          <p className="mt-1 text-sm  ">{node.nodeId}</p>
        </div>
        <span className="text-sm  ">⌁</span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-5xl font-semibold tracking-tight   ">{node.aqi}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${tone.badge}`}>
          {tone.text}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-600">PM2.5: {node.pm25} ug/m3</p>
      <div className="mt-3">
        <MiniSparkline points={points.length ? points : [10, 16, 12, 18, 14, 22, 20, 24]} severity={node.severity} />
      </div>
      <p className="mt-1 text-xs text-slate-400">{formatDateTime(node.updatedAt)}</p>
    </button>
  );
}

function InsightPanel({
  selectedNode,
  lastUpdate,
  isRealtimeActive,
  source,
  toggleDevice,
}) {
  return (
    <div className="glass-panel rounded-[30px] p-6 h-full border  ">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5  " />
        <h3 className="text-2xl font-semibold   ">Health Tips</h3>
      </div>

      <div className="mt-6 space-y-4">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.title} className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${tip.tone}`}>
                <Icon className="h-5 w-5 text-slate-700" />
              </div>
              <div>
                <p className="font-medium  ">{tip.title}</p>
                <p className="mt-1 text-sm  ">{tip.copy}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedNode ? (
        <div className="mt-8 rounded-[24px] border   bg-[rgba(0,0,0,0.2)] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em]  ">
                Device Control
              </p>
              <p className="mt-1 text-lg font-semibold   ">{selectedNode.location}</p>
            </div>
            <Switch
              checked={selectedNode.deviceEnabled}
              onCheckedChange={(checked) => toggleDevice(selectedNode.nodeId, checked)}
              aria-label={`Toggle purifier for ${selectedNode.location}`}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[rgba(255,255,255,0.03)] border   p-4">
              <p className="text-xs uppercase tracking-[0.14em]  ">Realtime</p>
              <p className="mt-2 text-sm font-medium  ">
                {isRealtimeActive ? source : "Standby"}
              </p>
            </div>
            <div className="rounded-2xl bg-[rgba(255,255,255,0.03)] border   p-4">
              <p className="text-xs uppercase tracking-[0.14em]  ">Updated</p>
              <p className="mt-2 text-sm font-medium  ">
                {formatDateTime(lastUpdate)}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function DashboardShell({ initialData, session }) {
  const { data, isRealtimeActive, source, lastUpdate, toggleDevice, simulatePulse } =
    useRealtimeAirQuality(initialData);
  const [activeNodeId, setActiveNodeId] = useState(data.nodes[0]?.nodeId ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return data.nodes;
    const query = searchQuery.toLowerCase();
    return data.nodes.filter(
      (node) =>
        node.location.toLowerCase().includes(query) ||
        node.nodeId.toLowerCase().includes(query)
    );
  }, [data.nodes, searchQuery]);

  const selectedNode =
    data.nodes.find((node) => node.nodeId === activeNodeId) ?? data.nodes[0] ?? null;

  const heroTone = getAqiTone(selectedNode?.severity ?? "good");
  const heroMetrics = useMemo(
    () =>
      selectedNode
        ? [
            { label: "PM2.5", value: selectedNode.pm25, unit: "ug/m3" },
            { label: "CO", value: selectedNode.co, unit: "ppm" },
            { label: "NO2", value: selectedNode.no2, unit: "ppb" },
            {
              label: "Device",
              value: selectedNode.deviceEnabled ? "On" : "Off",
              unit: "Purifier",
            },
          ]
        : [],
    [selectedNode]
  );

  const handleSimulate = () => {
    startTransition(async () => {
      await simulatePulse();
    });
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto flex w-full   flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <SiteHeader
          activeItem="Home"
          actionLabel="Logout"
          action={logoutAction}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          secondaryAction={
            <button
              type="button"
              onClick={handleSimulate}
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-full border   bg-[rgba(255,255,255,0.03)] px-5 py-3 text-sm font-medium   transition hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-60"
              suppressHydrationWarning
            >
              <RefreshCw className={`h-4 w-4   ${isPending ? "animate-spin" : ""}`} />
              Refresh
            </button>
          }
        />

        {!!data.alerts.length && <AlertBanner alerts={data.alerts} />}

        {!filteredNodes.length ? (
          <EmptyState />
        ) : (
          <>
            <section className="relative overflow-hidden rounded-[36px] glass-panel px-6 py-8 lg:px-10 lg:py-10">
              <div className="absolute inset-x-0 bottom-0 h-40  /5 blur-3xl" />
              <div className="relative grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="max-w-2xl">
                    <p className="text-[11px] uppercase tracking-[0.2em]   font-semibold">
                      Welcome back, {session?.name ?? "Operator"}
                    </p>
                    <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight    lg:text-6xl">
                      Live Air Quality.
                      <br />
                      <span className="hero-gradient-text">Healthier Tomorrow.</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-xl leading-9  ">
                      AtmosGrid provides realtime, location-specific air quality insights
                      and alerts to help urban communities breathe better.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("overview-section")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-600"
                      suppressHydrationWarning
                    >
                      Check Air Quality
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("map-section")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#DCE3EA] bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#F9FBFD]"
                      suppressHydrationWarning
                    >
                      Explore Map
                      <MapPin className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm  ">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-blue-600" />
                      Realtime data
                    </span>
                    <span>Hyperlocal insight</span>
                    <span>Smart alerts</span>
                  </div>
                </motion.div>

                {selectedNode ? (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[32px] bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] p-6 text-white backdrop-blur-md shadow-[0_22px_50px_rgba(0,0,0,0.4)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--ring)]/10 to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between gap-6 relative z-10">
                      <div className="max-w-[260px]">
                        <p className="inline-flex items-center gap-2 text-sm text-white/80">
                          <MapPin className="h-4 w-4  " />
                          {selectedNode.location}
                        </p>
                        <div className="mt-5 flex items-end gap-3">
                          <span className="text-7xl font-semibold tracking-tight">
                            {selectedNode.aqi}
                          </span>
                          <div className="pb-3">
                            <p className="text-3xl">AQI</p>
                            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium text-white ${heroTone.badge}`}>
                              {heroTone.text}
                            </span>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-white/78">
                          Air quality is {heroTone.text.toLowerCase()}. Avoid prolonged
                          outdoor exposure and monitor node conditions.
                        </p>
                        <p className="mt-4 text-sm text-white/60">
                          Updated: {formatDateTime(selectedNode.updatedAt)}
                        </p>
                      </div>

                      <HeroGauge aqi={selectedNode.aqi} severity={selectedNode.severity} />
                    </div>

                    <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-4">
                      {heroMetrics.map((item) => (
                        <div key={item.label}>
                          <p className="text-sm text-white/60">{item.label}</p>
                          <p className="mt-2 text-4xl font-semibold tracking-tight">
                            {item.value}
                          </p>
                          <p className="mt-1 text-sm text-white/60">{item.unit}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </section>

            <section
              id="overview-section"
              className="glass-panel rounded-[32px] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-lg font-semibold   ">
                    <Activity className="h-5 w-5  " />
                    Live Air Quality Overview
                  </div>
                  <p className="mt-1 text-sm  ">
                    Realtime data from distributed monitoring stations.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full border   bg-[rgba(255,255,255,0.03)] px-5 py-3 text-sm font-medium   transition hover:bg-[rgba(255,255,255,0.08)]"
                  suppressHydrationWarning
                >
                  View All Locations
                </button>
              </div>

              <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                {filteredNodes.map((node) => (
                  <OverviewCard
                    key={node.nodeId}
                    node={node}
                    isActive={node.nodeId === selectedNode?.nodeId}
                    onSelect={() => setActiveNodeId(node.nodeId)}
                  />
                ))}
              </div>
            </section>

            <section className="grid gap-5 xl:grid-cols-[1.1fr_1.05fr_0.8fr]">
              <div className="min-w-0">
                <TrendCharts data={{ ...data, nodes: filteredNodes }} />
              </div>
              <div id="map-section" className="min-w-0">
                <DashboardMapCard
                  nodes={filteredNodes}
                  selectedNodeId={selectedNode?.nodeId ?? null}
                  onSelectNode={setActiveNodeId}
                />
              </div>
              <InsightPanel
                selectedNode={selectedNode}
                lastUpdate={lastUpdate}
                isRealtimeActive={isRealtimeActive}
                source={source}
                toggleDevice={toggleDevice}
              />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
