import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Home, Dumbbell, Apple, HeartPulse, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/train", label: "Train", icon: Dumbbell },
  { to: "/eat", label: "Eat", icon: Apple },
  { to: "/health", label: "Health", icon: HeartPulse },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function FloatingTabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-5 px-4">
      <div
        className="pointer-events-auto glass-strong rounded-full px-2 py-2 flex items-center gap-1"
        style={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset" }}
      >
        {tabs.map((t) => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-3.5 py-2 transition-all",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-white/[0.04] border border-white/10"
                  style={{ boxShadow: "0 0 24px -6px oklch(0.82 0.16 215 / 0.55)" }}
                />
              )}
              <Icon className={cn("relative h-[18px] w-[18px]", active && "text-[oklch(0.92_0.12_205)]")} strokeWidth={2.2} />
              {active && <span className="relative text-[12px] font-medium">{t.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
