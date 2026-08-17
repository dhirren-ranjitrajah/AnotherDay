import type TaskDto from "../../types/taskDto";
import PriorityBadge from "./PriorityBadge";
import ProgressBar from "./ProgressBar";
import ChevronsDownIcon from "../../assets/icons/chevrons-down.svg?react";
import ChevronsUpIcon from "../../assets/icons/chevrons-up.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import { durationAsString } from "../utilities/durationStringParser";
import useTaskModal from "../hooks/useTaskModal";

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
  const { id, title, estimate, progress, priority } = task;
  return (
    <div
      onDoubleClick={() => editTask(task)}
      className="w-full group flex flex-row gap-4 items-center px-4 py-3 bg-background hover:bg-background-raised"
    >
      <PriorityBadge priority={priority} />
      <p className="flex-1 line-clamp-1 group-hover:line-clamp-none">{title}</p>
      {estimate !== undefined && estimate > 0 && (
        <div className="flex flex-row gap-4 px-8 items-center">
          <ProgressBar progress={progress || 0} max={estimate} />
          <p className="min-w-16 w-16 text-center truncate group-hover:w-auto">
            {durationAsString(estimate)}
          </p>
        </div>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex flex-row gap-2 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTransferClick?.(id);
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            onCompleteClick?.(id);
          }}
          className="flex items-center justify-center w-12 h-8 rounded-md bg-primary hover:bg-primary-hover transition-colors text-background-lowered"
        >
          <CheckIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
