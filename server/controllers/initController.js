const bcrypt = require("bcryptjs");

// Models
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Department = require("../models/Department");
const Room = require("../models/Room");
const Medicine = require("../models/Medicine");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const Bill = require("../models/Bill");
const Report = require("../models/Report");

exports.initDatabase = async (req, res) => {
  try {
    // Clear existing collections
    await User.deleteMany({});
    await Doctor.deleteMany({}); 
    await Patient.deleteMany({});
    await Department.deleteMany({});
    await Room.deleteMany({});
    await Medicine.deleteMany({});
    await Appointment.deleteMany({});
    await Prescription.deleteMany({});
    await Bill.deleteMany({});
    await Report.deleteMany({});

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

    // =======================
// Departments
// =======================

await Department.insertMany([
  {
    name: "Cardiology",
    description: "Heart and cardiovascular treatments"
  },
  {
    name: "Neurology",
    description: "Brain and nervous system"
  },
  {
    name: "Orthopedics",
    description: "Bones and joints"
  },
  {
    name: "Pediatrics",
    description: "Children healthcare"
  },
  {
    name: "Dermatology",
    description: "Skin treatments"
  },
  {
    name: "General Medicine",
    description: "General consultation"
  }
]);

console.log("Departments Created");

const doctors = await Doctor.insertMany([
  {
    user: doctorUser1._id,
    name: doctorUser1.name,
    department: "Cardiology",
    experience: 12,
    qualification: "MD Cardiology",
    fee: 1000,
    rating: 4.8,
    reviewCount: 150,
    availableDays: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    availableTime: "09:00 AM - 05:00 PM"
  },
  {
    user: doctorUser2._id,
    name: doctorUser2.name,
    department: "Neurology",
    experience: 9,
    qualification: "MD Neurology",
    fee: 1200,
    rating: 4.7,
    reviewCount: 120,
    availableDays: ["Monday","Wednesday","Friday"],
    availableTime: "10:00 AM - 06:00 PM"
  }
]);

console.log("Doctors Created");

const patients = await Patient.insertMany([
  {
    user: patientUser1._id,
    name: patientUser1.name,
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    address: "Hyderabad",
    medicalHistory: []
  },
  {
    user: patientUser2._id,
    name: patientUser2.name,
    age: 24,
    gender: "Female",
    bloodGroup: "A+",
    address: "Vijayawada",
    medicalHistory: []
  }
]);

console.log("Patients Created");

await Room.insertMany([
  {
    roomNumber: "101",
    roomType: "General",
    status: "Available"
  },
  {
    roomNumber: "102",
    roomType: "General",
    status: "Available"
  },
  {
    roomNumber: "201",
    roomType: "Private",
    status: "Available"
  },
  {
    roomNumber: "301",
    roomType: "ICU",
    status: "Available"
  }
]);

console.log("Rooms Created");

await Medicine.insertMany([
  {
    name: "Paracetamol",
    price: 20,
    stock: 500,
    expiryDate: "2028-12-31",
    supplier: "Sun Pharma"
  },
  {
    name: "Amoxicillin",
    price: 65,
    stock: 300,
    expiryDate: "2028-09-10",
    supplier: "Cipla"
  },
  {
    name: "Ibuprofen",
    price: 35,
    stock: 250,
    expiryDate: "2028-11-01",
    supplier: "Dr. Reddy's"
  },
  {
    name: "Vitamin C",
    price: 15,
    stock: 600,
    expiryDate: "2029-01-01",
    supplier: "Himalaya"
  }
]);

console.log("Medicines Created");

// ======================================
// APPOINTMENTS
// ======================================

const appointmentStatuses = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled"
];

const appointmentReasons = [
  "General Checkup",
  "Fever",
  "Headache",
  "Diabetes Follow-up",
  "Heart Consultation",
  "Chest Pain",
  "Routine Checkup",
  "Skin Allergy"
];

const appointments = [];

for (let i = 0; i < 20; i++) {

  appointments.push({

    patient: patients[i % patients.length]._id,

    doctor: doctors[i % doctors.length]._id,

    date: `2026-07-${String((i % 28) + 1).padStart(2, "0")}`,

    time: `${9 + (i % 8)}:00 AM`,

    status: appointmentStatuses[i % appointmentStatuses.length],

    reason: appointmentReasons[i % appointmentReasons.length]

  });

}

const createdAppointments = await Appointment.insertMany(appointments);

console.log("Appointments Created");



    return res.status(200).json({
      success: true,
      message: "Hospital database initialized successfully.",
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