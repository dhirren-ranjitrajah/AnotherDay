import { contextBridge, ipcRenderer } from "electron";
import type TaskDto from "../types/TaskDto";
import type { TaskInput } from "../main/database/api/TaskApi";

contextBridge.exposeInMainWorld("electron", {
  tasks: {
    getAll: (): Promise<TaskDto[]> => ipcRenderer.invoke("tasks:getAll"),
    create: (task: TaskInput): Promise<TaskDto> =>
      ipcRenderer.invoke("tasks:create", task),
    update: (id: number, changes: Partial<TaskInput>): Promise<void> =>
      ipcRenderer.invoke("tasks:update", id, changes),
    delete: (id: number): Promise<void> =>
      ipcRenderer.invoke("tasks:delete", id),
  },
});
