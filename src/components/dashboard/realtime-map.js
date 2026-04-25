"use client";

import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import AqiBadge from "@/components/dashboard/aqi-badge";

function createMarker(severity, active) {
  const color =
    severity === "poor" ? "#efc3d0" : severity === "moderate" ? "#efd9c4" : "#dce9b6";

  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="
      width:${active ? 22 : 18}px;
      height:${active ? 22 : 18}px;
      border-radius:999px;
      background:${color};
      border:3px solid rgba(255,255,255,0.96);
      box-shadow:0 0 0 ${active ? 10 : 6}px rgba(184,198,208,0.18),0 10px 18px rgba(155,164,175,0.18);
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  });
}

export default function RealtimeMap({ nodes, selectedNodeId, onSelectNode }) {
  const center = useMemo(() => {
    if (!nodes.length) return [28.6139, 77.209];
    const lat = nodes.reduce((sum, node) => sum + node.latitude, 0) / nodes.length;
    const lng = nodes.reduce((sum, node) => sum + node.longitude, 0) / nodes.length;
    return [lat, lng];
  }, [nodes]);

  return (
    <div className="glass-panel overflow-hidden rounded-[30px]">
      <div className="flex flex-col gap-2 border-b   p-6">
        <h3 className="text-2xl font-semibold  ">Air Quality Map</h3>
        <p className="text-sm  ">
          Live AQI across monitored locations.
        </p>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_180px]">
        <div className="h-[360px] overflow-hidden rounded-[24px]">
          <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {nodes.map((node) => (
            <Marker
              key={node.nodeId}
              position={[node.latitude, node.longitude]}
              icon={createMarker(node.severity, node.nodeId === selectedNodeId)}
              eventHandlers={{ click: () => onSelectNode(node.nodeId) }}
            >
              <Popup>
                <div className="min-w-[220px] space-y-2 text-[#67707d]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{node.location}</p>
                      <p className="text-xs text-[#9ca5b2]">{node.nodeId}</p>
                    </div>
                    <AqiBadge severity={node.severity} label={node.severityLabel} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-xl bg-[#f5f6f7] p-2">
                      <p className="text-[#9ca5b2]">PM2.5</p>
                      <p className="mt-1 text-base font-semibold">{node.pm25}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5f6f7] p-2">
                      <p className="text-[#9ca5b2]">CO</p>
                      <p className="mt-1 text-base font-semibold">{node.co}</p>
                    </div>
                    <div className="rounded-xl bg-[#f5f6f7] p-2">
                      <p className="text-[#9ca5b2]">NO2</p>
                      <p className="mt-1 text-base font-semibold">{node.no2}</p>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          </MapContainer>
        </div>
        <div className="rounded-[24px] border border-[#EDF1F5] bg-[#FAFBFD] p-4">
          <p className="text-sm font-semibold  ">AQI Scale</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              <span>0 - 50 Good</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#A9D3B0]" />
              <span>51 - 100 Moderate</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#F2B84A]" />
              <span>101 - 150 Sensitive</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-[#FF6A55]" />
              <span>151 - 200 Unhealthy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
