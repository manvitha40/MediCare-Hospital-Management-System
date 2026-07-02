const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  expiryDate: {
    type: String, // YYYY-MM-DD
    required: true
  },
  supplier: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
