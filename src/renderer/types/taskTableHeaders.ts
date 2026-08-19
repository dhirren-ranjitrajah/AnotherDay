export const TaskTableHeaders = ["Today", "Backlog", "Done"] as const;
export type TaskTableHeadersType = (typeof TaskTableHeaders)[number];
