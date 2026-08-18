import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import AddTaskModal from "./AddTaskModal";
import useTaskModal from "../hooks/useTaskModal";
import useNavigationHelper from "../hooks/useNavigationHelper";

export default function MainLayout() {
  const { addTask, isTaskModalOpen } = useTaskModal();
  const { navigateHome, navigateNext, navigatePrev } = useNavigationHelper();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        addTask();
      }
      if (!isTaskModalOpen) {
        if (e.key === " ") {
          navigateHome();
        } else if (e.key === "Tab") {
          if (!e.shiftKey) {
            navigateNext();
          } else {
            navigatePrev();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addTask, isTaskModalOpen, navigateHome, navigateNext, navigatePrev]);

  return (
    <div className="flex h-screen w-full flex-row bg-background transition-none">
      <Navbar />
      <main className="flex-1 min-h-0 overflow-y-auto styled-scrollbar">
        <Outlet />
      </main>
      {isTaskModalOpen && <AddTaskModal />}
    </div>
  );
}
