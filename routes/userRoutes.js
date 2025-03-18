import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

import { createUserByAdmin } from "../controllers/adminManaged/createUser.js"; 
import getMembers from "../controllers/adminManaged/getMembers.js";
import deleteMember from "../controllers/adminManaged/deleteUser.js";
import resetPassword from "../controllers/UserManged/forgotPassword.js";
import loginUser from "../controllers/UserManged/userLogin.js";
import { getUserTasks } from "../controllers/UserManged/getUserTasks.js";
const router = express.Router();

// Admin Routes
router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);

// User Routes
router.post("/login-user", loginUser);

router.get("/getUserTasks", protect  , getUserTasks);

router.post("/create-user", protect, admin, createUserByAdmin);
router.get("/get-members", protect, admin, getMembers);
router.get("/delete-member/:id", protect, admin, deleteMember);
router.post("/reset-password", resetPassword);

export default router;
