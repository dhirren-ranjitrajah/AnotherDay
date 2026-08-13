import useTasks from "../hooks/useTasks";
import type { TaskInput } from "../../types/electron";
import Modal from "./Modal";
import StyledInput from "./StyledInput";
import { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
}

export default function AddTaskModal({ onClose }: Props) {
  const { addTask } = useTasks();
  const [taskInput, setTaskInput] = useState<TaskInput>({
    title: "",
    priority: "",
    category: "",
    estimate: undefined,
    progress: undefined,
    isToday: false,
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
    e.target.value
      .trim()
      .replaceAll(" ", "")
      .split(/(?<=[mhd])/)
      .forEach((part) => {
        const unit = part.slice(-1);
        const value = parseInt(part.slice(0, -1));
        if (isNaN(value)) return;
        switch (unit) {
          case "m":
            estimate += value;
            break;
          case "h":
            estimate += value * 60;
            break;
          case "d":
            estimate += value * 60 * 8; // 8h workday
            break;
          default:
            break;
        }
      });

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
