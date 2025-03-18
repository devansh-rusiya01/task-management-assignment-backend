import Task from "../../../models/taskModel.js";

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find Task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }

    // Only Admin Who Created the Task Can Update It
    if (task.assignedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    // Update Task
    task.status = status || task.status;
    await task.save();
    res.json({ message: "Task updated successfully", success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};
