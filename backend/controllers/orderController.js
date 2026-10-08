import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    res.json({
      success: true,
      session_url: "https://checkout.stripe.com/demo-session",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    res.json({
      success: true,
      order: { id: "order_demo_12345", amount: amount * 100, currency: "INR" },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// Cancel Order for Customer
export const cancelOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.body;

    // Find the order in the database
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // String-safe comparison for MongoDB ObjectIds
    if (order.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized request" });
    }

    // Restrict cancellation if order is already processed
    if (
      order.status === "Shipped" ||
      order.status === "Out for delivery" ||
      order.status === "Delivered"
    ) {
      return res.json({
        success: false,
        message: `Cannot cancel order that is already ${order.status.toLowerCase()}`,
      });
    }

    if (order.status === "Cancelled") {
      return res.json({
        success: false,
        message: "Order is already cancelled",
      });
    }

    // Update status to 'Cancelled' instead of deleting the document
    await orderModel.findByIdAndUpdate(orderId, { status: "Cancelled" });

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
