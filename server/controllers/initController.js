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
  name: "Dr. Rajesh Kumar",
  email: "rajesh@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
});

const doctorUser2 = await User.create({
  name: "Dr. Priya Sharma",
  email: "priya@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
});

const doctorUser3 = await User.create({
  name: "Dr. Arjun Reddy",
  email: "arjun@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/men/45.jpg"
});

const doctorUser4 = await User.create({
  name: "Dr. Sneha Nair",
  email: "sneha@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/women/65.jpg"
});

const doctorUser5 = await User.create({
  name: "Dr. Vivek Mehta",
  email: "vivek@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/men/67.jpg"
});

const doctorUser6 = await User.create({
  name: "Dr. Meera Kapoor",
  email: "meera@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/women/30.jpg"
});

const doctorUser7 = await User.create({
  name: "Dr. Karthik Rao",
  email: "karthik@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/men/75.jpg"
});

const doctorUser8 = await User.create({
  name: "Dr. Ananya Iyer",
  email: "ananya@medicare.com",
  password: doctorPassword,
  role: "doctor",
  profileImage: "https://randomuser.me/api/portraits/women/22.jpg"
});

    const receptionist = await User.create({
      name: "Priya Sharma",
      email: "reception@medicare.com",
      password: receptionistPassword,
      role: "receptionist",
      profileImage: ""
    });

    const patientUsers = [];

patientUsers.push(await User.create({ name:"Rahul Verma", email:"rahul@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Anjali Reddy", email:"anjali@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Rohit Sharma", email:"rohit@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Sneha Kapoor", email:"sneha@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Kiran Kumar", email:"kiran@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Lakshmi Devi", email:"lakshmi@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Aditya Varma", email:"aditya@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Swathi Rao", email:"swathi@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Naveen Kumar", email:"naveen@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Meena Joshi", email:"meena@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Vikram Patel", email:"vikram@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Priyanka Singh", email:"priyanka@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Harsha Reddy", email:"harsha@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Akhil Krishna", email:"akhil@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Bhavana Rao", email:"bhavana@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Suresh Yadav", email:"suresh@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Divya Nair", email:"divya@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Pooja Sharma", email:"pooja@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Ramesh Naidu", email:"ramesh@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Keerthi Devi", email:"keerthi@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Ajay Mehta", email:"ajay@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Neha Jain", email:"neha@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Sai Krishna", email:"saikrishna@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Anusha Reddy", email:"anusha@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
patientUsers.push(await User.create({ name:"Manoj Kumar", email:"manoj@gmail.com", password:patientPassword, role:"patient", profileImage:"" }));
      

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
    experience: 15,
    qualification: "MD Cardiology",
    fee: 1200,
    rating: 4.9,
    reviewCount: 356,
    availableDays: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    availableTime: "09:00 AM - 05:00 PM"
  },
  {
    user: doctorUser2._id,
    name: doctorUser2.name,
    department: "Neurology",
    experience: 12,
    qualification: "DM Neurology",
    fee: 1500,
    rating: 4.8,
    reviewCount: 288,
    availableDays: ["Monday","Wednesday","Friday"],
    availableTime: "10:00 AM - 06:00 PM"
  },
  {
    user: doctorUser3._id,
    name: doctorUser3.name,
    department: "Orthopedics",
    experience: 10,
    qualification: "MS Orthopedics",
    fee: 1000,
    rating: 4.7,
    reviewCount: 210,
    availableDays: ["Tuesday","Thursday","Saturday"],
    availableTime: "09:30 AM - 04:30 PM"
  },
  {
    user: doctorUser4._id,
    name: doctorUser4.name,
    department: "Pediatrics",
    experience: 8,
    qualification: "MD Pediatrics",
    fee: 900,
    rating: 4.8,
    reviewCount: 180,
    availableDays: ["Monday","Tuesday","Thursday","Friday"],
    availableTime: "08:30 AM - 03:30 PM"
  },
  {
    user: doctorUser5._id,
    name: doctorUser5.name,
    department: "Dermatology",
    experience: 11,
    qualification: "MD Dermatology",
    fee: 800,
    rating: 4.6,
    reviewCount: 165,
    availableDays: ["Monday","Wednesday","Saturday"],
    availableTime: "11:00 AM - 06:00 PM"
  },
  {
    user: doctorUser6._id,
    name: doctorUser6.name,
    department: "Gynecology",
    experience: 13,
    qualification: "MS Obstetrics & Gynecology",
    fee: 1100,
    rating: 4.9,
    reviewCount: 320,
    availableDays: ["Monday","Tuesday","Wednesday","Friday"],
    availableTime: "09:00 AM - 05:00 PM"
  },
  {
    user: doctorUser7._id,
    name: doctorUser7.name,
    department: "ENT",
    experience: 9,
    qualification: "MS ENT",
    fee: 850,
    rating: 4.7,
    reviewCount: 140,
    availableDays: ["Tuesday","Thursday","Saturday"],
    availableTime: "10:00 AM - 04:00 PM"
  },
  {
    user: doctorUser8._id,
    name: doctorUser8.name,
    department: "General Medicine",
    experience: 14,
    qualification: "MD General Medicine",
    fee: 700,
    rating: 4.8,
    reviewCount: 402,
    availableDays: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    availableTime: "08:00 AM - 02:00 PM"
  }
]);

console.log("Doctors Created");

const patients = await Patient.insertMany([
  {
    user: patientUsers[0]._id,
    name: patientUsers[0].name,
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    address: "Hyderabad, Telangana",
    medicalHistory: ["Seasonal Allergy"]
  },
  {
    user: patientUsers[1]._id,
    name: patientUsers[1].name,
    age: 24,
    gender: "Female",
    bloodGroup: "A+",
    address: "Vijayawada, Andhra Pradesh",
    medicalHistory: []
  },
  {
    user: patientUsers[2]._id,
    name: patientUsers[2].name,
    age: 35,
    gender: "Male",
    bloodGroup: "B+",
    address: "Bengaluru, Karnataka",
    medicalHistory: ["Diabetes"]
  },
  {
    user: patientUsers[3]._id,
    name: patientUsers[3].name,
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    address: "Chennai, Tamil Nadu",
    medicalHistory: []
  },
  {
    user: patientUsers[4]._id,
    name: patientUsers[4].name,
    age: 42,
    gender: "Male",
    bloodGroup: "O-",
    address: "Pune, Maharashtra",
    medicalHistory: ["Hypertension"]
  },
  {
    user: patientUsers[5]._id,
    name: patientUsers[5].name,
    age: 37,
    gender: "Female",
    bloodGroup: "B-",
    address: "Visakhapatnam, Andhra Pradesh",
    medicalHistory: []
  },
  {
    user: patientUsers[6]._id,
    name: patientUsers[6].name,
    age: 31,
    gender: "Male",
    bloodGroup: "A+",
    address: "Hyderabad, Telangana",
    medicalHistory: ["Asthma"]
  },
  {
    user: patientUsers[7]._id,
    name: patientUsers[7].name,
    age: 27,
    gender: "Female",
    bloodGroup: "O+",
    address: "Warangal, Telangana",
    medicalHistory: []
  },
  {
    user: patientUsers[8]._id,
    name: patientUsers[8].name,
    age: 45,
    gender: "Male",
    bloodGroup: "AB-",
    address: "Guntur, Andhra Pradesh",
    medicalHistory: ["Thyroid"]
  },
  {
    user: patientUsers[9]._id,
    name: patientUsers[9].name,
    age: 33,
    gender: "Female",
    bloodGroup: "A-",
    address: "Mysuru, Karnataka",
    medicalHistory: []
  },
  {
    user: patientUsers[10]._id,
    name: patientUsers[10].name,
    age: 51,
    gender: "Male",
    bloodGroup: "B+",
    address: "Mumbai, Maharashtra",
    medicalHistory: ["Blood Pressure"]
  },
  {
    user: patientUsers[11]._id,
    name: patientUsers[11].name,
    age: 39,
    gender: "Female",
    bloodGroup: "O+",
    address: "Delhi",
    medicalHistory: []
  },
  {
    user: patientUsers[12]._id,
    name: patientUsers[12].name,
    age: 26,
    gender: "Male",
    bloodGroup: "A+",
    address: "Nellore, Andhra Pradesh",
    medicalHistory: []
  },
  {
    user: patientUsers[13]._id,
    name: patientUsers[13].name,
    age: 30,
    gender: "Male",
    bloodGroup: "O+",
    address: "Tirupati, Andhra Pradesh",
    medicalHistory: ["Migraine"]
  },
  {
    user: patientUsers[14]._id,
    name: patientUsers[14].name,
    age: 34,
    gender: "Female",
    bloodGroup: "B+",
    address: "Kakinada, Andhra Pradesh",
    medicalHistory: []
  },
  {
    user: patientUsers[15]._id,
    name: patientUsers[15].name,
    age: 46,
    gender: "Male",
    bloodGroup: "AB+",
    address: "Rajahmundry, Andhra Pradesh",
    medicalHistory: ["Heart Disease"]
  },
  {
    user: patientUsers[16]._id,
    name: patientUsers[16].name,
    age: 25,
    gender: "Female",
    bloodGroup: "O-",
    address: "Kochi, Kerala",
    medicalHistory: []
  },
  {
    user: patientUsers[17]._id,
    name: patientUsers[17].name,
    age: 36,
    gender: "Female",
    bloodGroup: "A+",
    address: "Hyderabad, Telangana",
    medicalHistory: []
  },
  {
    user: patientUsers[18]._id,
    name: patientUsers[18].name,
    age: 54,
    gender: "Male",
    bloodGroup: "B-",
    address: "Kadapa, Andhra Pradesh",
    medicalHistory: ["Diabetes", "BP"]
  },
  {
    user: patientUsers[19]._id,
    name: patientUsers[19].name,
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    address: "Nizamabad, Telangana",
    medicalHistory: []
  },
  {
    user: patientUsers[20]._id,
    name: patientUsers[20].name,
    age: 32,
    gender: "Male",
    bloodGroup: "O+",
    address: "Bhopal, Madhya Pradesh",
    medicalHistory: []
  },
  {
    user: patientUsers[21]._id,
    name: patientUsers[21].name,
    age: 27,
    gender: "Female",
    bloodGroup: "A-",
    address: "Jaipur, Rajasthan",
    medicalHistory: []
  },
  {
    user: patientUsers[22]._id,
    name: patientUsers[22].name,
    age: 23,
    gender: "Male",
    bloodGroup: "B+",
    address: "Hyderabad, Telangana",
    medicalHistory: []
  },
  {
    user: patientUsers[23]._id,
    name: patientUsers[23].name,
    age: 38,
    gender: "Female",
    bloodGroup: "O+",
    address: "Vijayawada, Andhra Pradesh",
    medicalHistory: ["Anemia"]
  },
  {
    user: patientUsers[24]._id,
    name: patientUsers[24].name,
    age: 41,
    gender: "Male",
    bloodGroup: "AB+",
    address: "Chennai, Tamil Nadu",
    medicalHistory: ["Kidney Stone"]
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

// Find doctors by department
const cardioDoctor = doctors.find(d => d.department === "Cardiology");
const neuroDoctor = doctors.find(d => d.department === "Neurology");
const orthoDoctor = doctors.find(d => d.department === "Orthopedics");
const pediatricDoctor = doctors.find(d => d.department === "Pediatrics");
const dermaDoctor = doctors.find(d => d.department === "Dermatology");
const gynDoctor = doctors.find(d => d.department === "Gynecology");
const entDoctor = doctors.find(d => d.department === "ENT");
const generalDoctor = doctors.find(d => d.department === "General Medicine");

const appointments = [];

function addAppointments(doctor, count, reasons) {

  for (let i = 0; i < count; i++) {

    appointments.push({

      patient: patients[(appointments.length) % patients.length]._id,

      doctor: doctor._id,

      date: `2026-07-${String((appointments.length % 28) + 1).padStart(2, "0")}`,

      time: [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "03:00 PM"
      ][i % 6],

      status: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
      ][i % 4],

      reason: reasons[i % reasons.length]

    });

  }

}

// Cardiology (8)
addAppointments(cardioDoctor,8,[
"Chest Pain",
"High Blood Pressure",
"Heart Checkup",
"Palpitations",
"Shortness of Breath",
"ECG Review",
"Hypertension",
"Heart Disease Follow-up"
]);

// Neurology (7)
addAppointments(neuroDoctor,7,[
"Migraine",
"Headache",
"Memory Loss",
"Dizziness",
"Nerve Pain",
"Stroke Follow-up",
"Epilepsy Review"
]);

// Orthopedics (7)
addAppointments(orthoDoctor,7,[
"Knee Pain",
"Back Pain",
"Fracture Review",
"Joint Pain",
"Shoulder Pain",
"Arthritis",
"Sports Injury"
]);

// Pediatrics (6)
addAppointments(pediatricDoctor,6,[
"Fever",
"Cold & Cough",
"Vaccination",
"Child Checkup",
"Stomach Infection",
"Skin Rash"
]);

// Dermatology (6)
addAppointments(dermaDoctor,6,[
"Acne",
"Skin Allergy",
"Hair Fall",
"Fungal Infection",
"Psoriasis",
"Eczema"
]);

// Gynecology (6)
addAppointments(gynDoctor,6,[
"Pregnancy Checkup",
"PCOS Consultation",
"Menstrual Problems",
"Routine Checkup",
"Ultrasound Review",
"Infertility Consultation"
]);

// ENT (5)
addAppointments(entDoctor,5,[
"Sinus Infection",
"Ear Pain",
"Throat Infection",
"Hearing Problem",
"Nose Bleeding"
]);

// General Medicine (5)
addAppointments(generalDoctor,5,[
"General Checkup",
"Diabetes Follow-up",
"Typhoid Review",
"Viral Fever",
"Routine Health Check"
]);

const createdAppointments = await Appointment.insertMany(appointments);

console.log(`${createdAppointments.length} Appointments Created`);

// ======================================
// PRESCRIPTIONS
// ======================================

const prescriptions = [];

for (const appointment of createdAppointments) {

  const doctor = doctors.find(
    d => d._id.toString() === appointment.doctor.toString()
  );

  let medicines = [];
  let notes = "";

  switch (doctor.department) {

    case "Cardiology":
      medicines = [
        {
          name: "Aspirin",
          dosage: "75 mg",
          duration: "30 Days",
          frequency: "1-0-0"
        },
        {
          name: "Atorvastatin",
          dosage: "10 mg",
          duration: "30 Days",
          frequency: "0-0-1"
        }
      ];
      notes = "Reduce salt intake and walk daily.";
      break;

    case "Neurology":
      medicines = [
        {
          name: "Sumatriptan",
          dosage: "50 mg",
          duration: "10 Days",
          frequency: "1-0-1"
        },
        {
          name: "Vitamin B12",
          dosage: "1 Tablet",
          duration: "30 Days",
          frequency: "0-1-0"
        }
      ];
      notes = "Avoid stress and get adequate sleep.";
      break;

    case "Orthopedics":
      medicines = [
        {
          name: "Ibuprofen",
          dosage: "400 mg",
          duration: "7 Days",
          frequency: "1-1-1"
        },
        {
          name: "Calcium Tablet",
          dosage: "500 mg",
          duration: "30 Days",
          frequency: "0-1-0"
        }
      ];
      notes = "Avoid lifting heavy objects.";
      break;

    case "Pediatrics":
      medicines = [
        {
          name: "Paracetamol Syrup",
          dosage: "5 ml",
          duration: "5 Days",
          frequency: "1-1-1"
        }
      ];
      notes = "Ensure proper hydration.";
      break;

    case "Dermatology":
      medicines = [
        {
          name: "Cetirizine",
          dosage: "10 mg",
          duration: "7 Days",
          frequency: "0-0-1"
        },
        {
          name: "Hydrocortisone Cream",
          dosage: "Apply Twice Daily",
          duration: "10 Days",
          frequency: "Morning & Night"
        }
      ];
      notes = "Keep the affected area clean and dry.";
      break;

    case "Gynecology":
      medicines = [
        {
          name: "Folic Acid",
          dosage: "5 mg",
          duration: "30 Days",
          frequency: "1-0-0"
        },
        {
          name: "Iron Tablet",
          dosage: "1 Tablet",
          duration: "30 Days",
          frequency: "0-1-0"
        }
      ];
      notes = "Maintain a balanced diet and regular follow-up.";
      break;

    case "ENT":
      medicines = [
        {
          name: "Azithromycin",
          dosage: "500 mg",
          duration: "5 Days",
          frequency: "1-0-0"
        }
      ];
      notes = "Avoid cold beverages.";
      break;

    default:
      medicines = [
        {
          name: "Paracetamol",
          dosage: "650 mg",
          duration: "5 Days",
          frequency: "1-0-1"
        },
        {
          name: "Vitamin C",
          dosage: "500 mg",
          duration: "10 Days",
          frequency: "0-1-0"
        }
      ];
      notes = "Drink plenty of fluids and take adequate rest.";
  }

  prescriptions.push({
    patient: appointment.patient,
    doctor: appointment.doctor,
    appointment: appointment._id,
    medicines,
    notes,
    date: appointment.date
  });

}

await Prescription.insertMany(prescriptions);

console.log(`${prescriptions.length} Prescriptions Created`);

// ======================================
// BILLS
// ======================================

const bills = [];

for (const prescription of prescriptions) {

  const appointment = createdAppointments.find(
    a => a._id.toString() === prescription.appointment.toString()
  );

  const doctor = doctors.find(
    d => d._id.toString() === prescription.doctor.toString()
  );

  const consultationFee = doctor.fee;

  // Medicine charges
  const medicineFee = Math.floor(Math.random() * 700) + 300;

  // Only some patients require lab tests
  const labFee =
    ["Cardiology", "Neurology", "General Medicine"].includes(doctor.department)
      ? Math.floor(Math.random() * 1000) + 500
      : 0;

  // Only some patients are admitted
  const roomCharges =
    Math.random() > 0.7
      ? Math.floor(Math.random() * 5000) + 2000
      : 0;

  const subtotal =
    consultationFee +
    medicineFee +
    labFee +
    roomCharges;

  const tax = Math.round(subtotal * 0.05);

  bills.push({

    patient: prescription.patient,

    appointment: prescription.appointment,

    consultationFee,

    medicineFee,

    labFee,

    roomCharges,

    tax,

    total: subtotal + tax,

    status: Math.random() > 0.35 ? "Paid" : "Pending",

    date: prescription.date

  });

}

await Bill.insertMany(bills);

console.log(`${bills.length} Bills Created`);

// ======================================
// REPORTS
// ======================================

const reports = [];

for (const appointment of createdAppointments) {

  const doctor = doctors.find(
    d => d._id.toString() === appointment.doctor.toString()
  );

  let testName = "";
  let result = "";
  let status = "Completed";

  switch (doctor.department) {

    case "Cardiology":
      testName = ["ECG", "Lipid Profile", "2D Echo"][Math.floor(Math.random()*3)];
      result = [
        "Normal ECG",
        "Mild Hypertension",
        "Elevated Cholesterol"
      ][Math.floor(Math.random()*3)];
      break;

    case "Neurology":
      testName = ["MRI", "CT Scan", "EEG"][Math.floor(Math.random()*3)];
      result = [
        "No Abnormalities",
        "Migraine Detected",
        "Minor Nerve Compression"
      ][Math.floor(Math.random()*3)];
      break;

    case "Orthopedics":
      testName = ["X-Ray", "Bone Density Test", "MRI"];
      result = [
        "Minor Fracture",
        "Arthritis",
        "Normal Bones"
      ][Math.floor(Math.random()*3)];
      break;

    case "Pediatrics":
      testName = ["Blood Test", "Urine Test", "CBC"][Math.floor(Math.random()*3)];
      result = [
        "Viral Fever",
        "Normal",
        "Mild Infection"
      ][Math.floor(Math.random()*3)];
      break;

    case "Dermatology":
      testName = ["Skin Allergy Test", "Biopsy", "Skin Scraping"][Math.floor(Math.random()*3)];
      result = [
        "Fungal Infection",
        "Allergy Positive",
        "Normal"
      ][Math.floor(Math.random()*3)];
      break;

    case "Gynecology":
      testName = ["Ultrasound", "Blood Test", "Hormone Test"][Math.floor(Math.random()*3)];
      result = [
        "Normal",
        "PCOS Detected",
        "Vitamin Deficiency"
      ][Math.floor(Math.random()*3)];
      break;

    case "ENT":
      testName = ["Hearing Test", "Nasal Endoscopy", "Throat Swab"][Math.floor(Math.random()*3)];
      result = [
        "Ear Infection",
        "Normal",
        "Sinusitis"
      ][Math.floor(Math.random()*3)];
      break;

    default:
      testName = ["Blood Test", "Thyroid Profile", "Sugar Test"][Math.floor(Math.random()*3)];
      result = [
        "Normal",
        "High Blood Sugar",
        "Thyroid Normal"
      ][Math.floor(Math.random()*3)];
  }

  reports.push({

    patient: appointment.patient,

    testName,

    date: appointment.date,

    status,

    result,

    fileUrl: ""

  });

}

await Report.insertMany(reports);

console.log(`${reports.length} Reports Created`);



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