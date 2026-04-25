import { cn } from "@/lib/utils";

const palette = {
  good: "border-[#d7e1c0] bg-[#edf4e3] text-[#7a8570]",
  moderate: "border-[#ead8c7] bg-[#fbf1e7] text-[#8b7a6f]",
  poor: "border-[#e8c7d1] bg-[#fbf0f3] text-[#8d7179]",
};

export default function AqiBadge({ severity = "good", label }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]",
        palette[severity]
      )}
    >
      {label}
    </span>
  );
}
