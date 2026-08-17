import { useState, type ReactNode } from "react";
import { TaskModalContext } from "./taskModalContext";
import type TaskDto from "../../types/taskDto";

interface Props {
  children: ReactNode;
}

export default function TaskModalProvider({ children }: Props) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskDto | null>(null);

  const addTask = () => setIsTaskModalOpen(true);
  const editTask = (task: TaskDto) => {
    setCurrentTask(task);
    setIsTaskModalOpen(true);
  };
  const closeTaskModal = () => {
    setCurrentTask(null);
    setIsTaskModalOpen(false);
  };

  return (
    <TaskModalContext.Provider
      value={{
        addTask,
        editTask,
        closeTaskModal,
        isTaskModalOpen,
        currentTask,
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
}
