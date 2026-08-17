import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import type { TaskInput } from "../../types/electron";
import Modal from "./Modal";
import StyledInput from "./StyledInput";
import { parseDuration } from "../utilities/durationStringParser";
import useTaskModal from "../hooks/useTaskModal";

interface Props {
  taskId?: number;
}

export default function AddTaskModal({ taskId = undefined }: Props) {
  const taskModal = useTaskModal();
  const location = useLocation();
  const { addTask } = useTasks();

  const shouldAddToToday = location.pathname === "/";
  const [taskInput, setTaskInput] = useState<TaskInput>({
    title: "",
    estimate: undefined,
    priority: undefined,
    category: undefined,
    progress: undefined,
    isToday: shouldAddToToday,
    isCompleted: false,
  });

  const [estimateStr, setEstimateStr] = useState("");
  const [taskErr, setTaskErr] = useState("");
  const [estimateErr, setEstimateErr] = useState("");

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
    setTaskErr("");
    setEstimateErr("");
    let err = false;

    if (taskInput.title === "") {
      setTaskErr("Task requires a description");
      err = true;
    }

    if (taskInput.estimate === undefined && estimateStr !== "") {
      setEstimateErr("e.g. 2d 3h 15m");
      err = true;
    }

    if (!err) {
      addTask(taskInput);
      taskModal.closeTaskModal();
    }
  };

  useEffect(() => {
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
  }, [taskInput]);

  return (
    <Modal onClose={taskModal.closeTaskModal}>
      <div className="flex flex-col w-full gap-4 items-center justify-center">
        <h1>
          Add to
          <span className="text-primary">
            {shouldAddToToday ? " today" : " backlog"}
          </span>
        </h1>
        <h1 className="text-primary"></h1>
        <div className="flex flex-row w-full gap-4 px-32">
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
      </div>
    </Modal>
  );
}
