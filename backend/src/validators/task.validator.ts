import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),

  description: z
    .string()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"])
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  dueDate: z.string().datetime().transform(val => new Date(val)).optional()
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters")
    .optional(),

  description: z
    .string()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"])
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  dueDate: z.string().datetime().transform(val => new Date(val)).optional()
});

export const getTasksQuerySchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  sortBy: z.enum(["createdAt", "dueDate"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
})