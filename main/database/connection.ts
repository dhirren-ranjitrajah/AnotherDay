import { DatabaseSync } from "node:sqlite";
import { app } from "electron";
import path from "node:path";
import type TaskDto from "../../src/types/TaskDto";

export type TaskInput = Omit<TaskDto, "id">;

let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
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

interface TaskRow {
  id: number;
  title: string;
  isCompleted: number;
  estimate: number | null;
  progress: number | null;
  priority: string | null;
  category: string | null;
  isToday: number;
}

function rowToTask(row: TaskRow): TaskDto {
  return {
    id: row.id,
    title: row.title,
    isCompleted: !!row.isCompleted,
    estimate: row.estimate ?? undefined,
    progress: row.progress ?? undefined,
    priority: row.priority ?? undefined,
    category: row.category ?? undefined,
    isToday: !!row.isToday,
  };
}

export function getAllTasks(): TaskDto[] {
  const rows = getDb()
    .prepare("SELECT * FROM tasks ORDER BY id ASC")
    .all() as unknown as TaskRow[];
  return rows.map(rowToTask);
}

export function createTask(input: TaskInput): TaskDto {
  const result = getDb()
    .prepare(
      `INSERT INTO tasks (title, isCompleted, estimate, progress, priority, category, isToday)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.title,
      input.isCompleted ? 1 : 0,
      input.estimate ?? null,
      input.progress ?? null,
      input.priority ?? null,
      input.category ?? null,
      input.isToday ? 1 : 0,
    );
  return { id: Number(result.lastInsertRowid), ...input };
}

export function updateTask(id: number, changes: Partial<TaskInput>): void {
  const fields = Object.keys(changes) as (keyof TaskInput)[];
  if (fields.length === 0) return;

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const values: (string | number | null)[] = fields.map((field) => {
    const value = changes[field];
    if (field === "isCompleted" || field === "isToday") return value ? 1 : 0;
    return (value as string | number | undefined) ?? null;
  });

  getDb()
    .prepare(`UPDATE tasks SET ${setClause} WHERE id = ?`)
    .run(...values, id);
}

export function deleteTask(id: number): void {
  getDb().prepare("DELETE FROM tasks WHERE id = ?").run(id);
}
