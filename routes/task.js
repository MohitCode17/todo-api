import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

// Add Task Route
router.post("/addTask", isAuthenticated, addTask);

// Get Task Route
router.get("/getTasks", isAuthenticated, getTasks);

// Add Task Route
router.get("/updateTask/:id", isAuthenticated, updateTask);

// Add Task Route
router.delete("/deleteTask/:id", isAuthenticated, deleteTask);

export default router;
