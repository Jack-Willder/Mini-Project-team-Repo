import express from "express";
const router = express.Router();

import { 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../controllers/usereditController.js";

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
