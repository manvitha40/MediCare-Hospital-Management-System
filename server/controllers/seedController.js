const mongoose = require("mongoose");
const { getSeedData } = require("../utils/seedData");

const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Department = require("../models/Department");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const Bill = require("../models/Bill");
const Room = require("../models/Room");
const Medicine = require("../models/Medicine");
const Report = require("../models/Report");

exports.seedDatabase = async (req, res) => {
  try {
    const seed = getSeedData();

    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Department.deleteMany({});
    await Appointment.deleteMany({});
    await Prescription.deleteMany({});
    await Bill.deleteMany({});
    await Room.deleteMany({});
    await Medicine.deleteMany({});
    await Report.deleteMany({});

    await User.insertMany(seed.users);
    await Doctor.insertMany(seed.doctors);
    await Patient.insertMany(seed.patients);
    await Department.insertMany(seed.departments);
    await Room.insertMany(seed.rooms);
    await Medicine.insertMany(seed.medicines);
    await Appointment.insertMany(seed.appointments);
    await Prescription.insertMany(seed.prescriptions);
    await Bill.insertMany(seed.bills);
    await Report.insertMany(seed.reports);

    res.json({
      success: true,
      message: "Database seeded successfully!"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};