import type { HexColor } from "../types/hexColor";

interface Props {
  progress: number;
  max: number;
  color?: HexColor;
}

export default function ProgressBar({ progress, max, color }: Props) {
  const percentage = Math.min(100, Math.max(0, (progress / max) * 100));

  return (
    <div
      style={{ "--color": color } as React.CSSProperties}
      className={`w-32 h-4 rounded-sm border ${color ? "border-[var(--color)]" : "border-primary"} overflow-hidden`}
    >
      <div
        className="h-full bg-primary"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
