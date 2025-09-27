const driver = require("../models/Drivers");
const jwt = require("jsonwebtoken");


exports.logindriver = async (req, res) => {
  const { username, password } = req.body;

  try {
    const driver = await driver.findOne({ username });

    if (!driver) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await driver.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: driver._id, username: driver.username },
      "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      driver: {
        id: driver._id,
        username: driver.username,
        name: driver.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.registerdriver = async (req, res) => {
  const { username, password, name } = req.body;

  try {
    const existing = await driver.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const driver = new driver({ username, password, name });
    await driver.save();

    res.status(201).json({ message: "driver registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
