const Employee = require("../models/Emp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.EMPSECRET_KEY;

// Registration
exports.registeremp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmp = new Employee({ name, email, password: hashedPassword });
    await newEmp.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login
exports.loginEmp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emp = await Employee.findOne({ email });
    if (!emp) {
      return res.status(404).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: emp._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      jobseeker: {
        id: emp._id,
        name: emp.name,
        email: emp.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
