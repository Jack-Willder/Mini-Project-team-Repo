const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");

router.get("/", reportsController.getBookingsByDateRange);

module.exports = router;
