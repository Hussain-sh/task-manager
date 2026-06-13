export type Status = "TODO" | "IN_PROGRESS" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

interface TaskBase {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
}

export interface Task extends TaskBase {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskInput = TaskBase;
export type UpdateTaskInput = Partial<TaskBase>;

export type StatusFilter = "ALL" | Status;