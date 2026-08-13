import { createContext } from "react";
import type TaskDto from "../../types/taskDto";
import type { TaskInput } from "../../types/electron";

export interface TasksContextValue {
  tasks: TaskDto[];
  isLoading: boolean;
  addTask: (task: TaskInput) => Promise<void>;
  updateTask: (id: number, changes: Partial<TaskInput>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleToday: (id: number) => Promise<void>;
  toggleCompleted: (id: number) => Promise<void>;
}

export const TasksContext = createContext<TasksContextValue | null>(null);
