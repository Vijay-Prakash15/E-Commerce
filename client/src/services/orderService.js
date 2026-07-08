import { api } from "../config/api";

// 🔹 Create Razorpay Order
export const createOrder = (orderData) => {
  return api.post("/shop/order/create", orderData);
};

// 🔹 Verify Razorpay Payment
export const verifyPayment = (paymentData) => {
  return api.post("/shop/order/verify-payment", paymentData);
};
