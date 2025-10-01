const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes= require ("./routes/customerRoutes.js");
const path = require("path");
const carRoutes = require("./routes/carRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingsRoutes = require("./routes/bookingRoutes");
const reportsRoutes = require("./routes/reports");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Carrental")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/cars", carRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/reports", reportsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
