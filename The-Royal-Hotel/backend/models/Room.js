const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String, // e.g., 'Deluxe', 'Suite', 'Presidential'
    required: true,
    default: 'Standard'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String],
    default: []
  },
  imagePath: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Room', roomSchema);
