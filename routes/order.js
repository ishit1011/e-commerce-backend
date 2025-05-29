const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { authenticate, isAdmin, isRider } = require("../middlewares/auth");

// Post order
router.post("/post-order", authenticate, async (req, res) => {
  const order = await Order.create({
    // user, products[], address,
    user: req.user._id,
    products: req.products,
    address: req.address,
  });
  res.json(order);
});

// ADMIN : GET all orders
router.get("/admin-orders", authenticate, isAdmin, async (req, res) => {
  const allOrders = await Order.find().populate("user assignedRider");
  res.json(allOrders);
});

// ADMIN : Update status + assign rider --> id = order ID
router.patch("/admin-orders/:id", authenticate, isAdmin, async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
      assignedRider: req.body.assignedRider,
    },
    {
      new: true,
    }
  );
  res.json(updatedOrder);
});

// RIDER: View assigned orders
router.get("/rider", authenticate, isRider, async (req, res) => {
  const allAssignedOrders = await Order.find({ assignedRider: req.user._id });
  res.json(allAssignedOrders);
});

// RIDER: Change status --> id = order ID
router.patch("/rider/:id", authenticate, isRider, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order.assignedRider.toString() !== req.user._id.toString()) {
    res.status(403).json({ error: "Not your order" });
    return;
  }
  order.status = req.body.status;
  await order.save();
  res.json(order);
});


module.exports = router;
