import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    deadline: { type: Date, required: true }, // Ensure deadline is stored as a Date
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },

  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
