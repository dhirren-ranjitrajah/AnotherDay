import { useCallback, useEffect, useState, type ReactNode } from "react";
import type TaskDto from "../../types/taskDto";
import type { TaskInput } from "../../types/electron";
import { TasksContext } from "./tasksContext";

export default function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.electron.tasks.getAll().then((loaded) => {
      setTasks(loaded);
      setIsLoading(false);
    });
  }, []);

  const addTask = useCallback(async (task: TaskInput) => {
    const created = await window.electron.tasks.create(task);
    setTasks((prev) => [...prev, created]);
  }, []);

  const updateTask = useCallback(
    async (id: number, changes: Partial<TaskInput>) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...changes } : task)),
      );
      await window.electron.tasks.update(id, changes);
    },
    [],
  );

  const deleteTask = useCallback(async (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    await window.electron.tasks.delete(id);
  }, []);

  const reorderTasks = useCallback(async (ids: number[]) => {
    setTasks((prev) => {
      const order = new Map(ids.map((id, idx) => [id, idx]));
      return prev
        .map((t) =>
          order.has(t.id) ? { ...t, sortOrder: order.get(t.id)! } : t,
        )
        .sort((a, b) => a.sortOrder - b.sortOrder);
    });

    await window.electron.tasks.reorder(ids);
  }, []);

  const toggleToday = useCallback(
    (id: number) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return Promise.resolve();
      return updateTask(id, { isToday: !task.isToday });
    },
    [tasks, updateTask],
  );

  const toggleCompleted = useCallback(
    (id: number) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return Promise.resolve();
      return updateTask(id, { isCompleted: !task.isCompleted });
    },
    [tasks, updateTask],
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        reorderTasks,
        toggleToday,
        toggleCompleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
