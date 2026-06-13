import { Router } from "express";
import { getTasks, getTaskById, addTask, editTask, removeTask } from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", addTask);
router.put("/:id", editTask);
router.delete("/:id", removeTask);

export default router;