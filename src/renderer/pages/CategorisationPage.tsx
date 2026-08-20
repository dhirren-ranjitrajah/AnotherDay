import { useEffect } from "react";
import useTasks from "../hooks/useTasks";
import TaskCarousel from "../components/TaskCarousel";
import useCategoryStore from "../store/categoryStore";
import useTaskModal from "../hooks/useTaskModal";

export default function CategorisationPage() {
  const { tasks, updateTask } = useTasks();
  const { isTaskModalOpen } = useTaskModal();
  const { categories } = useCategoryStore();

  const categoryArray = Array.from(categories.entries());

  const categorisationQueue = tasks
    .filter((t) => !t.category && !t.isCompleted)
    .sort((a, b) => a.id - b.id);

  const catalogCurrentTask = (categorisationIdx: number) => {
    if (categorisationQueue.length === 0) return;
    const task = categorisationQueue.at(0);
    updateTask(task!.id, {
      ...task,
      category: categoryArray[categorisationIdx][0],
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTaskModalOpen) return;

      if (/^[0-9]$/.test(e.key)) {
        const parsed = parseInt(e.key);
        if (!isNaN(parsed)) {
          const oneIndexed = (parsed - 1 + 10) % 10; // keypress is 1-indexed
          if (oneIndexed < categoryArray.length) {
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
    categoryArray,
    categorisationQueue,
    catalogCurrentTask,
  ]);

  return (
    <section className="bg-background">
      <div className="flex flex-col gap-4 px-4 py-8 items-center">
        <h1>
          {categorisationQueue.length === 0
            ? "No tasks to categorise"
            : "categorise the following tasks"}
        </h1>
        <TaskCarousel tasks={categorisationQueue} />
        <div className="w-full h-full flex flex-row gap-4 justify-center">
          {categoryArray.map((v, idx) => (
            <div
              onClick={() => catalogCurrentTask(idx)}
              style={{ "--color-categorise": v[1] } as React.CSSProperties}
              className="w-full h-32 flex items-center justify-center bg-[var(--color-categorise)]/20 rounded-lg p-4"
            >
              <h2 className="text-[var(--color-categorise)] text-center">
                {idx + (1 % 10)}: {v[0]}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
