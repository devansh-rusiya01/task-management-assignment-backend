import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { createTask } from "../controllers/adminManaged/tasks/createTask.js";
import { deleteTask } from "../controllers/adminManaged/tasks/deleteTask.js";
import { updateTask } from "../controllers/adminManaged/tasks/updatetask.js";
import { getTasks } from "../controllers/adminManaged/tasks/getttasks.js";
const router = express.Router();

 router.post("/create-task/:assignedTo",protect,admin,createTask);
 router.get("/delete-task/:id",protect,admin,deleteTask);
 router.post("/update-status/:id",protect,admin,updateTask);
 router.get("/get-tasks/:id",protect,admin,getTasks);
export default router;
  