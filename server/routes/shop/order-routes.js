const express = require("express");

const {
  createOrder,
  verifyPayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// 🔹 Razorpay order create
router.post("/create", createOrder);

// 🔹 Razorpay payment verify
router.post("/verify-payment", verifyPayment);

// 🔹 User ke saare orders
router.get("/list/:userId", getAllOrdersByUser);

// 🔹 Single order details
router.get("/details/:id", getOrderDetails);

module.exports = router;
