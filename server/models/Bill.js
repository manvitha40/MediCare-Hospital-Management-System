const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  medicineFee: {
    type: Number,
    default: 0
  },
  labFee: {
    type: Number,
    default: 0
  },
  roomCharges: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending'
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
