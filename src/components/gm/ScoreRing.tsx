import * as React from "react";

type Segment = { value: number; weight: number; color: string };

type Props = {
  segments: Segment[];
  size?: number;
  stroke?: number;
  gap?: number; // degrees gap between segments
  children?: React.ReactNode;
};

/**
 * Multi-segment ring (Apple Activity style) — each segment fills proportionally
 * to its weight, and is shaded by its individual completion percentage.
 */
export function ScoreRing({ segments, size = 180, stroke = 14, gap = 4, children }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const totalWeight = segments.reduce((s, x) => s + x.weight, 0) || 1;
  const gapLen = (gap / 360) * c;

  let offset = 0;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 block">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="white"
          strokeOpacity={0.06}
          strokeWidth={stroke}
          fill="none"
        />
        {segments.map((seg, i) => {
          const segLen = (seg.weight / totalWeight) * c;
          const visible = Math.max(0, segLen - gapLen);
          const filled = (Math.max(0, Math.min(100, seg.value)) / 100) * visible;
          const dasharray = `${filled} ${c}`;
          const dashoffset = -offset;
          offset += segLen;
          return (
            <g key={i}>
              {/* faint segment track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={seg.color}
                strokeOpacity={0.18}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${visible} ${c}`}
                strokeDashoffset={dashoffset}
                fill="none"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={seg.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={dasharray}
                strokeDashoffset={dashoffset}
                fill="none"
              />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">{children}</div>
    </div>
  );
}
