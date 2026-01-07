const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('car', 'make model year');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// CREATE an order
router.post('/', async (req, res) => {
  const order = new Order({
    user: req.body.user,
    car: req.body.car,
    amount: req.body.amount,
    status: req.body.status,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an order
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.status != null) {
    res.order.status = req.body.status;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an order
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Deleted Order' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id).populate('user', 'name email').populate('car', 'make model year');
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
}

module.exports = router;
