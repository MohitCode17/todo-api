import { Task } from "../models/task.js";

// ============== Add a task Controller =============
export const addTask = async (req, res) => {
  try {
    const { text } = req.body;

    await Task.create({
      text,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added",
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// ============== Get all task Controller =============
export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// ============== Delete task Controller =============
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    await task.deleteOne();

    res.status(200).json({
      success: true,
      task,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  };
};

// ============== Complete task Controller =============
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.complete = !task.complete;

    await task.save();

    res.status(200).json({
      success: true,
      task,
      message: "Task completed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};