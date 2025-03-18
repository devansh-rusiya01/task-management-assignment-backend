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
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(cookieParser()); 
app.post("/login",(req,res)=>{
  res.json({message:"everything looks fine"})
})

app.use("/api/auth/user", adminRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
