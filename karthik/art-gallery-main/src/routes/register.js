const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const validateRegister = require("../middleware/validateRegister");

// POST /routes/register
router.post("/", validateRegister, registerController.registerUser);

module.exports = router;
