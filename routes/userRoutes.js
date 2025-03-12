import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import { createUserByAdmin } from "../controllers/user/createUser.js"; 

const router = express.Router();


router.post("/login-admin", loginAdmin);
/* router.get("/profile", protect, getProfile); */
router.post("/create-user", protect, admin, createUserByAdmin);

export default router;

