const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register customer
const registerCustomer = async (req, res) => {
  try {
    const { fullName, userName, email, phone, address, password } = req.body;

    if (!fullName || !userName || !email || !phone || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Customer.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      fullName,
      userName,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer registered successfully",
      customerId: newCustomer._id,
    });
  } catch (err) {
    console.error("Error in registerCustomer:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login customer
const loginCustomer = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const customer = await Customer.findOne({ userName: username });
    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: customer._id, username: customer.userName },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, username: customer.userName });
  } catch (err) {
    console.error("Error in loginCustomer:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerCustomer, loginCustomer };
