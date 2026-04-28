import * as React from "react";

type Props = {
  value: number; // 0-100
  size?: number;
  stroke?: number;
  trackOpacity?: number;
  gradientId?: string;
  children?: React.ReactNode;
  from?: string;
  to?: string;
};

export function ProgressRing({
  value,
  size = 200,
  stroke = 14,
  trackOpacity = 0.08,
  gradientId = "ringGrad",
  children,
  from = "oklch(0.92 0.13 195)",
  to = "oklch(0.72 0.18 285)",
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="white"
          strokeOpacity={trackOpacity}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          fill="none"
          style={{ filter: "drop-shadow(0 0 12px oklch(0.82 0.16 215 / 0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">{children}</div>
    </div>
  );
}
