const mongoose = require('mongoose');

const SpecSchema = new mongoose.Schema({
  label: String,
  value: String,
});

const CarSchema = new mongoose.Schema({
  name: String,
  icon: String,
  description: String,
  specs: [SpecSchema],
  price: String,
});

module.exports = mongoose.model('Car', CarSchema);
