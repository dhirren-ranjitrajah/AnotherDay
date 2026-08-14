import { createContext } from "react";
import type TaskDto from "../../types/taskDto";

export interface TaskModalContextValue {
  addTask: () => void;
  editTask: (task: TaskDto) => void;
  isTaskModalOpen: boolean;
  closeTaskModal: () => void;
  currentTask: TaskDto | null;
}

export const TaskModalContext = createContext<TaskModalContextValue | null>(
  null,
);
