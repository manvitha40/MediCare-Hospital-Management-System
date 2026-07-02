const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Department = require("../models/Department");
const Room = require("../models/Room");
const Medicine = require("../models/Medicine");

exports.initDatabase = async (req, res) => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Department.deleteMany({});
    await Room.deleteMany({});
    await Medicine.deleteMany({});

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const doctorPassword = await bcrypt.hash("doctor123", 10);
    const receptionistPassword = await bcrypt.hash("reception123", 10);
    const patientPassword = await bcrypt.hash("patient123", 10);

    // Create Users
    const admin = await User.create({
      name: "System Administrator",
      email: "admin@medicare.com",
      password: adminPassword,
      role: "admin",
      profileImage: ""
    });

    const doctorUser1 = await User.create({
      name: "Dr. John Smith",
      email: "john@medicare.com",
      password: doctorPassword,
      role: "doctor",
      profileImage: ""
    });

    const doctorUser2 = await User.create({
      name: "Dr. Sarah Johnson",
      email: "sarah@medicare.com",
      password: doctorPassword,
      role: "doctor",
      profileImage: ""
    });

    const receptionist = await User.create({
      name: "Priya Sharma",
      email: "reception@medicare.com",
      password: receptionistPassword,
      role: "receptionist",
      profileImage: ""
    });

    const patientUser1 = await User.create({
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      password: patientPassword,
      role: "patient",
      profileImage: ""
    });

    const patientUser2 = await User.create({
      name: "Anjali Reddy",
      email: "anjali@gmail.com",
      password: patientPassword,
      role: "patient",
      profileImage: ""
    });

    return res.status(200).json({
      success: true,
      message: "Users initialized successfully.",
      users: {
        admin: admin.email,
        doctor1: doctorUser1.email,
        doctor2: doctorUser2.email,
        receptionist: receptionist.email,
        patient1: patientUser1.email,
        patient2: patientUser2.email
      }
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};