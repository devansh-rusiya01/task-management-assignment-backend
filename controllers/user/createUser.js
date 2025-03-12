import bcrypt from "bcryptjs";
import crypto from "crypto"; 
import User from "../../models/userModel.js";

const createUserByAdmin = async (req, res) => {
  try {
    const { email,name } = req.body;
    const adminId = req.user._id; 

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

     
    const existingUser = await User.findOne({ email,adminId:adminId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

  
    const randomPassword = crypto.randomBytes(8).toString("hex"); 
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "user",
      adminId: adminId,
      name
 // Store which admin created this user
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        password: randomPassword,
        name // Admin gets the password to share with the user
      });
    } else {
      res.status(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { createUserByAdmin };
