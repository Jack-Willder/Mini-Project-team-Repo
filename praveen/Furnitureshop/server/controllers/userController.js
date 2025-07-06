// server/controllers/adminController.js
const UserModel = require("../models/user"); // ✅ Rename model to avoid name clash
const jwt = require("jsonwebtoken");

const SECRET = "adminSecretKey";

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password);

  try {
    const foundUser = await UserModel.findOne({ username }); // ✅ Use renamed model

    if (!foundUser) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (foundUser.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Fix: use foundUser, not undefined 'admin'
    const token = jwt.sign({ id: foundUser._id }, SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("Server error during login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
