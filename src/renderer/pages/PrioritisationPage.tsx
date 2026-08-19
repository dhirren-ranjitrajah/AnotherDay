import { useEffect } from "react";
import useTasks from "../hooks/useTasks";
import type TaskDto from "../../types/taskDto";
import usePriorityStore from "../store/priorityStore";
import useCategoryStore from "../store/categoryStore";

export default function PrioritisationPage() {
  const { tasks, updateTask } = useTasks();
  const { priorities } = usePriorityStore();
  const { categories } = useCategoryStore();

  const priorityArray = Array.from(priorities.entries());

  const prioritizationQueue = tasks
    .filter((t) => !t.priority && !t.isCompleted)
    .sort((a, b) => a.id - b.id);

  const getCategoryColor = (t?: TaskDto) => {
    return t && t.category ? categories.get(t.category) : undefined;
  };

  const getFontSize = (idx: number) => {
    return 32 - 8 * idx;
  };

  const getTranslationY = (idx: number) => {
    let y = 0;
    for (let i: number = 0; i < idx; i++) {
      y += getFontSize(i) + 8;
    }
    return y;
  };

  const catalogCurrentTask = (priorityIndex: number) => {
    if (prioritizationQueue.length === 0) return;
    const task = prioritizationQueue.at(0);
    updateTask(task!.id, {
      ...task,
      priority: priorityArray[priorityIndex][0],
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        const parsed = parseInt(e.key);
        if (!isNaN(parsed)) {
          const oneIndexed = (parsed - 1 + 10) % 10; // assume keypress was 1-indexed
          if (oneIndexed < priorityArray.length) {
            catalogCurrentTask(oneIndexed);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tasks, priorityArray, prioritizationQueue, catalogCurrentTask]);

  return (
    <section className="bg-background">
      <div className="flex flex-col gap-4 px-4 py-8 items-center">
        <h1>
          {prioritizationQueue.length === 0
            ? "No tasks to prioritise"
            : "Prioritise the following tasks"}
        </h1>
        <div style={{ height: getTranslationY(4) }} className="relative w-full">
          {prioritizationQueue.slice(0, 4).map((v, idx) => (
            <div
              key={v.id}
              style={{
                transform: `translateY(-${getTranslationY(idx)}px)`,
                opacity: 1 - 0.25 * idx,
              }}
              className="absolute inset-x-0 bottom-0 transition-all duration-300 ease-in-out"
            >
              <p
                style={
                  {
                    "--color-category": getCategoryColor(v),
                    fontSize: getFontSize(idx),
                  } as React.CSSProperties
                }
                className={`text-center text-[var(--color-category)] ${idx === 0 ? "" : "truncate"}`}
              >
                {v.title}
              </p>
            </div>
          ))}
        </div>
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
