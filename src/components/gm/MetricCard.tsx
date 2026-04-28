import * as React from "react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  progress?: number; // 0-100
  tint?: "cyan" | "violet" | "mint" | "amber" | "rose";
  className?: string;
};

const tintBg: Record<NonNullable<Props["tint"]>, string> = {
  cyan: "bg-[oklch(0.82_0.16_215_/_0.14)] text-[oklch(0.92_0.12_205)]",
  violet: "bg-[oklch(0.72_0.18_295_/_0.16)] text-[oklch(0.86_0.14_295)]",
  mint: "bg-[oklch(0.85_0.18_155_/_0.16)] text-[oklch(0.90_0.16_160)]",
  amber: "bg-[oklch(0.83_0.15_75_/_0.16)] text-[oklch(0.92_0.13_85)]",
  rose: "bg-[oklch(0.73_0.19_18_/_0.16)] text-[oklch(0.85_0.16_22)]",
};

const tintBar: Record<NonNullable<Props["tint"]>, string> = {
  cyan: "from-[oklch(0.88_0.13_200)] to-[oklch(0.78_0.17_235)]",
  violet: "from-[oklch(0.82_0.14_300)] to-[oklch(0.65_0.20_290)]",
  mint: "from-[oklch(0.90_0.16_160)] to-[oklch(0.75_0.17_180)]",
  amber: "from-[oklch(0.90_0.13_85)] to-[oklch(0.78_0.17_55)]",
  rose: "from-[oklch(0.85_0.16_22)] to-[oklch(0.70_0.20_15)]",
};

export function MetricCard({ icon: Icon, label, value, unit, sub, progress, tint = "cyan", className }: Props) {
  return (
    <GlassCard className={cn("p-4 rounded-2xl flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <div className={cn("h-8 w-8 rounded-xl grid place-items-center", tintBg[tint])}>
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </div>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="num text-2xl font-semibold tracking-tight">{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {typeof progress === "number" && (
        <div className="h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className={cn("h-full rounded-full bg-gradient-to-r", tintBar[tint])}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
      {sub && <span className="text-[11px] text-muted-foreground">{sub}</span>}
    </GlassCard>
  );
}
