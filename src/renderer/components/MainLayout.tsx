import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import AddTaskModal from "./AddTaskModal";

export default function MainLayout() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  window.addEventListener("keydown", (e) => {
    if (/^[a-zA-Z0-9]$/.test(e.key)) {
      setIsTaskModalOpen(true);
    }
  });

  return (
    <div className="flex h-screen w-full flex-row bg-background transition-none">
      <Navbar />
      <main className="flex-1 min-h-0 overflow-y-auto styled-scrollbar">
        <Outlet />
      </main>
      {isTaskModalOpen && (
        <AddTaskModal onClose={() => setIsTaskModalOpen(false)} />
      )}
    </div>
  );
}
