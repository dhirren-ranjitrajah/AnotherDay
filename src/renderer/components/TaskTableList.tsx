import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { useState } from "react";
import TaskRow from "./TaskRow";
import TaskTable from "./TaskTable";
import type TaskDto from "../../types/taskDto";
import useTasks from "../hooks/useTasks";
import { move } from "@dnd-kit/helpers";

type Group = "Today" | "Backlog";

interface TableConfig {
  tableHeader: Group;
  isTodayTable?: boolean;
  emptyPrompt?: string;
}

interface Props {
  tables: TableConfig[];
}

function groupItems(tasks: TaskDto[]): Record<Group, TaskDto[]> {
  return {
    Today: tasks.filter((t) => !t.isCompleted && t.isToday),
    Backlog: tasks.filter((t) => !t.isCompleted && !t.isToday),
  };
}

export default function TaskTableList({ tables }: Props) {
  const { tasks, isLoading, toggleToday, reorderTasks } = useTasks();

  const [items, setItems] = useState(() => groupItems(tasks));
  const [prevTasks, setPrevTasks] = useState(tasks);

  if (tasks !== prevTasks) {
    setPrevTasks(tasks);
    setItems(groupItems(tasks));
  }

  if (isLoading) return null;

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event) as Record<Group, TaskDto[]>);
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
        ]);
      }}
    >
      {tables.map((table) => (
        <TaskTable
          key={table.tableHeader}
          tableHeader={table.tableHeader}
          tasks={items[table.tableHeader]}
          isTodayTable={table.isTodayTable}
          prompt={table.emptyPrompt}
        />
      ))}
      <DragOverlay>
        {(source) => (
          <div className="outline outline-primary/50 rounded-lg">
            <TaskRow task={source.data as TaskDto} />
          </div>
        )}
      </DragOverlay>
    </DragDropProvider>
  );
}
