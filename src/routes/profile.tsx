import { createFileRoute } from "@tanstack/react-router";
import { Settings, Award, Target, Calendar, Camera, Users, Download, ChevronRight, Sparkles, Flame } from "lucide-react";
import { AppShell, PageHeader, GlassIconButton } from "@/components/gm/AppShell";
import { GlassCard } from "@/components/gm/GlassCard";
import { Pill } from "@/components/gm/Pill";
import { user } from "@/lib/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "GymMaxx — Profile" },
      { name: "description", content: "Goals, badges, photos, and your training community." },
    ],
  }),
  component: ProfilePage,
});

const links: { label: string; sub: string; icon: typeof Award; tint: "cyan" | "violet" | "mint" | "amber" | "rose" }[] = [
  { label: "Goals", sub: "Recomp · 175 lb · 12% BF", icon: Target, tint: "cyan" },
  { label: "Calendar", sub: "April · 19 sessions logged", icon: Calendar, tint: "violet" },
  { label: "Progress Photos", sub: "12 photos · last 14d", icon: Camera, tint: "amber" },
  { label: "Community", sub: "GymMaxx Inner Circle", icon: Users, tint: "mint" },
  { label: "Doctor / Data Export", sub: "PDF · CSV · FHIR", icon: Download, tint: "rose" },
];

const badges = [
  { label: "30-Day Streak", tint: "cyan" as const },
  { label: "Protein Pro", tint: "mint" as const },
  { label: "PR · Bench 245", tint: "amber" as const },
  { label: "Sleep Master", tint: "violet" as const },
];

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader
        title="Profile"
        subtitle="Your performance & identity"
        right={<GlassIconButton><Settings className="h-[18px] w-[18px]" strokeWidth={2.2} /></GlassIconButton>}
      />

      {/* Identity card */}
      <GlassCard variant="hero" className="p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl grid place-items-center text-[22px] font-semibold bg-gradient-to-br from-[oklch(0.88_0.13_200)] to-[oklch(0.65_0.20_290)] text-background ring-1 ring-white/20">
            {user.avatar}
          </div>
          <div className="flex-1">
            <div className="text-[18px] font-semibold tracking-tight">{user.name} Maxwell</div>
            <div className="text-[12px] text-muted-foreground">{user.goal}</div>
            <div className="mt-2 flex gap-1.5">
              <Pill tint="cyan"><Sparkles className="h-3 w-3" /> Pro</Pill>
              <Pill tint="amber"><Flame className="h-3 w-3" /> {user.streak}d</Pill>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label="Weight" value="184.2" unit="lb" />
          <Stat label="Streak" value={user.streak} unit="days" />
          <Stat label="Sessions" value={user.workoutsCompleted} />
        </div>
      </GlassCard>

      {/* Badges */}
      <SectionHeader title="Badges" />
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 mb-6">
        {badges.map((b) => (
          <div key={b.label} className="shrink-0 glass rounded-2xl px-4 py-3 flex items-center gap-2">
            <Award className="h-4 w-4 text-[oklch(0.92_0.13_85)]" />
            <span className="text-[12px] font-medium">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="space-y-2.5">
        {links.map((l) => (
          <GlassCard key={l.label} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl grid place-items-center bg-[oklch(0.82_0.16_215_/_0.14)] text-[oklch(0.92_0.12_205)]`}>
                <l.icon className="h-4 w-4" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-[13px] font-semibold">{l.label}</div>
                <div className="text-[11px] text-muted-foreground">{l.sub}</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <h2 className="text-[15px] font-semibold tracking-tight px-1">{title}</h2>;
}

function Stat({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 num text-[18px] font-semibold">{value}{unit && <span className="ml-1 text-[11px] text-muted-foreground">{unit}</span>}</div>
    </div>
  );
}
