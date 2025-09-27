const express = require("express");
const router = express.Router();
const {
  logindriver,
  registerdriver,
} = require("../controllers/driverController");

// POST: Login
router.post("/login", logindriver);

// POST: Register
router.post("/register", registerdriver);

module.exports = router;
