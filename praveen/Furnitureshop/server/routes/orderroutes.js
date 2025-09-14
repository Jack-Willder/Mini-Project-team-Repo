import express from "express";
import { 
  placeOrder,       // user places an order
  getAllOrders,     // admin: fetch all orders
  updateOrderStatus,// admin: update order/payment/shipping status
  getUserOrders     // user: fetch their orders
} from "../controllers/ordercontroller.js";

const router = express.Router();

// 🔹 User routes
router.post("/place-order", placeOrder);     // POST /api/orders/place-order
router.get("/user/:userId", getUserOrders);  // GET  /api/orders/user/:userId

// 🔹 Admin routes
router.get("/", getAllOrders);               // GET  /api/orders
router.put("/:orderId", updateOrderStatus);  // PUT  /api/orders/:orderId

export default router;
