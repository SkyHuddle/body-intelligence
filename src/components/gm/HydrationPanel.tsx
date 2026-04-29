import * as React from "react";
import { Droplets, Plus, Minus } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

type Props = {
  initialOz: number;
  goalOz: number;
  className?: string;
};

const QUICK = [8, 12, 16];

export function HydrationPanel({ initialOz, goalOz, className }: Props) {
  const [oz, setOz] = React.useState(initialOz);
  const pct = Math.min(100, (oz / goalOz) * 100);
  const remaining = Math.max(0, goalOz - oz);

  const add = (n: number) => setOz((v) => Math.max(0, Math.min(goalOz * 1.5, v + n)));

  return (
    <GlassCard className={cn("p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-[oklch(0.90_0.12_200)]" />
            <span className="text-[12px] uppercase tracking-wider text-muted-foreground">Hydration</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="num text-[28px] font-semibold tracking-tight">{oz}</span>
            <span className="text-[13px] text-muted-foreground">/ {goalOz} oz</span>
          </div>
          <div className="num text-[11px] text-muted-foreground mt-0.5">{remaining} oz remaining</div>
        </div>
        <span className="num text-[13px] font-semibold text-[oklch(0.90_0.12_200)]">{Math.round(pct)}%</span>
      </div>

      {/* Liquid bar */}
      <div className="mt-4 relative h-3 w-full rounded-full bg-white/[0.05] overflow-hidden border border-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[oklch(0.90_0.12_200)] to-[oklch(0.78_0.16_235)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Quick add */}
      <div className="mt-4 flex items-center gap-2">
        <button
          aria-label="Remove 8 oz"
          onClick={() => add(-8)}
          className="h-9 w-9 grid place-items-center rounded-full bg-white/[0.05] border border-white/10 text-muted-foreground hover:bg-white/[0.08] transition active:scale-95"
        >
          <Minus className="h-4 w-4" />
        </button>
        {QUICK.map((n) => (
          <button
            key={n}
            onClick={() => add(n)}
            className="num flex-1 h-9 rounded-full bg-white/[0.05] border border-white/10 text-[12px] font-medium hover:bg-white/[0.09] transition active:scale-[0.98]"
          >
            +{n} oz
          </button>
        ))}
        <button
          aria-label="Add custom"
          onClick={() => add(8)}
          className="h-9 w-9 grid place-items-center rounded-full bg-gradient-to-b from-[oklch(0.90_0.12_200)] to-[oklch(0.78_0.16_235)] text-background shadow-[0_8px_20px_-8px_oklch(0.84_0.14_210_/_0.6)] active:scale-95"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </GlassCard>
  );
}
