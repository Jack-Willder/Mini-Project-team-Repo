const JobSeekers = require("../models/JobSeeker");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JSSECRET_KEY;

// Registration
exports.registerJobseeker = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await JobSeekers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newJobseeker = new JobSeekers({ name, email, password: hashedPassword });
    await newJobseeker.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login
exports.loginJobseeker = async (req, res) => {
  const { email, password } = req.body;

  try {
    const jobseeker = await JobSeekers.findOne({ email });
    if (!jobseeker) {
      return res.status(404).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, jobseeker.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: jobseeker._id }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      jobseeker: {
        id: jobseeker._id,
        name: jobseeker.name,
        email: jobseeker.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
