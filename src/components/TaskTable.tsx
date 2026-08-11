import type TaskData from "../types/TaskData";
import TaskRow from "./TaskRow";

export default function TaskTable({ tasks }: { tasks: TaskData[] }) {
  return (
    <div className="w-full flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          id={task.id}
          title={task.title}
          estimate={task.estimate}
          isCompleted={task.isCompleted}
          priority={task.priority}
          category={task.category}
        />
      ))}
    </div>
  );
}
