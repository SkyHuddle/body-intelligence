import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Array of 35 day-states: 0 miss, 1 partial, 2 complete, 3 PR */
  days: number[];
  weekStart?: number; // 0 = Mon
  className?: string;
};

const labels = ["M", "T", "W", "T", "F", "S", "S"];

export function CalendarGrid({ days, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-7 gap-1.5">
        {labels.map((d, i) => (
          <div key={i} className="text-[10px] uppercase tracking-wider text-muted-foreground text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((state, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-[10px] border transition-colors",
              state === 0 && "bg-white/[0.025] border-white/[0.05]",
              state === 1 && "bg-[oklch(0.84_0.14_78_/_0.18)] border-[oklch(0.84_0.14_78_/_0.30)]",
              state === 2 && "bg-[oklch(0.84_0.14_210_/_0.22)] border-[oklch(0.84_0.14_210_/_0.35)]",
              state === 3 && "bg-gradient-to-br from-[oklch(0.84_0.14_210_/_0.45)] to-[oklch(0.74_0.17_290_/_0.40)] border-[oklch(0.84_0.14_210_/_0.55)]",
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 pt-1.5 text-[10px] text-muted-foreground">
        <Legend swatch="bg-white/[0.06] border-white/10" label="Miss" />
        <Legend swatch="bg-[oklch(0.84_0.14_78_/_0.30)] border-[oklch(0.84_0.14_78_/_0.40)]" label="Partial" />
        <Legend swatch="bg-[oklch(0.84_0.14_210_/_0.35)] border-[oklch(0.84_0.14_210_/_0.50)]" label="Hit" />
        <Legend swatch="bg-gradient-to-br from-[oklch(0.84_0.14_210)] to-[oklch(0.74_0.17_290)] border-transparent" label="PR" />
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-[4px] border", swatch)} />
      {label}
    </span>
  );
}
