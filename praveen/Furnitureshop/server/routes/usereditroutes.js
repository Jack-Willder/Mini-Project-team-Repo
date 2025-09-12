const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,   // new controller
  updateUser,
  deleteUser
} = require("../controllers/usereditController");

// Route to fetch all users
router.get("/users", getUsers);

// Route to fetch a single user by ID
router.get("/users/:id", getUserById);   // ✅ new route

// Route to update a user by ID
router.put("/users/:id", updateUser);

// Route to delete a user by ID
router.delete("/users/:id", deleteUser);

module.exports = router;
