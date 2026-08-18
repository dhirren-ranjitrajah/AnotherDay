import { contextBridge, ipcRenderer } from "electron";
import type TaskDto from "../types/taskDto";
import type { TaskInput } from "../types/electron";

contextBridge.exposeInMainWorld("electron", {
  tasks: {
    getAll: (): Promise<TaskDto[]> => ipcRenderer.invoke("tasks:getAll"),
    create: (task: TaskInput): Promise<TaskDto> =>
      ipcRenderer.invoke("tasks:create", task),
    update: (id: number, changes: Partial<TaskInput>): Promise<void> =>
      ipcRenderer.invoke("tasks:update", id, changes),
    delete: (id: number): Promise<void> =>
      ipcRenderer.invoke("tasks:delete", id),
    reorder: (ids: number[]): Promise<void> =>
      ipcRenderer.invoke("tasks:reorder", ids),
  },
});
