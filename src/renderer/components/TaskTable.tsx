import type TaskDto from "../../types/taskDto";
import { durationAsString } from "../utilities/durationStringParser";
import ProgressBar from "./ProgressBar";
import TaskRow from "./TaskRow";
import Sortable from "./Sortable";
import Droppable from "./Droppable";
import useTasks from "../hooks/useTasks";
import TasksDonutChart from "./TasksDonutChart";

interface Props {
  tableHeader: string;
  tasks: TaskDto[];
  isTodayTable?: boolean;
  prompt?: string;
}

export default function TaskTable({
  tableHeader,
  tasks,
  isTodayTable = false,
  prompt,
}: Props) {
  const { toggleToday, toggleCompleted } = useTasks();

  const incompleteTasks = tasks.filter((t) => !t.isCompleted);
  const totalProgress = incompleteTasks.reduce(
    (sum, task) => sum + (task.estimate !== undefined ? task.progress || 0 : 0),
    0,
  );
  const totalEstimate = incompleteTasks.reduce(
    (sum, task) => sum + (task.estimate || 0),
    0,
  );

  return (
    <Droppable id={tableHeader}>
      <div className="w-full flex flex-col">
        {/* Table Header */}
        <div className="flex flex-row items-center justify-between mx-8 py-2 border-y border-primary mt-2">
          <h2 className="text-primary px-4">{tableHeader}</h2>
          <div className="flex flex-row items-center gap-4 text-primary">
            <ProgressBar progress={totalProgress} max={totalEstimate} />
            <p>{durationAsString(totalEstimate)}</p>
            <TasksDonutChart size={12} tasks={incompleteTasks} />
          </div>
        </div>
        {/* Table Rows */}
        {incompleteTasks.map((task, index) => (
          <Sortable
            key={task.id}
            id={task.id}
            index={index}
            group={tableHeader}
            data={task}
          >
            <TaskRow
              key={task.id}
              task={task}
              isTodayTable={isTodayTable}
              onTransferClick={toggleToday}
              onCompleteClick={toggleCompleted}
            />
          </Sortable>
        ))}
        {/* Prompt (if empty, and provided) */}
        {incompleteTasks.length == 0 && prompt && (
          <p className="w-full text-text/50 text-xl text-center p-4">
            No tasks yet. Start typing to add some!
          </p>
        )}
      </div>
    </Droppable>
  );
}
