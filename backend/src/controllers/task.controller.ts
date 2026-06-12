import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { getAllTasks, findTaskById, createTask, updateTask, deleteTask } from "../services/task.service";
import { CustomError } from "../lib/types/custom-error";
import { createTaskSchema, getTasksQuerySchema, updateTaskSchema } from "../validators/task.validator";

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    const query = getTasksQuerySchema.parse(req.query)
    const tasks = await getAllTasks(query)

    res.status(200).json({
      success: true,
      data: tasks,
    });
  }
);

export const getTaskById = asyncHandler(async(req: Request, res: Response) => {
    const id = req.params.id as string;
    const task = await findTaskById(id);
    if(!task){
        const error: CustomError = new Error("Task not found");
        error.status = 404;
        throw error
    }

    res.status(200).json({ 
        success: true, 
        data: task 
    })
});

export const addTask = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = createTaskSchema.parse(req.body);
    const task = await createTask(validatedData);

    res.status(201).json({
      success: true,
      data: task,
    });
  }
);

export const editTask = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const validatedData = updateTaskSchema.parse(req.body);
    const task = await updateTask(id, validatedData);

    res.status(200).json({
      success: true,
      data: task,
    });
  }
);

export const removeTask = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await deleteTask(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  }
);