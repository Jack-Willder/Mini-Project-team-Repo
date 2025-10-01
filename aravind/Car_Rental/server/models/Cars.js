const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  vehicleNumber: { type: String, required: true, unique: true },
  acFarePerKm: { type: Number, required: true },
  nonAcFarePerKm: { type: Number, required: true },
  acFarePerDay: { type: Number, required: true },
  nonAcFarePerDay: { type: Number, required: true },
  insuranceStatus: { type: String, enum: ["expired", "notExpired"], required: true },
  carImage: { type: String },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
