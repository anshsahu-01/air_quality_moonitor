"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="glass-panel min-w-0 rounded-[30px] p-6">
      <div className="mb-5">
        <h3 className="text-2xl font-semibold ">{title}</h3>
        <p className="mt-1 text-sm  ">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export default function TrendCharts({ data }) {
  return (
    <div className="grid min-w-0 gap-4">
      <ChartCard
        title="Air Quality Trend"
        subtitle="PM2.5 over the last monitoring cycle."
      >
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <LineChart data={data.chartSeries}>
              <CartesianGrid stroke="rgba(226,232,240,0.9)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.96)",
                  border: "1px solid rgba(226,232,240,1)",
                  borderRadius: "16px",
                  color: "#0F172A",
                }}
              />
              <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
              <Line type="monotone" dataKey="aqi" stroke="#F2B84A" strokeWidth={3} dot={false} name="Average AQI" />
              <Line
                type="monotone"
                dataKey="predictedAqi"
                stroke="#FF6A55"
                strokeWidth={2}
                strokeDasharray="6 6"
                dot={false}
                name="Predicted AQI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard
        title="Pollutant Snapshot"
        subtitle="Current pollutant values across live nodes."
      >
        <div className="h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <BarChart data={data.nodes}>
              <CartesianGrid stroke="rgba(226,232,240,0.9)" vertical={false} />
              <XAxis dataKey="location" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.96)",
                  border: "1px solid rgba(226,232,240,1)",
                  borderRadius: "16px",
                  color: "#0F172A",
                }}
              />
              <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
              <Bar dataKey="pm25" fill="#FF6A55" radius={[6, 6, 0, 0]} name="PM2.5" />
              <Bar dataKey="co" fill="#2DBE60" radius={[6, 6, 0, 0]} name="CO" />
              <Bar dataKey="no2" fill="#F2B84A" radius={[6, 6, 0, 0]} name="NO2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
