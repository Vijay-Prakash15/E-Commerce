const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const razorpay = require("../../helpers/razorpay");
const crypto = require("crypto");

/**
 * CREATE ORDER (Razorpay)
 * 1. Razorpay order create
 * 2. DB me order save (payment pending)
 */
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      cartId,
    } = req.body;

    // 1️⃣ Razorpay order create
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // INR -> paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    // 2️⃣ Order DB me save
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "Razorpay",
      paymentStatus: "pending",
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      orderDate: new Date(),
    });

    await newlyCreatedOrder.save();

    // 3️⃣ Frontend ko Razorpay order bhejo
    res.status(201).json({
      success: true,
      razorpayOrder,
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error while creating Razorpay order",
    });
  }
};

/**
 * VERIFY PAYMENT (Razorpay)
 * 1. Signature verify
 * 2. Order confirm
 * 3. Stock update
 * 4. Cart delete
 */
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // 1️⃣ Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // 2️⃣ Order fetch
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 3️⃣ Order update
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.razorpayPaymentId = razorpay_payment_id;

    // 4️⃣ Product stock update
    for (let item of order.cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // 5️⃣ Cart delete
    await Cart.findByIdAndDelete(order.cartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment successful, order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error while verifying payment",
    });
  }
};

/**
 * GET ALL ORDERS BY USER
 */
const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

/**
 * GET SINGLE ORDER DETAILS
 */
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getAllOrdersByUser,
  getOrderDetails,
};
