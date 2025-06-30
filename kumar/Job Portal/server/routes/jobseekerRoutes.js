const express = require("express");
const router = express.Router();
const {
  registerJobseeker,
  loginJobseeker,
} = require("../controllers/jobseekerControllers");

router.post("/register", registerJobseeker);
router.post("/login", loginJobseeker);

module.exports = router;
