import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "./database/api/taskApi";

import type { TaskInput } from "../types/electron";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Populated by vite-plugin-electron during dev; undefined in a packaged build.
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    icon: path.join(__dirname, "../src/assets/icons/favicon.png"),
    backgroundColor: "#111111",
  });

  win.removeMenu();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

function registerTaskHandlers() {
  ipcMain.handle("tasks:getAll", () => getAllTasks());
  ipcMain.handle("tasks:create", (_event, input: TaskInput) =>
    createTask(input),
  );
  ipcMain.handle(
    "tasks:update",
    (_event, id: number, changes: Partial<TaskInput>) =>
      updateTask(id, changes),
  );
  ipcMain.handle("tasks:delete", (_event, id: number) => deleteTask(id));
  ipcMain.handle("tasks:reoder", (_event, ids: number[]) => reorderTasks(ids));
}

app.whenReady().then(() => {
  registerTaskHandlers();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
