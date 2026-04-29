import * as React from "react";
import { Flame, Apple, Pill as PillIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";

type Props = {
  workout: number;
  nutrition: number;
  supplements: number;
};

export function StreakRow({ workout, nutrition, supplements }: Props) {
  const items = [
    { icon: Flame, label: "Training", days: workout, tint: "oklch(0.84 0.14 78)" },
    { icon: Apple, label: "Nutrition", days: nutrition, tint: "oklch(0.86 0.16 158)" },
    { icon: PillIcon, label: "Supps", days: supplements, tint: "oklch(0.74 0.17 290)" },
  ];
  return (
    <GlassCard className="p-3 grid grid-cols-3 divide-x divide-white/[0.06]">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2.5 px-3 py-1">
          <span
            className="h-8 w-8 grid place-items-center rounded-xl"
            style={{ backgroundColor: `color-mix(in oklab, ${it.tint} 18%, transparent)`, color: it.tint }}
          >
            <it.icon className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <div className="leading-tight">
            <div className="num text-[15px] font-semibold">{it.days}<span className="text-muted-foreground text-[11px] font-normal ml-0.5">d</span></div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{it.label}</div>
          </div>
        </div>
      ))}
    </GlassCard>
  );
}
