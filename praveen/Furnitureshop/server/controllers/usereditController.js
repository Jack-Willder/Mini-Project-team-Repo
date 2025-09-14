// controllers/usereditController.js
import User from "../models/useredit.js";

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error in getUsers:", err.message);
    res.status(500).json({ error: "Failed to fetch users", details: err.message });
  }
};

// Get Single User by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // hide password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getUserById:", err.message);
    res.status(500).json({ error: "Failed to fetch user", details: err.message });
  }
};

// Update User (allow partial updates, including only address)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // could be { address } or other fields

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Merge updates into existing user
    for (const key in updates) {
      if (key === "address") {
        // Merge nested address
        user.address = { ...user.address.toObject(), ...updates.address };
      } else {
        user[key] = updates[key];
      }
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error in updateUser:", err.message);
    res.status(500).json({ error: "Failed to update user", details: err.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
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
