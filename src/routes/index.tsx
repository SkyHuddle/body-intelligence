import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Flame,
  Footprints,
  Droplets,
  Scale,
  Activity,
  Play,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Dumbbell,
  Apple,
  Pill as PillIcon,
} from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { ScoreRing } from "@/components/gm/ScoreRing";
import { MacroBar } from "@/components/gm/MacroBar";
import { MetricCard } from "@/components/gm/MetricCard";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { Sparkline } from "@/components/gm/Sparkline";
import { StreakRow } from "@/components/gm/StreakRow";
import { user, today, todayWorkout, dailyScore, streaks } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Today" },
      { name: "description", content: "Your daily performance system: training, nutrition, supplements, and recovery." },
    ],
  }),
  component: HomePage,
});

const tintColor = (t: string) =>
  t === "cyan"
    ? "oklch(0.84 0.14 210)"
    : t === "amber"
    ? "oklch(0.84 0.14 78)"
    : t === "violet"
    ? "oklch(0.74 0.17 290)"
    : "oklch(0.86 0.16 158)";

function HomePage() {
  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  })();

  const segments = dailyScore.breakdown.map((b) => ({
    value: b.value,
    weight: b.weight,
    color: tintColor(b.tint),
  }));

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
            <button className="h-10 w-10 rounded-full grid place-items-center text-sm font-semibold bg-gradient-to-br from-[oklch(0.90_0.12_200)] to-[oklch(0.74_0.17_290)] text-background ring-1 ring-white/20">
              {user.avatar}
            </button>
          </div>
        }
      />

      {/* Daily Score hero */}
      <GlassCard variant="hero" className="p-6 mb-3.5">
        <div className="flex items-center gap-5">
          <ScoreRing segments={segments} size={148} stroke={12}>
            <div>
              <div className="num text-[36px] font-semibold leading-none tracking-tight">{dailyScore.total}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Daily Score</div>
            </div>
          </ScoreRing>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground">Today</span>
              <Pill tint="mint">+{dailyScore.delta} vs avg</Pill>
            </div>
            {dailyScore.breakdown.map((b) => (
              <ScoreRow key={b.key} label={b.key} value={b.value} color={tintColor(b.tint)} />
            ))}
          </div>
        </div>

        {/* Insight chip */}
        <div className="mt-5 flex items-start gap-2 rounded-2xl bg-white/[0.04] border border-white/[0.06] px-3.5 py-2.5">
          <Sparkles className="h-4 w-4 text-[oklch(0.90_0.12_200)] shrink-0 mt-0.5" />
          <p className="text-[12.5px] leading-snug text-foreground/85">{today.insight}</p>
        </div>
      </GlassCard>

      {/* Streaks */}
      <StreakRow workout={streaks.workout} nutrition={streaks.nutrition} supplements={streaks.supplements} />

      {/* Macros / Calories card */}
      <GlassCard className="p-5 mt-3.5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Calories Remaining</div>
            <div className="num text-[26px] font-semibold tracking-tight mt-0.5">
              {(today.calories.goal - today.calories.eaten + today.calories.burned).toLocaleString()}
              <span className="text-[13px] text-muted-foreground font-normal ml-1.5">kcal</span>
            </div>
          </div>
          <Pill tint="cyan">On track</Pill>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <MacroBar label="Protein" value={today.macros.protein.value} goal={today.macros.protein.goal} color="cyan" />
          <MacroBar label="Carbs" value={today.macros.carbs.value} goal={today.macros.carbs.goal} color="amber" />
          <MacroBar label="Fat" value={today.macros.fat.value} goal={today.macros.fat.goal} color="violet" />
        </div>
      </GlassCard>

      {/* Today's Workout */}
      <SectionHeader title="Today's Workout" className="mt-7 mb-3" action={
        <button className="text-[12px] text-muted-foreground inline-flex items-center gap-0.5">
          All <ChevronRight className="h-3.5 w-3.5" />
        </button>
      } />
      <GlassCard className="p-5 overflow-hidden relative">
        <div className="flex items-start justify-between gap-3 relative">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Push · Week {todayWorkout.week}</div>
            <div className="mt-1 text-[20px] font-semibold tracking-tight">{todayWorkout.type}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {todayWorkout.muscles.map((m) => (<Pill key={m}>{m}</Pill>))}
            </div>
            <div className="mt-3 flex items-center gap-3 text-[12px] text-muted-foreground">
              <span className="num">{todayWorkout.duration} min</span>
              <span className="opacity-40">·</span>
              <span className="num">≈{todayWorkout.calories} cal</span>
              <span className="opacity-40">·</span>
              <span className="num">{todayWorkout.exercises.length} lifts</span>
            </div>
          </div>
          <span className="h-10 w-10 grid place-items-center rounded-2xl bg-[oklch(0.84_0.14_210_/_0.14)] text-[oklch(0.90_0.12_200)]">
            <Dumbbell className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </div>
        <button className="relative mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-background bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.16_230)] ring-1 ring-white/20 shadow-[0_14px_30px_-14px_oklch(0.84_0.14_210_/_0.55)] active:scale-[0.99] transition">
          <Play className="h-4 w-4 fill-background" />
          Start Workout
        </button>
      </GlassCard>

      {/* Quick stats */}
      <SectionHeader title="Today" className="mt-7 mb-3" />
      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon={Footprints} label="Steps" value={today.steps.value.toLocaleString()} sub={`Goal ${today.steps.goal.toLocaleString()}`} progress={(today.steps.value / today.steps.goal) * 100} tint="mint" />
        <MetricCard icon={Droplets} label="Water" value={today.water.value} unit="oz" sub={`of ${today.water.goal} oz`} progress={(today.water.value / today.water.goal) * 100} tint="cyan" />
        <MetricCard icon={Scale} label="Weight" value={today.weight.value} unit="lb" sub={`${today.weight.delta > 0 ? "+" : ""}${today.weight.delta} lb today`} tint="violet" />
        <MetricCard icon={Flame} label="Active" value={today.active.value} unit="cal" sub={`Goal ${today.active.goal}`} progress={(today.active.value / today.active.goal) * 100} tint="amber" />
      </div>

      {/* Trends */}
      <SectionHeader title="Trends" className="mt-7 mb-3" />
      <div className="-mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar">
        <TrendCard label="Weight" value={`${today.weight.value} lb`} delta="-1.9 lb · 30d" icon={TrendingUp} data={today.weightTrend} tint="violet" />
        <TrendCard label="Volume" value="17,000 lb" delta="+18% w/w" icon={Dumbbell} data={today.volumeTrend} tint="cyan" />
        <TrendCard label="Macros" value="92%" delta="7-day adherence" icon={Apple} data={today.macroTrend} tint="mint" />
        <CoachCard />
      </div>
    </AppShell>
  );
}

function ScoreRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-[12px] text-foreground/85">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </span>
      <div className="flex items-center gap-2 flex-1 max-w-[110px]">
        <div className="h-1 flex-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
        </div>
        <span className="num text-[11px] text-muted-foreground w-7 text-right">{value}</span>
      </div>
    </div>
  );
}

function TrendCard({
  label,
  value,
  delta,
  icon: Icon,
  data,
  tint,
}: {
  label: string;
  value: string;
  delta: string;
  icon: typeof Flame;
  data: number[];
  tint: "cyan" | "violet" | "mint";
}) {
  const colors: Record<string, { stroke: string; fill: string }> = {
    cyan: { stroke: "oklch(0.90 0.12 200)", fill: "oklch(0.84 0.14 210 / 0.28)" },
    violet: { stroke: "oklch(0.80 0.16 295)", fill: "oklch(0.74 0.17 290 / 0.28)" },
    mint: { stroke: "oklch(0.86 0.16 158)", fill: "oklch(0.86 0.16 158 / 0.26)" },
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
    <GlassCard variant="strong" className="min-w-[210px] p-4 rounded-2xl flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <span className="h-7 w-7 rounded-full grid place-items-center bg-gradient-to-br from-[oklch(0.92_0.12_205)] to-[oklch(0.74_0.17_290)]">
          <Sparkles className="h-3.5 w-3.5 text-background" />
        </span>
        <span className="text-[12px] font-semibold">AI Coach</span>
      </div>
      <p className="mt-2 text-[12px] text-foreground/80 leading-snug">"Add 30 g protein after your push session — you'll be optimal."</p>
      <button className="mt-3 inline-flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium bg-white/[0.06] border border-white/10 hover:bg-white/[0.10]">
        Open chat <ChevronRight className="h-3 w-3" />
      </button>
    </GlassCard>
  );
}
