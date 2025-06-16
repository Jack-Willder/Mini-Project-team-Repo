// server/controllers/adminController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const SECRET = "adminSecretKey";

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // ✅ Direct string comparison (plain text password)
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
