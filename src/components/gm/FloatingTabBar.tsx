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
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center pb-4 px-4">
      <div
        className="pointer-events-auto rounded-full px-1.5 py-1.5 flex items-center gap-0.5"
        style={{
          background: "linear-gradient(180deg, oklch(1 0 0 / 0.07), oklch(1 0 0 / 0.03))",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          border: "1px solid oklch(1 0 0 / 0.10)",
          boxShadow: "0 24px 60px -24px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05) inset",
        }}
      >
        {tabs.map((t) => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, oklch(1 0 0 / 0.10), oklch(1 0 0 / 0.04))",
                    border: "1px solid oklch(1 0 0 / 0.10)",
                  }}
                />
              )}
              <Icon className={cn("relative h-[17px] w-[17px]", active && "text-[oklch(0.90_0.12_200)]")} strokeWidth={2.2} />
              {active && <span className="relative text-[11.5px] font-medium tracking-tight">{t.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
