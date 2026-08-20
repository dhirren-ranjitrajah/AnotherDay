import { useCallback, useEffect } from "react";
import useTasks from "../hooks/useTasks";
import usePriorityStore from "../store/priorityStore";
import useTaskModal from "../hooks/useTaskModal";
import TaskCarousel from "../components/TaskCarousel";

export default function PrioritisationPage() {
  const { tasks, updateTask } = useTasks();
  const { isTaskModalOpen } = useTaskModal();
  const { priorities } = usePriorityStore();

  const priorityArray = Array.from(priorities.entries());

  const prioritizationQueue = tasks
    .filter((t) => !t.priority && !t.isCompleted)
    .sort((a, b) => a.id - b.id);

  const catalogCurrentTask = useCallback(
    (priorityIndex: number) => {
      if (prioritizationQueue.length === 0) return;
      const task = prioritizationQueue.at(0);
      updateTask(task!.id, {
        ...task,
        priority: priorityArray[priorityIndex][0],
      });
    },
    [prioritizationQueue, priorityArray, updateTask],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTaskModalOpen) return;

      if (/^[0-9]$/.test(e.key)) {
        const parsed = parseInt(e.key);
        if (!isNaN(parsed)) {
          const oneIndexed = (parsed - 1 + 10) % 10; // keypress is 1-indexed
          if (oneIndexed < priorityArray.length) {
            catalogCurrentTask(oneIndexed);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    tasks,
    isTaskModalOpen,
    priorityArray,
    prioritizationQueue,
    catalogCurrentTask,
  ]);

  return (
    <section className="bg-background">
      <div className="flex flex-col gap-4 px-4 py-8 items-center">
        <h1>
          {prioritizationQueue.length === 0
            ? "No tasks to prioritise"
            : "Prioritise the following tasks"}
        </h1>
        <TaskCarousel tasks={prioritizationQueue} />

        <div className="w-full h-full flex flex-row gap-4 justify-center">
          {priorityArray.map((v, idx) => (
            <div
              onClick={() => catalogCurrentTask(idx)}
              style={{ "--color-priority": v[1] } as React.CSSProperties}
              className="w-full h-32 flex items-center justify-center bg-[var(--color-priority)]/20 rounded-lg p-4"
            >
              <h2 className="text-[var(--color-priority)] text-center">
                {idx + (1 % 10)}: {v[0]}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
