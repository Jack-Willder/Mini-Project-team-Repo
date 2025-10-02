const Booking = require("../models/Booking");

// Get bookings between fromDate and endDate
exports.getBookingsByDateRange = async (req, res) => {
  try {
    const { fromDate, endDate } = req.query;

    if (!fromDate || !endDate) {
      return res.status(400).json({ success: false, message: "fromDate and endDate are required" });
    }

    const bookings = await Booking.find({
      $or: [
        { startDate: { $gte: new Date(fromDate), $lte: new Date(endDate) } },
        { endDate: { $gte: new Date(fromDate), $lte: new Date(endDate) } },
        { startDate: { $lte: new Date(fromDate) }, endDate: { $gte: new Date(endDate) } }
      ]
    })
    .sort({ startDate: 1 })
    .populate("car", "carName")        // populate car name
    .populate("customer", "fullName")  // populate customer name
    .lean();

    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
