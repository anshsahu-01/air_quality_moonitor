import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const toneMap = {
  cyan: "bg-[#f1f7f8]",
  emerald: "bg-[#eef5ec]",
  amber: "bg-[#fbf2e8]",
  violet: "bg-[#f5eef8]",
  rose: "bg-[#fbf1f4]",
  sky: "bg-[#edf4f7]",
};

export default function MetricCard({ title, value, hint, icon: Icon, tone = "cyan" }) {
  return (
    <div className={cn("glass-panel h-full rounded-[22px] p-5", toneMap[tone])}>
      <div className="flex items-start justify-between">
        <div className="rounded-2xl border   bg-white/80 p-3   ">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <ArrowUpRight className="h-4 w-4  " />
      </div>
      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-[0.16em]  ">{title}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight   ">{value}</p>
        <p className="mt-1.5 text-sm  ">{hint}</p>
      </div>
    </div>
  );
}
