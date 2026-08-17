import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddTaskModal from "./AddTaskModal";
import useTaskModal from "../hooks/useTaskModal";

export default function MainLayout() {
  const taskModal = useTaskModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        taskModal.addTask();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-full flex-row bg-background transition-none">
      <Navbar />
      <main className="flex-1 min-h-0 overflow-y-auto styled-scrollbar">
        <Outlet />
      </main>
      {taskModal.isTaskModalOpen && <AddTaskModal />}
    </div>
  );
}
