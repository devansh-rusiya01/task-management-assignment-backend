import Task from "../../../models/taskModel.js";

 

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Task
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }

    // Only Admin Who Created the Task Can Delete It
    if (task.assignedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};
