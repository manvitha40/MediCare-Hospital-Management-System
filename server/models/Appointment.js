const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
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
  date: {
    type: String, // format YYYY-MM-DD
    required: true
  },
  time: {
    type: String, // format HH:MM or similar
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  reason: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
