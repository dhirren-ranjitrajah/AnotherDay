import type TaskData from "./TaskData";

export type TaskInput = Omit<TaskData, "id">;

declare global {
  interface Window {
    electron: {
      tasks: {
        getAll: () => Promise<TaskData[]>;
        create: (task: TaskInput) => Promise<TaskData>;
        update: (id: number, changes: Partial<TaskInput>) => Promise<void>;
        delete: (id: number) => Promise<void>;
      };
    };
  }
}
