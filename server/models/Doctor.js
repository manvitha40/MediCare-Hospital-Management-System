const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 1,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  availableDays: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  availableTime: {
    type: String,
    default: '09:00 AM - 05:00 PM'
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
