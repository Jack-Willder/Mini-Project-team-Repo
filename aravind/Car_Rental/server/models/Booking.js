const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car: { type: String, required: true },
  customerNumber: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  distance: { type: String, required: true },
  totalAmount: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
