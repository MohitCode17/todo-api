import express from "express";
import {
  addTask,
  completeTask,
  deleteTask,
  getTasks,
} from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

// Add Task Route
router.post("/addTask", isAuthenticated, addTask);

// Get Task Route
router.get("/getTasks", isAuthenticated, getTasks);

// Add Task Route
router.get("/complete/:id", isAuthenticated, completeTask);

// Add Task Route
router.delete("/delete/:id", isAuthenticated, deleteTask);

export default router;
