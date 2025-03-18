import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });


export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check all fields
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please provide name, email, password, and role");
  }

  // Ensure role is 'admin'
  if (role !== "admin") {
    res.status(400);
    throw new Error("Role must be admin for this route");
  }

  // Check if admin already exists
  const adminExists = await User.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // Create admin
  const admin = await User.create({
    name,
    email,
    password,
    role,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
