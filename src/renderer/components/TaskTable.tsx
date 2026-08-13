import type TaskDto from "../../types/taskDto";
import ProgressBar from "./ProgressBar";
import TaskRow from "./TaskRow";

interface Props {
  tableHeader: string;
  tasks: TaskDto[];
  isTodayTable?: boolean;
  onTransferClick?: (taskId: number) => void;
  onCompleteClick?: (taskId: number) => void;
}

export default function TaskTable({
  tableHeader,
  tasks,
  isTodayTable = false,
  onTransferClick,
  onCompleteClick,
}: Props) {
  const totalProgress = tasks.reduce(
    (sum, task) => sum + (task.estimate !== undefined ? task.progress || 0 : 0),
    0,
  );
  const totalEstimate = tasks.reduce(
    (sum, task) => sum + (task.estimate || 0),
    0,
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row items-center justify-between mx-8 py-2 border-y border-primary mt-2">
        <h2 className="text-primary px-4">{tableHeader}</h2>
        <div className="flex flex-row items-center gap-4 text-primary pr-34">
          <ProgressBar progress={totalProgress} max={totalEstimate} />
          <p>{totalEstimate}m</p>
        </div>
      </div>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          isTodayTable={isTodayTable}
          onTransferClick={onTransferClick}
          onCompleteClick={onCompleteClick}
        />
      ))}
    </div>
  );
}
