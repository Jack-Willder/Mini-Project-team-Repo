// routes/usereditRoutes.js
import express from "express";
const router = express.Router();

import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../controllers/usereditController.js";

// Route to fetch all users
router.get("/users", getUsers);

// Route to fetch a single user by ID
router.get("/users/:id", getUserById);

// Route to update a user by ID
router.put("/users/:id", updateUser);

// Route to delete a user by ID
router.delete("/users/:id", deleteUser);

export default router;
