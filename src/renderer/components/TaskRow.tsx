import type TaskDto from "../../types/taskDto";
import PriorityBadge from "./PriorityBadge";
import ProgressBar from "./ProgressBar";
import ChevronsDownIcon from "../../assets/icons/chevrons-down.svg?react";
import ChevronsUpIcon from "../../assets/icons/chevrons-up.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import { durationAsString } from "../utilities/durationStringParser";
import useTaskModal from "../hooks/useTaskModal";
import useCategoryStore from "../store/categoryStore";
import { type HexColor } from "../types/hexColor";

interface Props {
  task: TaskDto;
  onTransferClick?: (taskId: number) => void;
  onCompleteClick?: (taskId: number) => void;
  isTodayTable?: boolean;
}

export default function TaskRow({
  task,
  onTransferClick,
  onCompleteClick,
  isTodayTable = false,
}: Props) {
  const { editTask } = useTaskModal();
  const categories = useCategoryStore((s) => s.categories);

  const { id, title, estimate, progress, category } = task;

  let categoryColor: HexColor | undefined = undefined;
  if (category && categories.has(category)) {
    categoryColor = categories.get(category);
  }

  return (
    <div
      onDoubleClick={() => editTask(task)}
      style={{ "--color-category": categoryColor } as React.CSSProperties}
      className="w-full group flex flex-row gap-4 items-center px-4 py-3 bg-background hover:bg-background-raised"
    >
      <div onDoubleClick={(e) => e.stopPropagation()}>
        <PriorityBadge task={task} />
      </div>
      <p
        className={`flex-1 line-clamp-1 ${categoryColor ? "text-[var(--color-category)]" : ""} group-hover:line-clamp-none break-all select-none`}
      >
        {title}
      </p>
      {estimate !== undefined && estimate > 0 && (
        <div className="flex flex-row gap-4 px-8 items-center">
          <ProgressBar
            progress={progress || 0}
            max={estimate}
            color={categoryColor}
          />
          <p className="min-w-16 w-16 text-center truncate group-hover:w-auto">
            {durationAsString(estimate)}
          </p>
        </div>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex flex-row gap-2 transition-opacity">
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onTransferClick?.(id);
          }}
          onDoubleClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center w-12 h-8 rounded-md outline outline-1 outline-primary text-primary hover:outline-primary-hover hover:text-primary-hover transition-colors"
        >
          {isTodayTable ? (
            <ChevronsDownIcon className="w-8 h-8" />
          ) : (
            <ChevronsUpIcon className="w-8 h-8" />
          )}
        </button>
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onCompleteClick?.(id);
          }}
          onDoubleClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center w-12 h-8 rounded-md bg-primary hover:bg-primary-hover transition-colors text-background-lowered"
        >
          <CheckIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
