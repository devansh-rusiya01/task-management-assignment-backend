import Task from "../../models/taskModel.js"; // Assuming your Task model file name
import User from "../../models/userModel.js";

const getUserTasks = async (req, res) => {
  try {
    const userId = req.user._id; // Extracted from authenticated user (assuming you're using middleware)

    // Optional: Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Fetch tasks assigned to this user
    const tasks = await Task.find({ assignedTo: userId }); // Adjust field as per your Task model

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({ success: true, message: "No tasks assigned yet", tasks: [] });
    }

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export { getUserTasks };
