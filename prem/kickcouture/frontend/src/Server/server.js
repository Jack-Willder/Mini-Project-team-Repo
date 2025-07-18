const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Route imports
const adminRoutes = require("./routes/adminRoutes"); // Handles admin routes
const userRoutes = require("./routes/userRoutes");   // Handles user signup/login

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/kickcouture", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Route Definitions
app.use("/api/admin", adminRoutes); // Example: /api/admin/login
app.use("/api/user", userRoutes);   // Example: /api/user/signup, /api/user/login

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
