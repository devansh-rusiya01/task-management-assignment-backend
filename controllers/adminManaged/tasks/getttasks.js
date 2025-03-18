import Task from "../../../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const {  id } = req.params; // Get Admin ID and User ID from URL

   const adminId=req.user._id
    
    // Find tasks assigned by the admin AND assigned to the specific user
    const tasks = await Task.find({
      assignedBy: adminId,
      assignedTo: id,
    }).populate("assignedTo", "name email");

    res.status(200).json({ message: "Tasks fetched successfully", success: true, tasks });

  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};
