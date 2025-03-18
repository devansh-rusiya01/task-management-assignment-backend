import User from "../../models/userModel.js";


const getMembers = async (req, res) => {
  try {
    const adminId = req.user._id; 

    
    const members = await User.find({ adminId: adminId, role: "user" })

    if (!members || members.length === 0) {
      return res.status(404).json({ message: "No team members found",success:false });
    }

    res.status(200).json({message:"members generated successfully",members,success:true});
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default getMembers;
