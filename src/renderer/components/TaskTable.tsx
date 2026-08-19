import type TaskDto from "../../types/taskDto";
import { durationAsString } from "../utilities/durationStringParser";
import ProgressBar from "./ProgressBar";
import TaskRow from "./TaskRow";
import Sortable from "./Sortable";
import Droppable from "./Droppable";
import useTasks from "../hooks/useTasks";
import TasksDonutChart from "./TasksDonutChart";
import { useState } from "react";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg?react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import { TaskTableHeaders } from "../types/taskTableHeaders";

interface Props {
  tableHeader: string;
  tasks: TaskDto[];
  prompt?: string;
}

export default function TaskTable({ tableHeader, tasks, prompt }: Props) {
  const { toggleToday, toggleCompleted } = useTasks();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isTodayTable = tableHeader === TaskTableHeaders[0];

  const totalProgress = tasks.reduce(
    (sum, task) => sum + (task.estimate !== undefined ? task.progress || 0 : 0),
    0,
  );
  const totalEstimate = tasks.reduce(
    (sum, task) => sum + (task.estimate || 0),
    0,
  );

  const iconClass = "h-6 w-6 text-primary";

  return (
    <Droppable id={tableHeader}>
      <div className="w-full flex flex-col">
        {/* Table Header */}
        <div
          onClick={() => setIsCollapsed((c) => !c)}
          className="group/header flex flex-row items-center justify-between mx-8 py-2 border-y border-primary mt-2"
        >
          <div className="flex flex-row items-center">
            <div className="opacity-0 group-hover/header:opacity-100 transition-opacity">
              {isCollapsed ? (
                <ChevronRightIcon className={iconClass} />
              ) : (
                <ChevronDownIcon className={iconClass} />
              )}
            </div>
            <h2 className="text-primary">{tableHeader}</h2>
          </div>
          <div className="flex flex-row items-center gap-4 text-primary">
            <ProgressBar progress={totalProgress} max={totalEstimate} />
            <p>{durationAsString(totalEstimate)}</p>
            <TasksDonutChart size={12} tasks={tasks} />
          </div>
        </div>
        {/* Table Rows */}
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isCollapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
        >
          <div className="overflow-hidden min-h-0">
            {tasks.map((task, index) => (
              <Sortable
                key={task.id}
                id={task.id}
                index={index}
                group={tableHeader}
                data={task}
              >
                <TaskRow
                  key={task.id}
                  task={task}
                  isTodayTable={isTodayTable}
                  onTransferClick={toggleToday}
                  onCompleteClick={toggleCompleted}
                />
              </Sortable>
            ))}
            {/* Prompt (if empty, and provided) */}
            {tasks.length == 0 && prompt && (
              <p className="w-full text-text/50 text-xl text-center p-4">
                {prompt}
              </p>
            )}
          </div>
        </div>
      </div>
    </Droppable>
  );
}
