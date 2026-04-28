import { createFileRoute } from "@tanstack/react-router";
import { Bell, Flame, Footprints, Droplets, Scale, Activity, Play, ChevronRight, Sparkles, TrendingUp, LineChart } from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { ProgressRing } from "@/components/gm/ProgressRing";
import { MacroBar } from "@/components/gm/MacroBar";
import { MetricCard } from "@/components/gm/MetricCard";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { Sparkline } from "@/components/gm/Sparkline";
import { user, today, todayWorkout } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Today" },
      { name: "description", content: "Your daily command center for training, nutrition, and recovery." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const remaining = today.calories.goal - today.calories.eaten + today.calories.burned;
  const ringPct = ((today.calories.eaten - today.calories.burned) / today.calories.goal) * 100;
  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  })();

  return (
    <AppShell>
      <PageHeader
        title={`${greeting}, ${user.name}`}
        subtitle={today.date}
        right={
          <div className="flex items-center gap-2">
            <GlassIconButton aria-label="Notifications">
              <Bell className="h-[18px] w-[18px] text-foreground/80" strokeWidth={2} />
            </GlassIconButton>
            <button className="h-10 w-10 rounded-full grid place-items-center text-sm font-semibold bg-gradient-to-br from-[oklch(0.88_0.13_200)] to-[oklch(0.65_0.20_290)] text-background ring-1 ring-white/20">
              {user.avatar}
            </button>
          </div>
        }
      />

      {/* Insight chip */}
      <div className="mb-5 flex items-center gap-2 text-[12px] text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-[oklch(0.92_0.12_205)]" />
        <span className="text-balance">{today.insight}</span>
      </div>

      {/* Hero progress card */}
      <GlassCard variant="hero" className="p-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Calories Remaining</div>
            <h2 className="mt-1 text-[15px] font-medium text-foreground/90">Today's Progress</h2>
          </div>
          <Pill tint="cyan">On Track</Pill>
        </div>

        <div className="flex items-center gap-5 mt-3">
          <ProgressRing value={ringPct} size={172} stroke={14}>
            <div>
              <div className="num text-[40px] font-semibold leading-none tracking-tight">{remaining.toLocaleString()}</div>
              <div className="text-[11px] mt-1 text-muted-foreground">remaining</div>
            </div>
          </ProgressRing>

          <div className="flex-1 space-y-3">
            <Stat label="Goal" value={today.calories.goal} icon={Flame} tint="cyan" />
            <Stat label="Food" value={today.calories.eaten} icon={Activity} tint="violet" />
            <Stat label="Burned" value={today.calories.burned} icon={Flame} tint="amber" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <MacroBar label="Protein" value={today.macros.protein.value} goal={today.macros.protein.goal} color="cyan" />
          <MacroBar label="Carbs" value={today.macros.carbs.value} goal={today.macros.carbs.goal} color="amber" />
          <MacroBar label="Fat" value={today.macros.fat.value} goal={today.macros.fat.goal} color="violet" />
        </div>
      </GlassCard>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <MetricCard icon={Footprints} label="Steps" value={today.steps.value.toLocaleString()} sub={`Goal ${today.steps.goal.toLocaleString()}`} progress={(today.steps.value / today.steps.goal) * 100} tint="mint" />
        <MetricCard icon={Droplets} label="Water" value={today.water.value} unit="L" sub={`of ${today.water.goal} L`} progress={(today.water.value / today.water.goal) * 100} tint="cyan" />
        <MetricCard icon={Scale} label="Weight" value={today.weight.value} unit="lb" sub={`${today.weight.delta} lb today`} tint="violet" />
        <MetricCard icon={Flame} label="Active" value={today.active.value} unit="cal" sub={`Goal ${today.active.goal}`} progress={(today.active.value / today.active.goal) * 100} tint="amber" />
      </div>

      {/* Today's Workout */}
      <SectionHeader title="Today's Workout" action={<button className="text-[12px] text-muted-foreground inline-flex items-center gap-0.5">All <ChevronRight className="h-3.5 w-3.5" /></button>} />
      <GlassCard className="mt-3 p-5 mb-6 overflow-hidden relative">
        <div aria-hidden className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[oklch(0.82_0.16_215_/_0.18)] blur-3xl" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Push Day · Week 4</div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">{todayWorkout.type}</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {todayWorkout.muscles.map((m) => (<Pill key={m}>{m}</Pill>))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[12px] text-muted-foreground">
              <span className="num">{todayWorkout.duration} min</span>
              <span>·</span>
              <span className="num">≈{todayWorkout.calories} cal</span>
              <span>·</span>
              <span className="num">{todayWorkout.exercises.length} exercises</span>
            </div>
          </div>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {todayWorkout.exercises.slice(0, 4).map((e) => (
            <span key={e.name} className="text-[11px] px-2 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-foreground/80">{e.name}</span>
          ))}
          <span className="text-[11px] px-2 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-muted-foreground">+{todayWorkout.exercises.length - 4} more</span>
        </div>
        <button className="relative mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-background bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.17_225)] shadow-[0_10px_30px_-10px_oklch(0.82_0.16_215_/_0.7)] ring-1 ring-white/20 active:scale-[0.99] transition">
          <Play className="h-4 w-4 fill-background" />
          Start Workout
        </button>
      </GlassCard>

      {/* Analytics */}
      <SectionHeader title="Analytics" />
      <div className="mt-3 -mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar">
        <AnalyticsCard label="Weight" value={`${today.weight.value} lb`} delta={today.weight.delta < 0 ? `${today.weight.delta} lb` : `+${today.weight.delta}`} icon={TrendingUp} data={today.weightTrend} tint="violet" />
        <AnalyticsCard label="Volume" value="17.0 k" delta="+18%" icon={LineChart} data={today.volumeTrend} tint="cyan" />
        <AnalyticsCard label="Macros" value="92%" delta="7-day" icon={Activity} data={today.macroTrend} tint="mint" />
        <CoachCard />
      </div>
    </AppShell>
  );
}

function Stat({ label, value, icon: Icon, tint }: { label: string; value: number; icon: typeof Flame; tint: "cyan" | "violet" | "amber" }) {
  const dot: Record<string, string> = {
    cyan: "bg-[oklch(0.88_0.13_200)]",
    violet: "bg-[oklch(0.72_0.18_295)]",
    amber: "bg-[oklch(0.83_0.15_75)]",
  };
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot[tint]}`} />
        <span className="text-[12px] text-muted-foreground">{label}</span>
      </div>
      <span className="num text-[13px] font-semibold">{value.toLocaleString()}</span>
    </div>
  );
}

function AnalyticsCard({ label, value, delta, icon: Icon, data, tint }: { label: string; value: string; delta: string; icon: typeof Flame; data: number[]; tint: "cyan" | "violet" | "mint" }) {
  const colors: Record<string, { stroke: string; fill: string }> = {
    cyan: { stroke: "oklch(0.88 0.13 200)", fill: "oklch(0.82 0.16 215 / 0.30)" },
    violet: { stroke: "oklch(0.78 0.16 295)", fill: "oklch(0.72 0.18 295 / 0.30)" },
    mint: { stroke: "oklch(0.85 0.18 155)", fill: "oklch(0.85 0.18 155 / 0.28)" },
  };
  return (
    <GlassCard className="min-w-[180px] p-4 rounded-2xl flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="mt-2 num text-[18px] font-semibold tracking-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{delta}</div>
      <div className="mt-2"><Sparkline data={data} width={150} height={40} stroke={colors[tint].stroke} fill={colors[tint].fill} /></div>
    </GlassCard>
  );
}

function CoachCard() {
  return (
    <GlassCard variant="strong" className="min-w-[200px] p-4 rounded-2xl flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <span className="h-7 w-7 rounded-full grid place-items-center bg-gradient-to-br from-[oklch(0.92_0.12_205)] to-[oklch(0.65_0.20_290)]">
          <Sparkles className="h-3.5 w-3.5 text-background" />
        </span>
        <span className="text-[12px] font-semibold">AI Coach</span>
      </div>
      <p className="mt-2 text-[12px] text-foreground/80 leading-snug">"Add 30g protein after your push session — you'll be optimal."</p>
      <button className="mt-3 inline-flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium bg-white/[0.06] border border-white/10 hover:bg-white/[0.10]">Open chat <ChevronRight className="h-3 w-3" /></button>
    </GlassCard>
  );
}
