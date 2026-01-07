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

// @route   GET api/cars/:id
// @desc    Get a single car by ID
// @access  Public
router.get('/:id', getCar, (req, res) => {
  res.json(res.car);
});

// @route   POST api/cars
// @desc    Create a car
// @access  Private (implement auth later)
router.post('/', async (req, res) => {
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT api/cars/:id
// @desc    Update a car
// @access  Private (implement auth later)
router.put('/:id', getCar, async (req, res) => {
  if (req.body.make != null) res.car.make = req.body.make;
  if (req.body.model != null) res.car.model = req.body.model;
  if (req.body.year != null) res.car.year = req.body.year;
  if (req.body.price != null) res.car.price = req.body.price;
  if (req.body.description != null) res.car.description = req.body.description;
  if (req.body.image != null) res.car.image = req.body.image;

  try {
    const updatedCar = await res.car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/cars/:id
// @desc    Delete a car
// @access  Private (implement auth later)
router.delete('/:id', getCar, async (req, res) => {
  try {
    await res.car.remove();
    res.json({ message: 'Deleted Car' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCar(req, res, next) {
  let car;
  try {
    car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: 'Cannot find car' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.car = car;
  next();
}

module.exports = router;
