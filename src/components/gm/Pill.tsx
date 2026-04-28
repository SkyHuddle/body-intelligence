import * as React from "react";
import { cn } from "@/lib/utils";

export function Pill({
  className,
  children,
  tint = "default",
}: {
  className?: string;
  children: React.ReactNode;
  tint?: "default" | "cyan" | "mint" | "amber" | "violet" | "rose";
}) {
  const tints: Record<string, string> = {
    default: "bg-white/[0.06] text-foreground/80 border-white/10",
    cyan: "bg-[oklch(0.82_0.16_215_/_0.12)] text-[oklch(0.92_0.12_205)] border-[oklch(0.82_0.16_215_/_0.25)]",
    mint: "bg-[oklch(0.85_0.18_155_/_0.12)] text-[oklch(0.90_0.16_160)] border-[oklch(0.85_0.18_155_/_0.25)]",
    amber: "bg-[oklch(0.83_0.15_75_/_0.12)] text-[oklch(0.92_0.13_85)] border-[oklch(0.83_0.15_75_/_0.25)]",
    violet: "bg-[oklch(0.72_0.18_295_/_0.14)] text-[oklch(0.86_0.14_295)] border-[oklch(0.72_0.18_295_/_0.25)]",
    rose: "bg-[oklch(0.73_0.19_18_/_0.14)] text-[oklch(0.85_0.16_22)] border-[oklch(0.73_0.19_18_/_0.25)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-tight",
        tints[tint],
        className,
      )}
    >
      {children}
    </span>
  );
}
