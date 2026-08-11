import type TaskData from "../types/TaskData";
import PriorityBadge from "./PriorityBadge";

export default function TaskRow({
  title,
  estimate,
  priority,
  category,
}: TaskData) {
  return (
    <div className="w-full flex flex-row gap-4 px-4 py-2 bg-surface-dark items-center">
      <PriorityBadge priority={priority} />
      <p className="flex-1">{title}</p>
      {estimate !== undefined && estimate > 0 && (
        <div className="flex flex-row gap-2 px-8">
          {/* TODO - add time tracking functionality */}
          <p>{estimate}m</p>
        </div>
      )}
      <button type="button" className="px-4 py-1 rounded-md">
        \/
      </button>
      <button type="button" className="px-4 py-1 rounded-md">
        /
      </button>
    </div>
  );
}
