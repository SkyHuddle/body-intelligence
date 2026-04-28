import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, ScanBarcode, Sparkles } from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { ProgressRing } from "@/components/gm/ProgressRing";
import { MacroBar } from "@/components/gm/MacroBar";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { today, meals } from "@/lib/mock";

export const Route = createFileRoute("/eat")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Eat" },
      { name: "description", content: "Track meals, macros, and food with precision." },
    ],
  }),
  component: EatPage,
});

function EatPage() {
  const eaten = today.calories.eaten;
  const goal = today.calories.goal;
  const pct = (eaten / goal) * 100;

  return (
    <AppShell>
      <PageHeader
        title="Nutrition"
        subtitle={today.date}
        right={<GlassIconButton><ScanBarcode className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Search */}
      <div className="glass rounded-2xl flex items-center gap-2 px-4 py-3 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search foods, brands, or scan a barcode"
          className="bg-transparent outline-none text-[13px] flex-1 placeholder:text-muted-foreground"
        />
        <Pill tint="cyan">⌘K</Pill>
      </div>

      {/* Macro hero */}
      <GlassCard variant="hero" className="p-5 mb-4">
        <div className="flex items-center gap-5">
          <ProgressRing value={pct} size={150} stroke={12}>
            <div>
              <div className="num text-[28px] font-semibold leading-none">{eaten}</div>
              <div className="text-[10px] text-muted-foreground mt-1">/ {goal} kcal</div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-3">
            <MacroBar label="Protein" value={today.macros.protein.value} goal={today.macros.protein.goal} color="cyan" />
            <MacroBar label="Carbs" value={today.macros.carbs.value} goal={today.macros.carbs.goal} color="amber" />
            <MacroBar label="Fat" value={today.macros.fat.value} goal={today.macros.fat.goal} color="violet" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[12px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-[oklch(0.92_0.12_205)]" />
          <span>52g protein left — try 6oz chicken or a whey shake.</span>
        </div>
      </GlassCard>

      {/* Meals */}
      <div className="space-y-3">
        {meals.map((m) => (
          <GlassCard key={m.name} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold">{m.name}</span>
                <span className="num text-[11px] text-muted-foreground">{m.cals} kcal</span>
              </div>
              <button className="h-8 w-8 grid place-items-center rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.10]">
                <Plus className="h-4 w-4" strokeWidth={2.2} />
              </button>
            </div>
            {m.items.length === 0 ? (
              <button className="w-full mt-1 rounded-xl border border-dashed border-white/10 py-3 text-[12px] text-muted-foreground hover:bg-white/[0.03]">
                + Log {m.name.toLowerCase()}
              </button>
            ) : (
              <div className="space-y-1.5">
                {m.items.map((it) => (
                  <div key={it.name} className="flex items-center justify-between rounded-xl px-3 py-2 bg-white/[0.03] border border-white/[0.05]">
                    <div>
                      <div className="text-[13px]">{it.name}</div>
                      <div className="num text-[11px] text-muted-foreground">P {it.p} · C {it.c} · F {it.f}</div>
                    </div>
                    <span className="num text-[12px] text-muted-foreground">{it.cals} kcal</span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Floating add button (above tab bar) */}
      <button className="fixed bottom-28 right-1/2 translate-x-[202px] z-40 h-14 w-14 rounded-full grid place-items-center bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.17_225)] text-background shadow-[0_20px_40px_-10px_oklch(0.82_0.16_215_/_0.7)] ring-1 ring-white/30">
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>
    </AppShell>
  );
}
