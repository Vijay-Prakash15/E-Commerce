const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,

  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],

  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },

  // Order + Payment Status
  orderStatus: {
    type: String,
    default: "pending", // pending | confirmed | cancelled
  },

  paymentMethod: {
    type: String,
    default: "Razorpay",
  },

  paymentStatus: {
    type: String,
    default: "pending", // pending | paid | failed
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  // Razorpay specific fields
  razorpayOrderId: String,
  razorpayPaymentId: String,

  totalAmount: Number,

  orderDate: {
    type: Date,
    default: Date.now,
  },

  orderUpdateDate: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
