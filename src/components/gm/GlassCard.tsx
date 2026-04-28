import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "strong" | "hero";

export function GlassCard({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: Variant }) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        variant === "default" && "glass",
        variant === "strong" && "glass-strong",
        variant === "hero" && "glass-hero",
        className,
      )}
      {...props}
    />
  );
}
