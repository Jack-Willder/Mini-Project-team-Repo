const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes=require("./routes/userRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string (replace with your actual URI if using Atlas)
const MONGO_URL = "mongodb://127.0.0.1:27017/kickcouture";

// ✅ Connect to MongoDB (updated without deprecated options)
mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
