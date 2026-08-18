import getDb from "../connection";
import type TaskDto from "../../../types/taskDto";
import type Task from "../model/Task";
import type { TaskInput } from "../../../types/electron";

function toDto(task: Task): TaskDto {
  return {
    id: task.id,
    title: task.title,
    isCompleted: !!task.isCompleted,
    estimate: task.estimate ?? undefined,
    progress: task.progress ?? undefined,
    priority: task.priority ?? undefined,
    category: task.category ?? undefined,
    isToday: !!task.isToday,
    sortOrder: task.sortOrder,
  };
}

export function getAllTasks(): TaskDto[] {
  const rows = getDb()
    .prepare("SELECT * FROM tasks ORDER BY sortOrder DESC")
    .all() as unknown as Task[];
  return rows.map(toDto);
}

export function createTask(input: TaskInput): TaskDto {
  const db = getDb();

  const { maxSortOrder } = db
    .prepare(`SELECT COALESCE(MAX(sortOrder), -1) AS maxSortOrder FROM tasks`)
    .get() as { maxSortOrder: number };
  const sortOrder = maxSortOrder + 1;

  const result = db
    .prepare(
      `INSERT INTO tasks (title, isCompleted, estimate, progress, priority, category, isToday, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      input.title,
      input.isCompleted ? 1 : 0,
      input.estimate ?? null,
      input.progress ?? null,
      input.priority ?? null,
      input.category ?? null,
      input.isToday ? 1 : 0,
      sortOrder,
    );
  return { id: Number(result.lastInsertRowid), sortOrder, ...input };
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

  // Remove sort-order value if marked as complete
  if (changes.isCompleted) {
    getDb().prepare(`UPDATE tasks SET sortOrder = -1 WHERE id = ?`).run(id);
  }
}

export function deleteTask(id: number): void {
  getDb().prepare("DELETE FROM tasks WHERE id = ?").run(id);
}

export function reorderTasks(ids: number[]): void {
  const db = getDb();
  const stmt = db.prepare("UPDATE tasks SET sortOrder = ? WHERE id = ?");
  const last = ids.length - 1;

  db.exec("BEGIN");
  try {
    ids.forEach((id, index) => stmt.run(last - index, id));
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}
