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
  trackOpacity = 0.07,
  gradientId,
  children,
  from = "oklch(0.92 0.12 200)",
  to = "oklch(0.78 0.16 235)",
}: Props) {
  const id = React.useId();
  const gid = gradientId ?? `ring-${id.replace(/:/g, "")}`;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 block">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
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
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">{children}</div>
    </div>
  );
}
