const User = require("../models/user"); // Mongoose model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = "userSecretKey"; // You should store this in an .env file in production

// ======================
// User Registration
// ======================
exports.userRegister = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ======================
// User Login
// ======================
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
