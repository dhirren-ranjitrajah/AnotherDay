import getDb from "../connection";
import type TaskDto from "../../../types/TaskDto";
import type Task from "../model/Task";

export type TaskInput = Omit<TaskDto, "id">;

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
  };
}

export function getAllTasks(): TaskDto[] {
  const rows = getDb()
    .prepare("SELECT * FROM tasks ORDER BY id ASC")
    .all() as unknown as Task[];
  return rows.map(toDto);
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
