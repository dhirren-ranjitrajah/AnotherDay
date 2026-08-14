import { useContext } from "react";
import { TaskModalContext } from "../context/taskModalContext";

export default function useTaskModal() {
  const ctx = useContext(TaskModalContext);
  if (!ctx) throw new Error("useTasks must be used within a TaskModalContext");
  return ctx;
}
