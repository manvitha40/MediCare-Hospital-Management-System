const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    enum: ['General', 'Semi-Private', 'Private', 'ICU'],
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Maintenance'],
    default: 'Available'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
