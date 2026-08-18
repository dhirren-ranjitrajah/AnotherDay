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

    // TODO - integrate this into the fresh install
    const hasSortOrder = (
      db.prepare("PRAGMA table_info(tasks)").all() as { name: string }[]
    ).some((col) => col.name === "sortOrder");
    if (!hasSortOrder) {
      db.exec(
        "ALTER TABLE tasks ADD COLUMN sortOrder INTEGER NOT NULL DEFAULT 0",
      );
      db.exec("UPDATE tasks SET sortOrder = id");
    }
  }
  return db;
}
