import * as React from "react";
import { FloatingTabBar } from "./FloatingTabBar";
import { cn } from "@/lib/utils";

export function AppShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-6 px-4 bg-stage">
      <PhoneFrame>
        <div className="absolute inset-0 overflow-y-auto bg-app">
          <StatusBar />
          <main className={cn("px-5 pt-2 pb-32", className)}>{children}</main>
        </div>
        <FloatingTabBar />
      </PhoneFrame>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: "min(420px, 92vw)",
        aspectRatio: "9 / 19.5",
        maxHeight: "calc(100vh - 48px)",
      }}
    >
      {/* Outer bezel */}
      <div
        className="absolute inset-0 rounded-[56px] p-[10px]"
        style={{
          background:
            "linear-gradient(160deg, #2a2c30 0%, #0a0b0d 40%, #1a1c1f 70%, #050608 100%)",
          boxShadow:
            "0 60px 120px -30px rgba(0,0,0,0.85), 0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Inner ring */}
        <div
          className="relative h-full w-full rounded-[48px] overflow-hidden"
          style={{
            background: "#000",
            boxShadow:
              "inset 0 0 0 2px #0a0a0a, inset 0 0 0 3px rgba(255,255,255,0.04)",
          }}
        >
          {children}
          {/* Dynamic Island */}
          <div
            className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 h-[30px] w-[110px] rounded-full bg-black z-50"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-[110px] h-[34px] w-[3px] rounded-l bg-[#1a1c1f]" />
      <span className="absolute -left-[3px] top-[170px] h-[58px] w-[3px] rounded-l bg-[#1a1c1f]" />
      <span className="absolute -left-[3px] top-[240px] h-[58px] w-[3px] rounded-l bg-[#1a1c1f]" />
      <span className="absolute -right-[3px] top-[200px] h-[90px] w-[3px] rounded-r bg-[#1a1c1f]" />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative h-[50px] flex items-end justify-between px-7 pb-2 text-[13px] font-semibold text-foreground/90 z-40 select-none">
      <span className="num">9:41</span>
      <span className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor" />
        </svg>
        {/* wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 10.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" fill="currentColor" />
          <path d="M3.2 6.6a6 6 0 018.6 0l-1.1 1.1a4.4 4.4 0 00-6.4 0L3.2 6.6z" fill="currentColor" />
          <path d="M0.6 4a9.6 9.6 0 0113.8 0l-1.1 1.1a8 8 0 00-11.6 0L0.6 4z" fill="currentColor" />
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
          <rect x="23.5" y="4" width="2" height="4" rx="0.8" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-balance">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}

export function GlassIconButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "h-10 w-10 grid place-items-center rounded-full glass hover:bg-white/[0.08] transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
