import React from "react";
import type { HexColor } from "../types/hexColor";

export interface PieChartElementData {
  label: string;
  value: number;
  color?: HexColor;
}

interface Props {
  size: number;
  elements: PieChartElementData[];
}

const Circumference = 100;
const Radius = Circumference / (2 * Math.PI);
const StrokeWidth = 5;

export default function DonutChart({ size, elements }: Props) {
  const totalValue = elements.reduce((v, e) => v + e.value, 0);
  const percentages = new Map(
    elements.map((e) => [e, totalValue ? (e.value / totalValue) * 100 : 0]),
  );

  const cumulativePercentages = new Map<PieChartElementData, number>();
  elements.reduce((cumulative, e) => {
    cumulativePercentages.set(e, cumulative);
    return cumulative + (percentages.get(e) ?? 0);
  }, 0);

  const segments = elements.map((e) => {
    const percent = percentages.get(e) ?? 0;
    const cumulative = cumulativePercentages.get(e) ?? 0;
    const dasharray = `${(percent / 100) * Circumference} ${Circumference}`;
    const dashoffset = -((cumulative / 100) * Circumference);

    return (
      <circle
        key={`${e.label}`}
        cx="21"
        cy="21"
        r={Radius}
        fill="none"
        stroke={e.color ?? "var(--color-primary)"}
        strokeWidth={StrokeWidth}
        strokeDasharray={dasharray}
        strokeDashoffset={dashoffset}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 42 42"
      style={{ "--size": `${size / 4}rem` } as React.CSSProperties}
      className="h-[var(--size)] w-[var(--size)] -rotate-90 animate-spin [animation-duration:10s]"
    >
      {segments}
    </svg>
  );
}
