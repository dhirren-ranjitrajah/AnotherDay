import type TaskDto from "./taskDto";

export type TaskInput = Omit<Omit<TaskDto, "id">, "sortOrder">;

declare global {
  interface Window {
    electron: {
      tasks: {
        getAll: () => Promise<TaskDto[]>;
        create: (task: TaskInput) => Promise<TaskDto>;
        update: (id: number, changes: Partial<TaskInput>) => Promise<void>;
        delete: (id: number) => Promise<void>;
        reorder: (ids: number[]) => Promise<void>;
      };
    };
  }
}
