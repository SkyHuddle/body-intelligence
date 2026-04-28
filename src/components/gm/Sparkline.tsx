import * as React from "react";

type Props = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  gradientId?: string;
};

export function Sparkline({
  data,
  width = 120,
  height = 40,
  stroke = "oklch(0.88 0.13 200)",
  fill = "oklch(0.82 0.16 215 / 0.25)",
  gradientId,
}: Props) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1 || 1);
  const points = data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${width},${height} L0,${height} Z`;
  const gid = gradientId ?? `spg-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} stroke={stroke} strokeWidth={1.75} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
