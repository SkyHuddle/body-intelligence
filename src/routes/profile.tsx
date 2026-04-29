import { createFileRoute } from "@tanstack/react-router";
import {
  Settings,
  Award,
  Target,
  Calendar,
  Camera,
  Users,
  Download,
  ChevronRight,
  Sparkles,
  Flame,
  Trophy,
  Apple,
  Pill as PillIcon,
} from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { Pill } from "@/components/gm/Pill";
import { user, streaks } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Profile" },
      { name: "description", content: "Goals, badges, and your training identity." },
    ],
  }),
  component: ProfilePage,
});

const badges = [
  { label: "30-Day Streak", icon: Flame, tint: "amber" as const },
  { label: "Bench 245 PR", icon: Trophy, tint: "cyan" as const },
  { label: "Protein Pro", icon: Apple, tint: "mint" as const },
  { label: "Sleep Master", icon: Sparkles, tint: "violet" as const },
];

const tintMap = {
  cyan: { bg: "oklch(0.84 0.14 210 / 0.14)", fg: "oklch(0.90 0.12 200)" },
  amber: { bg: "oklch(0.84 0.14 78 / 0.16)", fg: "oklch(0.92 0.13 85)" },
  mint: { bg: "oklch(0.86 0.16 158 / 0.14)", fg: "oklch(0.90 0.16 160)" },
  violet: { bg: "oklch(0.74 0.17 290 / 0.16)", fg: "oklch(0.86 0.14 290)" },
  rose: { bg: "oklch(0.74 0.18 18 / 0.14)", fg: "oklch(0.85 0.16 22)" },
} as const;

const links: { label: string; sub: string; icon: typeof Award; tint: keyof typeof tintMap }[] = [
  { label: "Goals", sub: "Recomp · 175 lb · 12% BF", icon: Target, tint: "cyan" },
  { label: "Calendar", sub: "April · 19 sessions · 4 PRs", icon: Calendar, tint: "violet" },
  { label: "Progress Photos", sub: "12 photos · last 14d", icon: Camera, tint: "amber" },
  { label: "Community", sub: "GymMaxx Inner Circle", icon: Users, tint: "mint" },
  { label: "Doctor / Data Export", sub: "PDF · CSV · FHIR", icon: Download, tint: "rose" },
];

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader
        title="Profile"
        right={<GlassIconButton><Settings className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Identity */}
      <GlassCard variant="hero" className="p-5 mb-3.5">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl grid place-items-center text-[22px] font-semibold bg-gradient-to-br from-[oklch(0.90_0.12_200)] to-[oklch(0.74_0.17_290)] text-background ring-1 ring-white/20">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[18px] font-semibold tracking-tight truncate">{user.fullName}</div>
            <div className="text-[12px] text-muted-foreground">{user.goal}</div>
            <div className="mt-2 flex gap-1.5">
              <Pill tint="cyan"><Sparkles className="h-3 w-3" /> Pro</Pill>
              <Pill tint="amber"><Flame className="h-3 w-3" /> {user.streak}d</Pill>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label="Weight" value="184.2" unit="lb" />
          <Stat label="Sessions" value={user.workoutsCompleted} />
          <Stat label="PRs" value={12} unit="this mo" />
        </div>
      </GlassCard>

      {/* Streak summary */}
      <GlassCard className="p-4 mb-6">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Active Streaks</div>
        <div className="grid grid-cols-3 gap-2">
          <StreakCell icon={Flame} label="Training" days={streaks.workout} tint="amber" />
          <StreakCell icon={Apple} label="Nutrition" days={streaks.nutrition} tint="mint" />
          <StreakCell icon={PillIcon} label="Supps" days={streaks.supplements} tint="violet" />
        </div>
      </GlassCard>

      {/* Badges */}
      <SectionHeader title="Badges" className="mb-3" />
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 mb-7">
        {badges.map((b) => {
          const t = tintMap[b.tint];
          return (
            <div
              key={b.label}
              className="shrink-0 glass rounded-2xl px-4 py-3.5 flex items-center gap-2.5"
            >
              <span
                className="h-9 w-9 grid place-items-center rounded-xl"
                style={{ backgroundColor: t.bg, color: t.fg }}
              >
                <b.icon className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="text-[12.5px] font-medium whitespace-nowrap">{b.label}</span>
            </div>
          );
        })}
      </div>

      {/* Links */}
      <div className="space-y-2.5">
        {links.map((l) => {
          const t = tintMap[l.tint];
          return (
            <GlassCard key={l.label} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-xl grid place-items-center"
                  style={{ backgroundColor: t.bg, color: t.fg }}
                >
                  <l.icon className="h-4 w-4" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold">{l.label}</div>
                  <div className="text-[11px] text-muted-foreground">{l.sub}</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </GlassCard>
          );
        })}
      </div>
    </AppShell>
  );
}

function SectionHeader({ title, className }: { title: string; className?: string }) {
  return <h2 className={cn("text-[15px] font-semibold tracking-tight px-1", className)}>{title}</h2>;
}

function Stat({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 num text-[18px] font-semibold">
        {value}{unit && <span className="ml-1 text-[11px] text-muted-foreground font-normal">{unit}</span>}
      </div>
    </div>
  );
}

function StreakCell({
  icon: Icon,
  label,
  days,
  tint,
}: {
  icon: typeof Flame;
  label: string;
  days: number;
  tint: keyof typeof tintMap;
}) {
  const t = tintMap[tint];
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-3 flex items-center gap-2.5">
      <span className="h-9 w-9 grid place-items-center rounded-xl" style={{ backgroundColor: t.bg, color: t.fg }}>
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <div className="leading-tight">
        <div className="num text-[16px] font-semibold">{days}<span className="text-[11px] text-muted-foreground font-normal ml-0.5">d</span></div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
