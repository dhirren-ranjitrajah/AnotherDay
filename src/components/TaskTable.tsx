import type TaskData from "../types/TaskData";
import TaskRow from "./TaskRow";

interface Props {
  tableHeader: string;
  tasks: TaskData[];
  isTodayTable?: boolean;
}

export default function TaskTable({
  tableHeader,
  tasks,
  isTodayTable = false,
}: Props) {
  const totalEstimate = tasks.reduce(
    (sum, task) => sum + (task.estimate || 0),
    0,
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row items-center justify-between mx-8 py-2 border-y border-primary mt-2">
        <h2 className="text-primary px-4">{tableHeader}</h2>
        <p className="text-primary pr-34">
          Remaining Estimate: {totalEstimate}m
        </p>
      </div>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} isTodayTable={isTodayTable} />
      ))}
    </div>
  );
}
