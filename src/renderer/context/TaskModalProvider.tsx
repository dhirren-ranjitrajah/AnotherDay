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
  const closeTaskModal = () => setIsTaskModalOpen(false);
  const editTask = (task: TaskDto) => {
    setIsTaskModalOpen(true);
    setCurrentTask(task);
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
