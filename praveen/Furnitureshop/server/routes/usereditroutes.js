const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/usereditController");

// Route to fetch all users
router.get("/users", getUsers); // Matches GET request from frontend

// Route to update a user by ID
router.put("/users/:id", updateUser); // Matches PUT request from frontend

// Route to delete a user by ID
router.delete("/users/:id", deleteUser); // Matches DELETE request from frontend

module.exports = router;
