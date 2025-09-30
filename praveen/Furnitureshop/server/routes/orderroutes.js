import express from "express";
import { 
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  getOrdersCount,
  getOrderById,   
  getCompletedOrdersCount 
} from "../controllers/ordercontroller.js";

const router = express.Router();

router.post("/place-order", placeOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:orderId", getOrderById); 
router.get("/", getAllOrders);
router.put("/:orderId", updateOrderStatus);
router.get("/count", getOrdersCount); 
router.get("/completed/count", getCompletedOrdersCount); 

export default router;
