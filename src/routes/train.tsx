import { createFileRoute } from "@tanstack/react-router";
import { Play, Plus, Flame, Clock, Dumbbell, ChevronRight, History } from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { SectionHeader } from "@/components/gm/SectionHeader";
import { Pill } from "@/components/gm/Pill";
import { todayWorkout, routines } from "@/lib/mock";

export const Route = createFileRoute("/train")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Train" },
      { name: "description", content: "Routines, today's workout, and your training history." },
    ],
  }),
  component: TrainPage,
});

const week = ["M", "T", "W", "T", "F", "S", "S"];
const completed = [true, true, false, true, true, false, false];

function TrainPage() {
  return (
    <AppShell>
      <PageHeader
        title="Train"
        subtitle="6-day push/pull/legs · Week 4"
        right={<GlassIconButton><Plus className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Streak */}
      <GlassCard className="p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Weekly Streak</div>
            <div className="mt-1 num text-[20px] font-semibold">5 / 6 sessions</div>
          </div>
          <Pill tint="cyan"><Flame className="h-3 w-3" /> 23-day streak</Pill>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {week.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">{d}</span>
              <div className={`h-9 w-full rounded-xl border ${completed[i] ? "bg-gradient-to-b from-[oklch(0.88_0.13_200_/_0.35)] to-[oklch(0.78_0.17_235_/_0.18)] border-[oklch(0.82_0.16_215_/_0.35)]" : "bg-white/[0.03] border-white/[0.06]"}`} />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Today's workout big card */}
      <GlassCard variant="hero" className="p-5 mb-6">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Today</div>
        <div className="mt-1 text-[24px] font-semibold tracking-tight">{todayWorkout.type}</div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {todayWorkout.muscles.map((m) => <Pill key={m} tint="cyan">{m}</Pill>)}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {todayWorkout.duration} min</span>
          <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> ≈{todayWorkout.calories} cal</span>
          <span className="inline-flex items-center gap-1"><Dumbbell className="h-3.5 w-3.5" /> {todayWorkout.exercises.length}</span>
        </div>

        <div className="mt-4 space-y-2">
          {todayWorkout.exercises.map((e, i) => (
            <div key={e.name} className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
              <div className="flex items-center gap-3">
                <span className="num text-[11px] text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[13px] font-medium">{e.name}</span>
              </div>
              <span className="num text-[12px] text-muted-foreground">{e.sets}</span>
            </div>
          ))}
        </div>

        <button className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[14px] font-semibold text-background bg-gradient-to-b from-[oklch(0.92_0.12_205)] to-[oklch(0.78_0.17_225)] shadow-[0_10px_30px_-10px_oklch(0.82_0.16_215_/_0.7)] ring-1 ring-white/20">
          <Play className="h-4 w-4 fill-background" /> Start Workout
        </button>
      </GlassCard>

      {/* Routines */}
      <SectionHeader title="Your Routines" action={<button className="text-[12px] text-muted-foreground inline-flex items-center gap-0.5">All <ChevronRight className="h-3.5 w-3.5" /></button>} />
      <div className="mt-3 space-y-2.5 mb-6">
        {routines.map((r) => (
          <GlassCard key={r.name} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-semibold">{r.name}</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">{r.days} days/week · {r.lastDone}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </GlassCard>
        ))}
      </div>

      {/* History */}
      <SectionHeader title="Recent History" action={<History className="h-4 w-4 text-muted-foreground" />} />
      <div className="mt-3 space-y-2.5">
        {[
          { name: "Pull Day", when: "Yesterday · 1h 02m", vol: "14.2k lb" },
          { name: "Leg Day", when: "2d ago · 1h 14m", vol: "22.6k lb" },
          { name: "Push Day", when: "3d ago · 56m", vol: "13.9k lb" },
        ].map((h) => (
          <GlassCard key={h.when} className="p-4 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-medium">{h.name}</div>
              <div className="text-[11px] text-muted-foreground">{h.when}</div>
            </div>
            <span className="num text-[12px] text-muted-foreground">{h.vol}</span>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
