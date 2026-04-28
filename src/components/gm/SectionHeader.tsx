import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  action?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ title, action, className }: Props) {
  return (
    <div className={cn("flex items-center justify-between px-1", className)}>
      <h2 className="text-[15px] font-semibold tracking-tight text-foreground/90">{title}</h2>
      {action}
    </div>
  );
}
