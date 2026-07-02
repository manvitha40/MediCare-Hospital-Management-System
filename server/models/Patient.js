const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  medicalHistory: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
