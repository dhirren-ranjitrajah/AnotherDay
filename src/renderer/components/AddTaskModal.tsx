import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import type { TaskInput } from "../../types/electron";
import Modal from "./Modal";
import StyledInput from "./StyledInput";
import {
  durationAsString,
  parseDuration,
} from "../utilities/durationStringParser";
import useTaskModal from "../hooks/useTaskModal";
import useCategoryStore from "../store/categoryStore";
import usePriorityStore from "../store/priorityStore";
import DropdownSearchBar from "./DropdownSearchBar";

export default function AddTaskModal() {
  const { addTask, updateTask } = useTasks();
  const priorities = usePriorityStore((state) => state.priorities);
  const categories = useCategoryStore((state) => state.categories);
  const taskModal = useTaskModal();
  const location = useLocation();

  const shouldAddToToday = location.pathname === "/";

  const [taskInput, setTaskInput] = useState<TaskInput>(
    taskModal.currentTask ?? {
      title: "",
      estimate: undefined,
      priority: undefined,
      category: undefined,
      progress: undefined,
      isToday: shouldAddToToday,
      isCompleted: false,
    },
  );

  const [estimateStr, setEstimateStr] = useState<string>(
    taskModal.currentTask
      ? durationAsString(taskModal.currentTask.estimate ?? 0)
      : "",
  );
  const [taskErr, setTaskErr] = useState("");
  const [estimateErr, setEstimateErr] = useState("");
  const [categoryErr, setCategoryErr] = useState("");
  const [priorityErr, setPriorityErr] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput({ ...taskInput, title: e.target.value });
  };

  const handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimateStr(e.target.value);
    const estimate: number = parseDuration(e.target.value);
    setTaskInput({
      ...taskInput,
      estimate: isNaN(estimate) ? undefined : estimate,
    });
  };

  const handleCategoryChange = (category: string) => {
    setTaskInput({ ...taskInput, category });
  };

  const handlePriorityChange = (priority: string) => {
    setTaskInput({ ...taskInput, priority });
  };

  useEffect(() => {
    const handleSubmit = () => {
      setTaskErr("");
      setEstimateErr("");
      setCategoryErr("");
      setPriorityErr("");
      let err = false;

      if (taskInput.title === "") {
        setTaskErr("task requires a description");
        err = true;
      }

      if (taskInput.estimate === undefined && estimateStr !== "") {
        setEstimateErr("e.g. 2d 3h 15m");
        err = true;
      }

      if (taskInput.category && !categories.has(taskInput.category)) {
        setCategoryErr("no matching category");
        err = true;
      }

      if (taskInput.priority && !priorities.has(taskInput.priority)) {
        setPriorityErr("no matching priority");
        err = true;
      }

      if (!err) {
        if (taskModal.currentTask) {
          updateTask(taskModal.currentTask.id, taskInput);
        } else {
          addTask(taskInput);
        }
        taskModal.closeTaskModal();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        taskModal.closeTaskModal();
      } else if (e.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    taskInput,
    taskModal,
    categories,
    estimateStr,
    priorities,
    addTask,
    updateTask,
  ]);

  return (
    <Modal onClose={taskModal.closeTaskModal}>
      <div className="flex flex-col w-full gap-16 items-center justify-center">
        <h1>
          {taskModal.currentTask ? "Edit task in" : "Add to"}
          <span className="text-primary">
            {shouldAddToToday ? " today" : " backlog"}
          </span>
        </h1>
        <div className="flex flex-row w-full gap-8 px-32">
          <StyledInput
            label="Task"
            value={taskInput.title}
            error={taskErr}
            onChange={handleTitleChange}
            autoFocus={true}
          />
          <div className="w-32">
            <StyledInput
              label="Estimate"
              value={estimateStr}
              error={estimateErr}
              onChange={handleEstimateChange}
            />
          </div>
        </div>
        <div
          className={`flex flex-row w-full gap-8 px-32 transition-opacity ${taskInput.category || taskInput.priority ? "opacity-100" : "opacity-0 pointer-events-none"} focus-within:opacity-100`}
        >
          <DropdownSearchBar
            value={taskInput.category ?? ""}
            items={Array.from(categories.keys())}
            onChange={(s) => handleCategoryChange(s)}
            label="Category"
            error={categoryErr}
          />
          <DropdownSearchBar
            value={taskInput.priority ?? ""}
            items={Array.from(priorities.keys())}
            onChange={(s) => handlePriorityChange(s)}
            label="Priority"
            error={priorityErr}
          />
        </div>
      </div>
    </Modal>
  );
}
