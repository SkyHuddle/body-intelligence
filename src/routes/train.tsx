import { createFileRoute } from "@tanstack/react-router";
import {
  Play,
  Plus,
  Flame,
  Clock,
  Dumbbell,
  ChevronRight,
  Trophy,
  TrendingUp,
  Check,
  Minus,
  Sparkles,
} from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { Sparkline } from "@/components/gm/Sparkline";
import { todayWorkout, routines, recentWorkouts, personalRecords } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/train")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Train" },
      { name: "description", content: "Track lifts, PRs, and progression with surgical precision." },
    ],
  }),
  component: TrainPage,
});

function TrainPage() {
  return (
    <AppShell>
      <PageHeader
        title="Train"
        subtitle={`Push / Pull / Legs · Week ${todayWorkout.week}`}
        right={<GlassIconButton><Plus className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Today's Workout — primary card */}
      <GlassCard variant="hero" className="p-5 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Today</div>
            <div className="mt-1 text-[24px] font-semibold tracking-tight">{todayWorkout.type}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {todayWorkout.muscles.map((m) => <Pill key={m} tint="cyan">{m}</Pill>)}
            </div>
          </div>
          <span className="h-11 w-11 grid place-items-center rounded-2xl bg-[oklch(0.84_0.14_210_/_0.14)] text-[oklch(0.90_0.12_200)]">
            <Dumbbell className="h-5 w-5" strokeWidth={2.2} />
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {todayWorkout.duration} min</span>
          <span className="opacity-40">·</span>
          <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> ≈{todayWorkout.calories} cal</span>
          <span className="opacity-40">·</span>
          <span className="inline-flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5" /> {todayWorkout.exercises.length} lifts</span>
        </div>

        <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-background bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.16_230)] ring-1 ring-white/20 shadow-[0_14px_30px_-14px_oklch(0.84_0.14_210_/_0.55)]">
          <Play className="h-4 w-4 fill-background" /> Start Workout
        </button>
      </GlassCard>

      {/* Exercise progression cards */}
      <SectionHeader title="Lifts" className="mt-2 mb-3" action={<span className="text-[11px] text-muted-foreground">Tap to log</span>} />
      <div className="space-y-3 mb-7">
        {todayWorkout.exercises.map((ex) => (
          <ExerciseCard key={ex.name} ex={ex} />
        ))}
      </div>

      {/* Personal Records */}
      <SectionHeader title="Personal Records" className="mb-3" action={<button className="text-[12px] text-muted-foreground inline-flex items-center gap-0.5">All <ChevronRight className="h-3.5 w-3.5" /></button>} />
      <div className="-mx-5 px-5 flex gap-3 overflow-x-auto no-scrollbar mb-7">
        {personalRecords.map((pr) => (
          <GlassCard key={pr.lift} className="min-w-[200px] p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{pr.lift}</span>
              <Trophy className="h-3.5 w-3.5 text-[oklch(0.84_0.14_78)]" />
            </div>
            <div className="mt-2 num text-[26px] font-semibold tracking-tight">
              {pr.weight}<span className="text-[12px] text-muted-foreground font-normal ml-1">lb</span>
            </div>
            <div className="text-[11px] text-muted-foreground">{pr.reps} rep · {pr.when}</div>
            <div className="mt-2">
              <Sparkline
                data={pr.progress}
                width={170}
                height={36}
                stroke="oklch(0.84 0.14 78)"
                fill="oklch(0.84 0.14 78 / 0.25)"
              />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Routines */}
      <SectionHeader title="Your Routines" className="mb-3" action={<button className="text-[12px] text-muted-foreground inline-flex items-center gap-0.5">All <ChevronRight className="h-3.5 w-3.5" /></button>} />
      <div className="space-y-2.5 mb-7">
        {routines.map((r) => (
          <GlassCard key={r.name} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-semibold">{r.name}</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">{r.days} days/wk · {r.lastDone}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </GlassCard>
        ))}
      </div>

      {/* History */}
      <SectionHeader title="Recent Sessions" className="mb-3" />
      <div className="space-y-2.5">
        {recentWorkouts.map((h) => (
          <GlassCard key={h.when} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold flex items-center gap-2">
                {h.name}
                {h.prs > 0 && <Pill tint="amber"><Trophy className="h-3 w-3" /> {h.prs} PR</Pill>}
              </div>
              <div className="text-[11px] text-muted-foreground">{h.when}</div>
            </div>
            <span className="num text-[12px] text-muted-foreground">{h.vol}</span>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}

type Exercise = (typeof todayWorkout.exercises)[number];

function ExerciseCard({ ex }: { ex: Exercise }) {
  const [expanded, setExpanded] = useState(false);
  const completed = ex.sets.filter((s) => s.done).length;
  const totalReps = ex.sets.length;

  return (
    <GlassCard className="overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold tracking-tight truncate">{ex.name}</span>
            {ex.isPrAttempt && <Pill tint="amber"><Trophy className="h-3 w-3" /> PR</Pill>}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11.5px] text-muted-foreground">
            <span className="num">{ex.target}</span>
            <span className="opacity-40">·</span>
            <span className="num">Last {ex.lastWeight} lb</span>
            <span className="opacity-40">·</span>
            <span className="num inline-flex items-center gap-0.5 text-[oklch(0.90_0.12_200)]">
              <Sparkles className="h-3 w-3" /> {ex.suggestion} lb
            </span>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="num text-[11px] text-muted-foreground">{completed}/{totalReps}</span>
          <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-90")} />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 space-y-2 border-t border-white/[0.05]">
          <div className="grid grid-cols-[20px_1fr_1fr_36px] gap-2 pt-2.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>#</span>
            <span>Reps</span>
            <span>Weight</span>
            <span></span>
          </div>
          {ex.sets.map((s, i) => (
            <SetRow key={i} index={i + 1} set={s} suggestion={ex.suggestion} />
          ))}
          <button className="w-full mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/10 py-2.5 text-[12px] text-muted-foreground hover:bg-white/[0.03]">
            <Plus className="h-3.5 w-3.5" /> Add set
          </button>
        </div>
      )}
    </GlassCard>
  );
}

type SetT = (typeof todayWorkout.exercises)[number]["sets"][number];

function SetRow({ index, set, suggestion }: { index: number; set: SetT; suggestion: number }) {
  const [reps, setReps] = useState<number>(set.reps || set.prevReps);
  const [weight, setWeight] = useState<number>(set.weight || suggestion);
  const [done, setDone] = useState(set.done);
  const isPr = done && weight > 0 && weight >= suggestion + 5;

  return (
    <div className={cn(
      "grid grid-cols-[20px_1fr_1fr_36px] gap-2 items-center rounded-xl px-2 py-1.5 border transition-colors",
      done ? "bg-[oklch(0.84_0.14_210_/_0.10)] border-[oklch(0.84_0.14_210_/_0.25)]" : "bg-white/[0.03] border-white/[0.05]",
    )}>
      <span className="num text-[11px] text-muted-foreground text-center">{index}</span>
      <Stepper value={reps} onChange={setReps} suffix="" hint={`prev ${set.prevReps}`} />
      <Stepper value={weight} onChange={setWeight} suffix="lb" hint={`prev ${set.prevWeight}`} />
      <button
        onClick={() => setDone((v) => !v)}
        className={cn(
          "h-8 w-8 grid place-items-center rounded-xl border transition active:scale-90",
          done
            ? "bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.16_230)] border-transparent text-background shadow-[0_4px_12px_-4px_oklch(0.84_0.14_210_/_0.55)]"
            : "border-white/15 text-muted-foreground hover:border-white/25",
        )}
      >
        {done ? (isPr ? <Trophy className="h-3.5 w-3.5" /> : <Check className="h-4 w-4" strokeWidth={2.5} />) : <Check className="h-4 w-4 opacity-30" />}
      </button>
    </div>
  );
}

function Stepper({
  value,
  onChange,
  suffix,
  hint,
}: {
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  hint?: string;
}) {
  const step = suffix === "lb" ? 5 : 1;
  return (
    <div className="flex items-center justify-between gap-1 rounded-lg bg-white/[0.04] border border-white/[0.06] px-1 py-0.5">
      <button
        onClick={() => onChange(Math.max(0, value - step))}
        className="h-6 w-6 grid place-items-center rounded-md hover:bg-white/[0.06] text-muted-foreground active:scale-90"
      >
        <Minus className="h-3 w-3" />
      </button>
      <div className="flex flex-col items-center leading-none">
        <span className="num text-[13px] font-semibold">
          {value}
          {suffix && <span className="text-muted-foreground text-[10px] font-normal ml-0.5">{suffix}</span>}
        </span>
        {hint && <span className="num text-[9px] text-muted-foreground mt-0.5">{hint}</span>}
      </div>
      <button
        onClick={() => onChange(value + step)}
        className="h-6 w-6 grid place-items-center rounded-md hover:bg-white/[0.06] text-muted-foreground active:scale-90"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

// keep TrendingUp import used
void TrendingUp;
