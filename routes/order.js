const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { authenticate, isAdmin, isRider } = require("../middlewares/auth");
const User = require("../models/User");

// Post order
router.post("/post-order", authenticate, async (req, res) => {
  const { products, address } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products in order" });
  }

  if (!address) {
    return res.status(400).json({ message: "Address required" });
  }

  const order = await Order.create({
    // user, products[], address,
    user: req.user._id,
    products,
    address,
  });
  res.json(order);
});

// ADMIN : GET all orders
router.get("/admin-orders", authenticate, isAdmin, async (req, res) => {
  const allOrders = await Order.find().populate("user assignedRider");
  res.json(allOrders);
});

// ADMIN : Update status + add new field of assign rider --> id = order ID
const allowedStatuses = [
  "Paid",
  "Delivered",
  "Unpaid",
  "Undelivered",
  "Shipped",
];
router.patch("/admin-orders/:id", authenticate, isAdmin, async (req, res) => {
  const { assignedRider, status } = req.body;

  if (!assignedRider) {
    return res.status(401).json("Assign a rider first");
  }

  if (!status || !allowedStatuses.includes(status)) {
    return res
      .status(400)
      .json(`Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}`);
  }

  try {
    const userIsRider = await User.findById(assignedRider);
    if (!userIsRider) {
      return res.status(404).json("Rider not found");
    }
    if (userIsRider.role !== "rider") {
      return res.status(403).json("Not a rider");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...(status && { status }),
        ...(assignedRider && { assignedRider }),
      },
      { new: true }
    ).populate("user assignedRider");

    if (!updatedOrder) {
      return res.status(404).json("Order not found");
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});




// RIDER: View assigned orders
router.get("/rider", authenticate, isRider, async (req, res) => {
  const allAssignedOrders = await Order.find({ assignedRider: req.user._id });
  res.json(allAssignedOrders);
});

// RIDER: Change status --> id = order ID
router.patch("/rider/:id", authenticate, isRider, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed statuses: ${allowedStatuses.join(", ")}`
      });
    }

    // Find order
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check rider authorization
    if (order.assignedRider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You are not authorized to update this order" });
    }

    // Update status
    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
