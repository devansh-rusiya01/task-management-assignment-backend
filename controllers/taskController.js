import Task from "../models/taskModel.js";
import asyncHandler from "express-async-handler";
import moment from "moment";

// Get Tasks
const getTasks = asyncHandler(async (req, res) => {
  const user = req.user; // Get logged-in user
  const today = moment().startOf("day");
  const startOfWeek = today.clone().startOf("isoWeek"); // Monday
  const endOfWeek = today.clone().endOf("isoWeek"); // Sunday

  let tasks;
  const userId=user._id;
  console.log(userId)
  if (user.role === "admin") {
    // Admin can view all tasks
    tasks = await Task.find({assignedBy:userId});
    console.log("assigned tasks",tasks)
  } else {
    // Team members can only see their assigned tasks for the current week
    tasks = await Task.find({
      assignedTo: userId,
      deadline: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() },
    });
  }

  res.status(200).json({message:"tasks generated successfully",success:true,tasks});
});

export { getTasks };

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, deadline, assignedTo } = req.body;
 const userId=req.user._id;
  const task = await Task.create({ title, description, assignedTo, deadline,assignedBy:userId });
  res.status(201).json(task);
});

// Update Task
export const updateTask = asyncHandler(async (req, res) => {
    console.log(req.params.id)
  const task = await Task.findById(req.params.id);
  if (!task || task.assignedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  task.status = req.body.status || task.status;
  await task.save();
  res.json(task);
});

// Delete Task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.assignedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  await task.deleteOne();
  res.json({ message: "Task deleted" });
});
