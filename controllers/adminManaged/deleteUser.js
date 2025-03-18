import User from "../../models/userModel.js";

 

const deleteMember = async (req, res) => {
  try {
    const adminId = req.user._id; // Admin performing the action
    const memberId = req.params.id; // ID of the member to delete

    // Find the user to be deleted
    const member = await User.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure only normal users (team members) can be deleted
    if (member.role === "admin") {
      return res.status(403).json({ message: "Admins cannot be deleted" });
    }

    // Delete the user
    await User.findByIdAndDelete(memberId);

    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default deleteMember;
