import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import type { TaskInput } from "../../types/electron";
import Modal from "./Modal";
import StyledInput from "./StyledInput";
import { parseDuration } from "../utilities/durationStringParser";

interface Props {
  onClose: () => void;
}

export default function AddTaskModal({ onClose }: Props) {
  const location = useLocation();
  const { addTask } = useTasks();
  const [taskInput, setTaskInput] = useState<TaskInput>({
    title: "",
    priority: "",
    category: "",
    estimate: undefined,
    progress: undefined,
    isToday: location.pathname === "/",
    isCompleted: false,
  });

  const [estimateStr, setEstimateStr] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput({ ...taskInput, title: e.target.value });
  };

  const handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimateStr(e.target.value);
    /** Parsing */
    let estimate = 0;

    // m, h, d
    estimate = parseDuration(e.target.value);
    setTaskInput({
      ...taskInput,
      estimate: isNaN(estimate) ? undefined : estimate,
    });
  };

  const handleSubmit = () => {
    // validate

    addTask(taskInput);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [taskInput]);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-row gap-4 px-32">
        <StyledInput
          label="Title"
          value={taskInput.title}
          onChange={handleTitleChange}
          autoFocus={true}
        />
        <StyledInput
          label="Estimate"
          value={estimateStr}
          onChange={handleEstimateChange}
        />
      </div>
    </Modal>
  );
}
