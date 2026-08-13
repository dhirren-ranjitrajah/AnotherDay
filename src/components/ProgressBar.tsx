interface Props {
  progress: number;
  max: number;
}

export default function ProgressBar({ progress, max }: Props) {
  const percentage = (progress / max) * 100;

  return (
    <div className="w-32 h-4 rounded-sm border border-primary overflow-hidden">
      <div
        className="h-full bg-primary"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
