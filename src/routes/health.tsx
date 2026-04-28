import { createFileRoute } from "@tanstack/react-router";
import { Footprints, Droplets, HeartPulse, Activity, Pill as PillIcon, FlaskConical, Upload, ChevronRight, TrendingDown, TrendingUp, Plus } from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { ProgressRing } from "@/components/gm/ProgressRing";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { Sparkline } from "@/components/gm/Sparkline";
import { today, supplements, biomarkers, measurements, protocols } from "@/lib/mock";
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

const tabs = ["Track", "Body", "Supplements", "Protocols", "Labs"] as const;
type Tab = typeof tabs[number];

function HealthPage() {
  const [tab, setTab] = useState<Tab>("Track");
  return (
    <AppShell>
      <PageHeader
        title="Health"
        subtitle="Optimize body, recovery & longevity"
        right={<GlassIconButton><Plus className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Segmented */}
      <div className="glass rounded-full p-1 flex items-center gap-1 mb-5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition",
              tab === t ? "bg-white/10 text-foreground border border-white/15" : "text-muted-foreground hover:text-foreground/80",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Track" && <TrackTab />}
      {tab === "Body" && <BodyTab />}
      {tab === "Supplements" && <SupplementsTab />}
      {tab === "Protocols" && <ProtocolsTab />}
      {tab === "Labs" && <LabsTab />}
    </AppShell>
  );
}

function TrackTab() {
  return (
    <div className="space-y-4">
      <GlassCard variant="hero" className="p-5">
        <div className="flex items-center gap-5">
          <ProgressRing value={(today.steps.value / today.steps.goal) * 100} size={150} stroke={12} from="oklch(0.90 0.16 160)" to="oklch(0.78 0.17 200)" gradientId="stepsRing">
            <div>
              <div className="num text-[26px] font-semibold leading-none">{(today.steps.value / 1000).toFixed(1)}k</div>
              <div className="text-[10px] text-muted-foreground mt-1">steps</div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2.5">
            <Row icon={<Footprints className="h-4 w-4" />} label="Steps" value={`${today.steps.value.toLocaleString()} / ${today.steps.goal.toLocaleString()}`} />
            <Row icon={<Activity className="h-4 w-4" />} label="Active" value={`${today.active.value} cal`} />
            <Row icon={<HeartPulse className="h-4 w-4" />} label="Resting HR" value="58 bpm" />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Hydration</div>
            <div className="mt-1 num text-[20px] font-semibold">{today.water.value} / {today.water.goal} L</div>
          </div>
          <Pill tint="cyan">{Math.round((today.water.value / today.water.goal) * 100)}%</Pill>
        </div>
        <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => {
            const filled = i < Math.round((today.water.value / today.water.goal) * 8);
            return (
              <button key={i} className={cn(
                "aspect-[3/4] rounded-lg border",
                filled ? "bg-gradient-to-b from-[oklch(0.88_0.13_200_/_0.45)] to-[oklch(0.78_0.17_235_/_0.20)] border-[oklch(0.82_0.16_215_/_0.40)]" : "bg-white/[0.03] border-white/[0.06]",
              )} />
            );
          })}
        </div>
      </GlassCard>

      <GlassCard className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 grid place-items-center rounded-xl bg-[oklch(0.73_0.19_18_/_0.16)] text-[oklch(0.85_0.16_22)]">
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
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Weight</div>
            <div className="mt-1 num text-[36px] font-semibold tracking-tight">184.2<span className="text-[16px] text-muted-foreground ml-1">lb</span></div>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-[oklch(0.90_0.16_160)]"><TrendingDown className="h-3.5 w-3.5" /> -1.9 lb · 30d</div>
          </div>
          <Sparkline data={today.weightTrend} width={140} height={56} />
        </div>
      </GlassCard>

      <SectionHeader title="Measurements" />
      <div className="grid grid-cols-2 gap-3">
        {measurements.map((m) => (
          <GlassCard key={m.name} className="p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.name}</div>
            <div className="mt-1 num text-[18px] font-semibold">{m.value}</div>
            <div className={cn("text-[11px] mt-0.5 inline-flex items-center gap-1", m.trend === "down" ? "text-[oklch(0.90_0.16_160)]" : "text-[oklch(0.92_0.12_205)]")}>
              {m.trend === "down" ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />} {m.delta}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function SupplementsTab() {
  return (
    <div className="space-y-3">
      {supplements.map((s) => (
        <GlassCard key={s.time} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PillIcon className="h-4 w-4 text-[oklch(0.86_0.14_295)]" />
              <span className="text-[13px] font-semibold">{s.time}</span>
            </div>
            <span className="num text-[11px] text-muted-foreground">{s.done}/{s.total}</span>
          </div>
          <div className="space-y-1.5">
            {s.items.map((it, i) => {
              const done = i < s.done;
              return (
                <button key={it} className="w-full flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2.5 text-left">
                  <span className={cn("text-[13px]", done ? "line-through text-muted-foreground" : "")}>{it}</span>
                  <span className={cn(
                    "h-5 w-5 rounded-full border grid place-items-center text-[10px]",
                    done ? "bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.17_225)] border-transparent text-background" : "border-white/15",
                  )}>{done ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

function ProtocolsTab() {
  return (
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
              <Pill tint={p.tint}>Week {p.week}/{p.total}</Pill>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[oklch(0.88_0.13_200)] to-[oklch(0.65_0.20_290)]" style={{ width: `${pct}%` }} />
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
        <button className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium bg-white/[0.06] border border-white/10">
          <Upload className="h-3.5 w-3.5" /> Upload
        </button>
      </GlassCard>

      <SectionHeader title="Latest Biomarkers" action={<span className="text-[11px] text-muted-foreground">Mar 18 · Quest</span>} />
      <div className="space-y-2">
        {biomarkers.map((b) => {
          const tint = b.status === "optimal" ? "mint" : b.status === "high" ? "rose" : "amber";
          return (
            <GlassCard key={b.name} className="p-4 flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium">{b.name}</div>
                <div className="num text-[11px] text-muted-foreground">Range {b.range}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="num text-[15px] font-semibold">{b.value}<span className="text-muted-foreground text-[11px] ml-1">{b.unit}</span></div>
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
      <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-[12px]">{label}</span></div>
      <span className="num text-[12px] text-foreground/90">{value}</span>
    </div>
  );
}
