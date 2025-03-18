import Task from "../../../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline} = req.body;
    const adminId = req.user._id;  
     const { assignedTo  }=req.params;
    
    const task = await Task.create({
      title,
      description,
      assignedTo,
      deadline,
      assignedBy: adminId,
    }); 

    res.status(201).json({ message: "Task created successfully", success: true, task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};
