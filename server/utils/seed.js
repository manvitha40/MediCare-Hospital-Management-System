require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { getSeedData } = require('./seedData');


// Models
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Department = require('../models/Department');
const Appointment = require('../models/Appointment');
const Prescription = require('../models/Prescription');
const Bill = require('../models/Bill');
const Room = require('../models/Room');
const Medicine = require('../models/Medicine');
const Report = require('../models/Report');

const seedMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare';
  try {
    console.log('Connecting to MongoDB for seeding...');
    console.log("Mongo URI:", mongoURI);
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB. Clearing old data...');

    // Clear collections
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

    const seed = getSeedData();

    // Insert
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

    console.log('MongoDB Seeded Successfully.');
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
  } finally {
    await mongoose.disconnect();
  }
};

const seedMockFiles = () => {
  console.log('Seeding Mock Database JSON Files...');
  const DATA_DIR = path.join(__dirname, '..', 'data');
  
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const seed = getSeedData();

  fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(seed.users, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'doctors.json'), JSON.stringify(seed.doctors, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'patients.json'), JSON.stringify(seed.patients, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'departments.json'), JSON.stringify(seed.departments, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'rooms.json'), JSON.stringify(seed.rooms, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'medicines.json'), JSON.stringify(seed.medicines, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'appointments.json'), JSON.stringify(seed.appointments, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'prescriptions.json'), JSON.stringify(seed.prescriptions, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'bills.json'), JSON.stringify(seed.bills, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'reports.json'), JSON.stringify(seed.reports, null, 2));

  console.log('Mock JSON database seeded successfully.');
};

// Check if run directly
if (require.main === module) {
  // Always seed mock files first
  seedMockFiles();
  
  // Try to seed mongo as well
  seedMongoDB().then(() => {
    process.exit(0);
  });
}

module.exports = { seedMockFiles };
