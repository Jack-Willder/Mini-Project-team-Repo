// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   car: { type: String, required: true },
//   customerNumber: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   distance: { type: String, required: true },
//   totalAmount: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    car: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Car",
      required: true 
    },
    customer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Customer",
      required: true 
    },
    customerNumber: { 
      type: String, 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true 
    },
    endDate: { 
      type: Date, 
      required: true 
    },
    carType: {
      type: String,
      enum: ["With AC", "Without AC"],
      default: "With AC"
    },
    chargeType: {
      type: String,
      enum: ["Per Day", "Per KM"],
      default: "Per Day"
    },
    driver: { 
      type: String 
    },
    totalAmount: { 
      type: Number, 
      required: true 
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
