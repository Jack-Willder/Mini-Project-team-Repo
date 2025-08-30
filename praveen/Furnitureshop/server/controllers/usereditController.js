const User = require("../models/useredit");

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error in getUsers:", err.message);
    res.status(500).json({ error: "Failed to fetch users", details: err.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error in updateUser:", err.message);
    res.status(500).json({ error: "Failed to update user", details: err.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error in deleteUser:", err.message);
    res.status(500).json({ error: "Failed to delete user", details: err.message });
  }
};

// Export All
module.exports = {
  getUsers,
  updateUser,
  deleteUser
};
