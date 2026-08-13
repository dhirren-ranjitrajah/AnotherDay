import { contextBridge, ipcRenderer } from "electron";
import type TaskData from "../renderer/types/TaskData";
import type { TaskInput } from "../main/database/connection";

contextBridge.exposeInMainWorld("electron", {
  tasks: {
    getAll: (): Promise<TaskData[]> => ipcRenderer.invoke("tasks:getAll"),
    create: (task: TaskInput): Promise<TaskData> =>
      ipcRenderer.invoke("tasks:create", task),
    update: (id: number, changes: Partial<TaskInput>): Promise<void> =>
      ipcRenderer.invoke("tasks:update", id, changes),
    delete: (id: number): Promise<void> =>
      ipcRenderer.invoke("tasks:delete", id),
  },
});
