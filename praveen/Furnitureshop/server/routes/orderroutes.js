import express from "express";
import { 
  placeOrder, 
  getAllOrders, 
  updateOrderStatus, 
  getUserOrders 
} from "../controllers/ordercontroller.js";

const router = express.Router();

// User routes
router.post("/place-order", placeOrder);
router.get("/user/:userId", getUserOrders);

// Admin routes
router.get("/", getAllOrders); // fetch all orders
router.put("/:orderId", updateOrderStatus); // update order or payment status

export default router;
