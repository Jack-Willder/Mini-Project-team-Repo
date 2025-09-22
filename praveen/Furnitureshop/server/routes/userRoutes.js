import express from "express";
import { userRegister, userLogin,getUsersCount } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/count", getUsersCount); 

export default router;

