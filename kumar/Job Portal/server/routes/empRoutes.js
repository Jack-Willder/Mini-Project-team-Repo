const express = require("express");
const router = express.Router();
const {
  registeremp,
  loginEmp,
} = require("../controllers/empControllers");

router.post("/register", registeremp);
router.post("/login", loginEmp);

module.exports = router;
