// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route files
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");           
const itemRoutes = require("./routes/itemRoutes");
const usereditRoutes = require("./routes/usereditroutes");   
const cartRoutes = require("./routes/cartRoutes");           
// const orderRoutes = require("./routes/orderroutes");   // enable later

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URL = "mongodb://127.0.0.1:27017/furnitureshop";
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);               
app.use("/api/items", itemRoutes);             
app.use("/api/userman", usereditRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/orders", orderRoutes);

// Default route (for testing)
app.get("/", (req, res) => {
  res.send("Furniture Shop API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
