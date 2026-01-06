const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// @route   GET api/cars
// @desc    Get all cars
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
