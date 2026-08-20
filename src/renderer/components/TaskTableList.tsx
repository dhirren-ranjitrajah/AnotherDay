import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { DragDropManager } from "@dnd-kit/dom";
import { useLayoutEffect, useMemo, useState } from "react";
import TaskRow from "./TaskRow";
import TaskTable from "./TaskTable";
import type TaskDto from "../../types/taskDto";
import useTasks from "../hooks/useTasks";
import { move } from "@dnd-kit/helpers";
import { type TaskTableHeadersType } from "../types/taskTableHeaders";
import useTaskModal from "../hooks/useTaskModal";

interface TableConfig {
  tableHeader: TaskTableHeadersType;
  emptyPrompt?: string;
}

interface Props {
  tables: TableConfig[];
}

function groupItems(tasks: TaskDto[]): Record<TaskTableHeadersType, TaskDto[]> {
  return {
    Today: tasks.filter((t) => !t.isCompleted && t.isToday),
    Backlog: tasks.filter((t) => !t.isCompleted && !t.isToday),
    Done: tasks.filter((t) => t.isCompleted),
  };
}

export default function TaskTableList({ tables }: Props) {
  const { tasks, isLoading, toggleToday, reorderTasks } = useTasks();
  const { isTaskModalOpen } = useTaskModal();
  const manager = useMemo(() => new DragDropManager(), []);

  const [items, setItems] = useState(() => groupItems(tasks));
  const [prevTasks, setPrevTasks] = useState(tasks);

  if (tasks !== prevTasks) {
    setPrevTasks(tasks);
    setItems(groupItems(tasks));
  }

  useLayoutEffect(() => {
    if (isTaskModalOpen) {
      manager.actions.stop({ canceled: true });
    }
  }, [isTaskModalOpen, manager]);

  if (isLoading) return null;

  return (
    <DragDropProvider
      manager={manager}
      onDragOver={(event) => {
        setItems(
          (items) =>
            move(items, event) as Record<TaskTableHeadersType, TaskDto[]>,
        );
      }}
      onDragEnd={(event) => {
        if (event.canceled) {
          setItems(groupItems(tasks));
          return;
        }

        const task = event.operation.source?.data as TaskDto | undefined;
        if (!task) return;

        const isNowToday = items.Today.some((t) => t.id === task.id);
        if (isNowToday !== task.isToday) {
          toggleToday(task.id);
        }

        reorderTasks([
          ...items.Today.map((t) => t.id),
          ...items.Backlog.map((t) => t.id),
          ...items.Done.map((t) => t.id),
        ]);
      }}
    >
      {tables.map((table) => (
        <TaskTable
          key={table.tableHeader}
          tableHeader={table.tableHeader}
          tasks={items[table.tableHeader]}
          prompt={table.emptyPrompt}
        />
      ))}
      {
        <DragOverlay>
          {(source) => (
            <div className="outline outline-primary/50 rounded-lg">
              <TaskRow task={source.data as TaskDto} />
            </div>
          )}
        </DragOverlay>
      }
    </DragDropProvider>
  );
}
