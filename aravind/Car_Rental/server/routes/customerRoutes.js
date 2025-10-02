const express = require("express");
const { registerCustomer, loginCustomer } = require("../controllers/custController");

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

module.exports = router;
