import { createFileRoute } from "@tanstack/react-router";
import {
  Footprints,
  HeartPulse,
  Activity,
  Pill as PillIcon,
  Upload,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Plus,
  Check,
  Moon,
} from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { ProgressRing } from "@/components/gm/ProgressRing";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { Sparkline } from "@/components/gm/Sparkline";
import { HydrationPanel } from "@/components/gm/HydrationPanel";
import { CalendarGrid } from "@/components/gm/CalendarGrid";
import { today, supplements, biomarkers, measurements, protocols, calendar } from "@/lib/mock";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Health" },
      { name: "description", content: "Body, supplements, protocols, and biomarkers in one premium dashboard." },
    ],
  }),
  component: HealthPage,
});

const tabs = ["Today", "Body", "Supps", "Labs"] as const;
type Tab = (typeof tabs)[number];

function HealthPage() {
  const [tab, setTab] = useState<Tab>("Today");
  return (
    <AppShell>
      <PageHeader
        title="Health"
        subtitle="Body, recovery & longevity"
        right={<GlassIconButton><Plus className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Segmented control */}
      <div className="glass rounded-full p-1 grid grid-cols-4 gap-1 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full py-1.5 text-[12px] font-medium transition",
              tab === t
                ? "bg-white/10 text-foreground border border-white/15"
                : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Today" && <TodayTab />}
      {tab === "Body" && <BodyTab />}
      {tab === "Supps" && <SuppsTab />}
      {tab === "Labs" && <LabsTab />}
    </AppShell>
  );
}

function TodayTab() {
  return (
    <div className="space-y-3.5">
      {/* Activity ring + key metrics */}
      <GlassCard variant="hero" className="p-5">
        <div className="flex items-center gap-5">
          <ProgressRing
            value={(today.steps.value / today.steps.goal) * 100}
            size={140}
            stroke={12}
            from="oklch(0.86 0.16 158)"
            to="oklch(0.78 0.16 200)"
          >
            <div>
              <div className="num text-[24px] font-semibold leading-none">{(today.steps.value / 1000).toFixed(1)}k</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1.5">steps</div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <Row icon={<Footprints className="h-4 w-4" />} label="Steps" value={`${today.steps.value.toLocaleString()} / ${today.steps.goal.toLocaleString()}`} />
            <Row icon={<Activity className="h-4 w-4" />} label="Active" value={`${today.active.value} cal`} />
            <Row icon={<HeartPulse className="h-4 w-4" />} label="Resting HR" value={`${today.restingHr} bpm`} />
            <Row icon={<Moon className="h-4 w-4" />} label="Sleep" value={`${today.sleep.hours} h`} />
          </div>
        </div>
      </GlassCard>

      {/* Hydration */}
      <HydrationPanel initialOz={today.water.value} goalOz={today.water.goal} />

      {/* Monthly calendar */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{calendar.month}</div>
            <div className="num text-[16px] font-semibold mt-0.5">19 sessions · 4 PRs</div>
          </div>
          <Pill tint="cyan">88% adherence</Pill>
        </div>
        <CalendarGrid days={calendar.days} />
      </GlassCard>

      {/* Apple Health */}
      <GlassCard className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 grid place-items-center rounded-xl bg-[oklch(0.74_0.18_18_/_0.14)] text-[oklch(0.85_0.16_22)]">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[13px] font-semibold">Apple Health</div>
            <div className="text-[11px] text-muted-foreground">Last sync 2 min ago</div>
          </div>
        </div>
        <Pill tint="mint">Connected</Pill>
      </GlassCard>
    </div>
  );
}

function BodyTab() {
  return (
    <div className="space-y-4">
      <GlassCard variant="hero" className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Weight</div>
            <div className="mt-1 num text-[36px] font-semibold tracking-tight">
              184.2<span className="text-[15px] text-muted-foreground ml-1.5 font-normal">lb</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-[oklch(0.86_0.16_158)]">
              <TrendingDown className="h-3.5 w-3.5" /> -1.9 lb · 30d
            </div>
          </div>
          <Sparkline data={today.weightTrend} width={140} height={56} />
        </div>
      </GlassCard>

      <SectionHeader title="Measurements" className="mb-1" />
      <div className="grid grid-cols-2 gap-3">
        {measurements.map((m) => (
          <GlassCard key={m.name} className="p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.name}</div>
            <div className="mt-1 num text-[18px] font-semibold">{m.value}</div>
            <div className={cn(
              "text-[11px] mt-0.5 inline-flex items-center gap-1",
              m.trend === "down" ? "text-[oklch(0.86_0.16_158)]" : "text-[oklch(0.90_0.12_200)]",
            )}>
              {m.trend === "down" ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />} {m.delta}
            </div>
          </GlassCard>
        ))}
      </div>

      <SectionHeader title="Active Protocols" className="mt-4 mb-1" />
      <div className="space-y-3">
        {protocols.map((p) => {
          const pct = (p.week / p.total) * 100;
          return (
            <GlassCard key={p.name} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-semibold">{p.name}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{p.schedule} · {p.dose}</div>
                </div>
                <Pill tint={p.tint}>Wk {p.week}/{p.total}</Pill>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[oklch(0.90_0.12_200)] to-[oklch(0.74_0.17_290)]" style={{ width: `${pct}%` }} />
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function SuppsTab() {
  const [stacks, setStacks] = useState(supplements);
  const totalDone = stacks.reduce((s, x) => s + x.items.filter((i) => i.done).length, 0);
  const total = stacks.reduce((s, x) => s + x.items.length, 0);
  const pct = (totalDone / total) * 100;

  const toggle = (timeIdx: number, itemIdx: number) => {
    setStacks((prev) =>
      prev.map((s, ti) =>
        ti === timeIdx
          ? { ...s, items: s.items.map((it, ii) => (ii === itemIdx ? { ...it, done: !it.done } : it)) }
          : s,
      ),
    );
  };

  return (
    <div className="space-y-3.5">
      {/* Compliance hero */}
      <GlassCard variant="hero" className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Today's Stack</div>
            <div className="mt-1 num text-[28px] font-semibold tracking-tight">
              {totalDone}<span className="text-[15px] text-muted-foreground ml-1 font-normal">/ {total}</span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{Math.round(pct)}% complete</div>
          </div>
          <ProgressRing value={pct} size={84} stroke={8} from="oklch(0.74 0.17 290)" to="oklch(0.90 0.12 200)">
            <span className="num text-[14px] font-semibold">{Math.round(pct)}%</span>
          </ProgressRing>
        </div>
      </GlassCard>

      {stacks.map((s, ti) => {
        const done = s.items.filter((i) => i.done).length;
        return (
          <GlassCard key={s.time} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 grid place-items-center rounded-xl bg-[oklch(0.74_0.17_290_/_0.14)] text-[oklch(0.86_0.14_290)]">
                  <PillIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[13px] font-semibold">{s.time}</span>
              </div>
              <span className="num text-[11px] text-muted-foreground">{done}/{s.items.length}</span>
            </div>
            <div className="space-y-1.5">
              {s.items.map((it, ii) => (
                <button
                  key={it.name}
                  onClick={() => toggle(ti, ii)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99]",
                    it.done
                      ? "bg-[oklch(0.84_0.14_210_/_0.08)] border-[oklch(0.84_0.14_210_/_0.20)]"
                      : "bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.05]",
                  )}
                >
                  <div className="leading-tight">
                    <div className={cn("text-[13px] font-medium", it.done && "text-muted-foreground line-through")}>{it.name}</div>
                    <div className="num text-[10.5px] text-muted-foreground">{it.dose}</div>
                  </div>
                  <span className={cn(
                    "h-6 w-6 grid place-items-center rounded-full border transition",
                    it.done
                      ? "bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.16_230)] border-transparent text-background"
                      : "border-white/20",
                  )}>
                    {it.done && <Check className="h-3.5 w-3.5" strokeWidth={2.8} />}
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}

function LabsTab() {
  return (
    <div className="space-y-3">
      <GlassCard className="p-4 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold">Upload Lab Report</div>
          <div className="text-[11px] text-muted-foreground">PDF or photo · Auto-extracted</div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium bg-white/[0.06] border border-white/10 hover:bg-white/[0.10]">
          <Upload className="h-3.5 w-3.5" /> Upload
        </button>
      </GlassCard>

      <SectionHeader title="Latest Biomarkers" className="mt-2" action={<span className="text-[11px] text-muted-foreground">Mar 18 · Quest</span>} />
      <div className="space-y-2">
        {biomarkers.map((b) => {
          const tint = b.status === "optimal" ? "mint" : b.status === "high" ? "rose" : "amber";
          return (
            <GlassCard key={b.name} className="p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-[13px] font-medium truncate">{b.name}</div>
                <div className="num text-[11px] text-muted-foreground">Range {b.range}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="num text-[15px] font-semibold">
                  {b.value}<span className="text-muted-foreground text-[11px] ml-1 font-normal">{b.unit}</span>
                </div>
                <Pill tint={tint as never}>{b.status}</Pill>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-[12px]">{label}</span>
      </div>
      <span className="num text-[12px] text-foreground/90">{value}</span>
    </div>
  );
}
