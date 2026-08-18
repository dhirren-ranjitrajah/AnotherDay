import type TaskDto from "../../types/taskDto";
import useTasks from "../hooks/useTasks";
import usePriorityStore from "../store/priorityStore";

interface Props {
  task: TaskDto;
}

export default function PriorityBadge({ task }: Props) {
  const priorities = usePriorityStore((s) => s.priorities);
  const priorityArray = Array.from(priorities.keys());
  const priority = task.priority;
  const idx = priorityArray.indexOf(priority ?? "");
  const nextPriority: string | undefined =
    idx === -1
      ? undefined
      : priorityArray[(idx - 1 + priorityArray.length) % priorityArray.length];
  const { updateTask } = useTasks();

  let color = "";

  if (priority && priorities.has(priority)) {
    color = priorities.get(priority) ?? "";
  }

  return (
    <div
      style={{ "--color-priority": color } as React.CSSProperties}
      onClick={() =>
        updateTask(task.id, {
          ...task,
          priority: nextPriority,
        })
      }
      className={`group/priority flex justify-center w-2 h-8 rounded-[2px] bg-[var(--color-priority)] transition-all hover:w-16 items-center`}
    >
      <p className="opacity-0 text-center group-hover/priority:delay-100 group-hover/priority:opacity-100 duration-200 text-background text-sm select-none">
        {priority?.toLowerCase()}
      </p>
    </div>
  );
}
