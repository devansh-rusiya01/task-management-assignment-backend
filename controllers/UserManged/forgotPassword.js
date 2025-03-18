 
import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";

// Reset Password Controller
const resetPassword = async (req, res) => {
  try {
    const {email,password}=req.body// The authenticated user performing the reset

    // Find the user
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new random password
    const newPassword = password// 8-character random password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      newPassword, 
    });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default resetPassword;
