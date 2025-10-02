const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  licenseStatus: { type: String, enum: ["expired", "notExpired"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Driver", driverSchema);
