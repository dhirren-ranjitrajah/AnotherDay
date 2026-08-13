import { useCallback, useEffect, useState, type ReactNode } from "react";
import type TaskData from "../types/TaskData";
import type { TaskInput } from "../types/electron";
import { TasksContext } from "./tasksContext";

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskData[]>([]);
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
      await window.electron.tasks.update(id, changes);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...changes } : task)),
      );
    },
    [],
  );

  const deleteTask = useCallback(async (id: number) => {
    await window.electron.tasks.delete(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
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
        toggleToday,
        toggleCompleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
