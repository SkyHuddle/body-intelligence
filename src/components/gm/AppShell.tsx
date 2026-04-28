import * as React from "react";
import { FloatingTabBar } from "./FloatingTabBar";
import { cn } from "@/lib/utils";

export function AppShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-app">
      <div className="mx-auto w-full max-w-[440px] min-h-screen relative">
        <main className={cn("px-5 pt-6 pb-32", className)}>{children}</main>
        <FloatingTabBar />
      </div>
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
