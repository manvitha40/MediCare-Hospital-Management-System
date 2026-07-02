const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  testName: {
    type: String,
    enum: ['Blood Test', 'MRI', 'X-Ray', 'ECG', 'CT Scan'],
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  result: {
    type: String,
    default: 'Awaiting lab analysis'
  },
  fileUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);
