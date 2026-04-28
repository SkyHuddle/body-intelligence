import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: number;
  goal: number;
  unit?: string;
  color?: "cyan" | "amber" | "violet" | "mint";
  className?: string;
};

const colorMap: Record<NonNullable<Props["color"]>, string> = {
  cyan: "from-[oklch(0.88_0.13_200)] to-[oklch(0.78_0.17_235)]",
  amber: "from-[oklch(0.90_0.13_85)] to-[oklch(0.78_0.17_55)]",
  violet: "from-[oklch(0.82_0.14_300)] to-[oklch(0.65_0.20_290)]",
  mint: "from-[oklch(0.90_0.16_160)] to-[oklch(0.75_0.17_180)]",
};

export function MacroBar({ label, value, goal, unit = "g", color = "cyan", className }: Props) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(goal, 1)) * 100));
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between text-[11px]">
        <span className="text-muted-foreground tracking-wide uppercase">{label}</span>
        <span className="num text-foreground/90">
          {value}<span className="text-muted-foreground">/{goal}{unit}</span>
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r", colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
