const express = require('express');
const router = express.Router();
const db = require('../config/db');  // adjust path if needed

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});

module.exports = router;
