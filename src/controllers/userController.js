const User = require("../models/user");

exports.updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { name,phone, email, image } = req.body;
  
      // Update the user's name, email, and imageUrl
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { name, phone, email, image } },
        { new: true, select: "-password" } // Exclude the password field
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User Updated." });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };




