const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  medicines: [{
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    duration: { type: String, required: true },
    frequency: { type: String, default: '' }, // e.g., '1-0-1' or 'Morning-Night'
  }],
  notes: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
