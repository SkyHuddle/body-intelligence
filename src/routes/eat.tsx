import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, ScanBarcode, Sparkles, Sun, UtensilsCrossed, Moon, Cookie, ChevronRight } from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { ProgressRing } from "@/components/gm/ProgressRing";
import { MacroBar } from "@/components/gm/MacroBar";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { today, meals, suggestedFoods } from "@/lib/mock";

export const Route = createFileRoute("/eat")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Nutrition" },
      { name: "description", content: "Track meals, macros, and food with surgical precision." },
    ],
  }),
  component: EatPage,
});

const mealIcon: Record<string, typeof Sun> = {
  Breakfast: Sun,
  Lunch: UtensilsCrossed,
  Dinner: Moon,
  Snacks: Cookie,
};

function EatPage() {
  const eaten = today.calories.eaten;
  const goal = today.calories.goal;
  const burned = today.calories.burned;
  const remaining = goal - eaten + burned;
  const pct = (eaten / goal) * 100;

  const remP = today.macros.protein.goal - today.macros.protein.value;
  const remC = today.macros.carbs.goal - today.macros.carbs.value;
  const remF = today.macros.fat.goal - today.macros.fat.value;

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
        <span className="num text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
      </div>

      {/* Calorie hero */}
      <GlassCard variant="hero" className="p-5 mb-3.5">
        <div className="flex items-center gap-5">
          <ProgressRing value={pct} size={148} stroke={12}>
            <div>
              <div className="num text-[28px] font-semibold leading-none tracking-tight">{remaining.toLocaleString()}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1.5">remaining</div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2.5">
            <CalRow label="Goal" value={goal} dot="oklch(0.66 0.02 250)" />
            <CalRow label="Food" value={eaten} dot="oklch(0.84 0.14 78)" />
            <CalRow label="Burned" value={burned} dot="oklch(0.86 0.16 158)" sign="-" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <MacroBar label="Protein" value={today.macros.protein.value} goal={today.macros.protein.goal} color="cyan" />
          <MacroBar label="Carbs" value={today.macros.carbs.value} goal={today.macros.carbs.goal} color="amber" />
          <MacroBar label="Fat" value={today.macros.fat.value} goal={today.macros.fat.goal} color="violet" />
        </div>

        {/* Remaining macros chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Pill tint="cyan">{remP > 0 ? `${remP}g protein left` : "Protein hit"}</Pill>
          <Pill tint="amber">{remC > 0 ? `${remC}g carbs left` : "Carbs hit"}</Pill>
          <Pill tint="violet">{remF > 0 ? `${remF}g fat left` : "Fat hit"}</Pill>
        </div>
      </GlassCard>

      {/* Coach hint */}
      <div className="mb-5 flex items-start gap-2 rounded-2xl glass px-3.5 py-2.5">
        <Sparkles className="h-4 w-4 text-[oklch(0.90_0.12_200)] shrink-0 mt-0.5" />
        <p className="text-[12.5px] leading-snug text-foreground/85">{today.insight}</p>
      </div>

      {/* Suggested foods to hit goals */}
      <SectionHeader title="Suggested for you" className="mb-3" action={<span className="text-[11px] text-muted-foreground">Tap to add</span>} />
      <div className="-mx-5 px-5 flex gap-2.5 overflow-x-auto no-scrollbar mb-7">
        {suggestedFoods.map((f) => (
          <button
            key={f.name}
            className="shrink-0 min-w-[170px] glass rounded-2xl p-3.5 text-left hover:bg-white/[0.06] transition active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[12.5px] font-medium leading-tight">{f.name}</span>
              <span className="h-6 w-6 grid place-items-center rounded-full bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.16_230)] text-background shrink-0">
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            </div>
            <div className="mt-2 num text-[15px] font-semibold">{f.cals}<span className="text-[10px] text-muted-foreground font-normal ml-1">kcal</span></div>
            <div className="num text-[10.5px] text-muted-foreground mt-0.5">P {f.p} · C {f.c} · F {f.f}</div>
          </button>
        ))}
      </div>

      {/* Meals */}
      <SectionHeader title="Today's Meals" className="mb-3" />
      <div className="space-y-2.5">
        {meals.map((m) => {
          const Icon = mealIcon[m.name] ?? Cookie;
          return (
            <GlassCard key={m.name} className="p-4">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-8 grid place-items-center rounded-xl bg-white/[0.05] border border-white/[0.06] text-foreground/85">
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[14px] font-semibold">{m.name}</div>
                    <div className="num text-[11px] text-muted-foreground">{m.cals} kcal</div>
                  </div>
                </div>
                <button className="h-8 w-8 grid place-items-center rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition active:scale-95">
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
                    <div key={it.name} className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-white/[0.03] border border-white/[0.05]">
                      <div className="min-w-0">
                        <div className="text-[13px] truncate">{it.name}</div>
                        <div className="num text-[10.5px] text-muted-foreground">
                          {it.portion !== "—" && <>{it.portion} · </>}P {it.p} · C {it.c} · F {it.f}
                        </div>
                      </div>
                      <span className="num text-[12px] text-muted-foreground shrink-0">{it.cals} kcal</span>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </AppShell>
  );
}

function CalRow({ label, value, dot, sign = "" }: { label: string; value: number; dot: string; sign?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot }} />
        <span className="text-[12px] text-muted-foreground">{label}</span>
      </div>
      <span className="num text-[13px] font-semibold">{sign}{value.toLocaleString()}</span>
    </div>
  );
}

void ChevronRight;
