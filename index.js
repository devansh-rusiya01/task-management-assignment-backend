import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js"; 

import adminRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();


// Enable cookie parsing

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5117", // Allow requests from this domain
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
  credentials: true, // Allow cookies & authentication headers
}));
app.use(cookieParser()); 


app.use("/api/auth/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
