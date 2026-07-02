const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Department = require('../models/Department');
const Room = require('../models/Room');
const Medicine = require('../models/Medicine');

const MONGO_URI = process.env.MONGODB_URI;

exports.initDatabase = async (req, res) => {
  try {
    

    // Clear Existing Data
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Department.deleteMany({});
    await Room.deleteMany({});
    await Medicine.deleteMany({});

    console.log("Old data deleted.");

    // ===========================
    // HASH PASSWORDS
    // ===========================

    const adminPassword = await bcrypt.hash("admin123", 10);
    const doctorPassword = await bcrypt.hash("doctor123", 10);
    const receptionistPassword = await bcrypt.hash("reception123", 10);
    const patientPassword = await bcrypt.hash("patient123", 10);

    // ===========================
    // USERS
    // ===========================

    const admin = await User.create({
      name: "System Administrator",
      email: "admin@medicare.com",
      password: adminPassword,
      role: "admin"
    });

    const doctorUser1 = await User.create({
      name: "Dr. John Smith",
      email: "john@medicare.com",
      password: doctorPassword,
      role: "doctor"
    });

    const doctorUser2 = await User.create({
      name: "Dr. Sarah Johnson",
      email: "sarah@medicare.com",
      password: doctorPassword,
      role: "doctor"
    });

    const receptionist = await User.create({
      name: "Priya Sharma",
      email: "reception@medicare.com",
      password: receptionistPassword,
      role: "receptionist"
    });

    const patientUser1 = await User.create({
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      password: patientPassword,
      role: "patient"
    });

    const patientUser2 = await User.create({
      name: "Anjali Reddy",
      email: "anjali@gmail.com",
      password: patientPassword,
      role: "patient"
    });

    console.log("Users created.");

    console.log("Initialization Part 1 Completed.");

    return res.json({
    success: true,
    message: "Database initialized successfully"
});

  } catch (err) {
    console.error(err);
    return res.status(500).json({
    success: false,
    message: err.message
});
  }
}
