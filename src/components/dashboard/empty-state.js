import { CloudOff } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="glass-panel flex min-h-[420px] flex-col items-center justify-center rounded-[28px] px-6 text-center">
      <div className="rounded-full border   bg-[var(--surface-soft)] p-4">
        <CloudOff className="h-10 w-10  " />
      </div>
      <h2 className="mt-6 text-2xl font-semibold   ">No sensor nodes yet</h2>
      <p className="mt-3 max-w-lg text-sm leading-7  ">
        Start posting ESP32 payloads to `/api/air-quality` or enable Firebase to
        stream production data into the dashboard.
      </p>
    </div>
  );
}
