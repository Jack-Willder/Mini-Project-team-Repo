const express = require("express");
const router = express.Router();
const { addOrder, getAllOrders, getOrders, deleteOrder } = require("../controllers/OrderController");

router.post("/add", addOrder);
router.get("/all", getAllOrders);
router.get("/", getOrders);
router.delete("/:id", deleteOrder);

module.exports = router;