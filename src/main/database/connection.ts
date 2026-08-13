import { DatabaseSync } from "node:sqlite";
import { app } from "electron";
import path from "node:path";

let db: DatabaseSync | null = null;

export default function getDb(): DatabaseSync {
  if (!db) {
    const dbPath = path.join(app.getPath("userData"), "tasks.db");
    db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        isCompleted INTEGER NOT NULL DEFAULT 0,
        estimate INTEGER,
        progress INTEGER,
        priority TEXT,
        category TEXT,
        isToday INTEGER NOT NULL DEFAULT 0
      )
    `);
  }
  return db;
}
