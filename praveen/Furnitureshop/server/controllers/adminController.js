import Admin from "../models/Admin.js"; 
import jwt from "jsonwebtoken";         
const SECRET = "adminSecretKey";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email, password);

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("Server error during login:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
