const express = require("express");
const db = require("../config/db"); // import connection
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User registered successfully!", userId: result.insertId });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
