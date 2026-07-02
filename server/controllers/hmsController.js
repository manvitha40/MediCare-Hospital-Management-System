const bcrypt = require('bcryptjs');
const mockDb = require('../utils/mockDb');

// MongoDB Models
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

// Helper to populate user details on doctor/patient in Mock DB mode
const populateMockUser = (docOrPat, isDoctor = true) => {
  if (!docOrPat) return null;
  const user = mockDb.findById('users', docOrPat.user);
  if (user) {
    return {
      ...docOrPat,
      email: user.email,
      profileImage: user.profileImage || ''
    };
  }
  return docOrPat;
};

// ==========================================
// 1. DOCTORS CONTROLLER
// ==========================================
const getDoctors = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      let doctors = mockDb.find('doctors');
      const populated = doctors.map(d => populateMockUser(d, true));
      return res.json(populated);
    } else {
      const doctors = await Doctor.find().populate('user', '-password');
      return res.json(doctors);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const doctor = mockDb.findById('doctors', req.params.id);
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      return res.json(populateMockUser(doctor, true));
    } else {
      const doctor = await Doctor.findById(req.params.id).populate('user', '-password');
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      return res.json(doctor);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error: error.message });
  }
};

const createDoctor = async (req, res) => {
  const { name, email, password, department, experience, qualification, fee, availableDays, availableTime } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password || 'doctor123', 10);
    
    if (process.env.USE_MOCK_DB === 'true') {
      // Check if user exists
      const exists = mockDb.findOne('users', { email });
      if (exists) return res.status(400).json({ message: 'Email already exists' });

      const newUser = mockDb.create('users', {
        name,
        email,
        password: hashedPassword,
        role: 'doctor',
        profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
      });

      const newDoctor = mockDb.create('doctors', {
        user: newUser._id,
        name,
        department,
        experience: Number(experience) || 0,
        qualification,
        fee: Number(fee) || 0,
        availableDays: availableDays || ['Monday', 'Wednesday', 'Friday'],
        availableTime: availableTime || '09:00 AM - 05:00 PM'
      });

      return res.status(201).json(populateMockUser(newDoctor, true));
    } else {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: 'Email already exists' });

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'doctor',
        profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
      });
      const savedUser = await user.save();

      const doctor = new Doctor({
        user: savedUser._id,
        name,
        department,
        experience: Number(experience),
        qualification,
        fee: Number(fee),
        availableDays,
        availableTime
      });
      const savedDoctor = await doctor.save();
      return res.status(201).json(savedDoctor);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating doctor', error: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const updated = mockDb.findByIdAndUpdate('doctors', req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Doctor not found' });
      return res.json(populateMockUser(updated, true));
    } else {
      const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Doctor not found' });
      return res.json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const doc = mockDb.findById('doctors', req.params.id);
      if (!doc) return res.status(404).json({ message: 'Doctor not found' });
      mockDb.findByIdAndDelete('users', doc.user);
      mockDb.findByIdAndDelete('doctors', req.params.id);
      return res.json({ message: 'Doctor deleted successfully' });
    } else {
      const doc = await Doctor.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Doctor not found' });
      await User.findByIdAndDelete(doc.user);
      await Doctor.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Doctor deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error: error.message });
  }
};

// ==========================================
// 2. PATIENTS CONTROLLER
// ==========================================
const getPatients = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const patients = mockDb.find('patients');
      const populated = patients.map(p => populateMockUser(p, false));
      return res.json(populated);
    } else {
      const patients = await Patient.find().populate('user', '-password');
      return res.json(patients);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const patient = mockDb.findById('patients', req.params.id);
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      return res.json(populateMockUser(patient, false));
    } else {
      const patient = await Patient.findById(req.params.id).populate('user', '-password');
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      return res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

const createPatient = async (req, res) => {
  const { name, email, password, age, gender, bloodGroup, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password || 'patient123', 10);
    if (process.env.USE_MOCK_DB === 'true') {
      const exists = mockDb.findOne('users', { email });
      if (exists) return res.status(400).json({ message: 'Email already exists' });

      const newUser = mockDb.create('users', {
        name,
        email,
        password: hashedPassword,
        role: 'patient',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      });

      const newPatient = mockDb.create('patients', {
        user: newUser._id,
        name,
        age: Number(age) || 30,
        gender,
        bloodGroup,
        address,
        medicalHistory: []
      });
      return res.status(201).json(populateMockUser(newPatient, false));
    } else {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: 'Email already exists' });

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: 'patient',
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      });
      const savedUser = await user.save();

      const patient = new Patient({
        user: savedUser._id,
        name,
        age: Number(age),
        gender,
        bloodGroup,
        address,
        medicalHistory: []
      });
      const savedPatient = await patient.save();
      return res.status(201).json(savedPatient);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const updated = mockDb.findByIdAndUpdate('patients', req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Patient not found' });
      return res.json(populateMockUser(updated, false));
    } else {
      const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Patient not found' });
      return res.json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const pat = mockDb.findById('patients', req.params.id);
      if (!pat) return res.status(404).json({ message: 'Patient not found' });
      mockDb.findByIdAndDelete('users', pat.user);
      mockDb.findByIdAndDelete('patients', req.params.id);
      return res.json({ message: 'Patient deleted successfully' });
    } else {
      const pat = await Patient.findById(req.params.id);
      if (!pat) return res.status(404).json({ message: 'Patient not found' });
      await User.findByIdAndDelete(pat.user);
      await Patient.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Patient deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

// ==========================================
// 3. DEPARTMENTS CONTROLLER
// ==========================================
const getDepartments = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      return res.json(mockDb.find('departments'));
    } else {
      return res.json(await Department.find());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

const createDepartment = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const exists = mockDb.findOne('departments', { name });
      if (exists) return res.status(400).json({ message: 'Department already exists' });
      const dep = mockDb.create('departments', { name, description, status: 'Active' });
      return res.status(201).json(dep);
    } else {
      const exists = await Department.findOne({ name });
      if (exists) return res.status(400).json({ message: 'Department already exists' });
      const dep = new Department({ name, description });
      return res.status(201).json(await dep.save());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const dep = mockDb.findOne('departments', { name: req.params.name });
      if (!dep) return res.status(404).json({ message: 'Department not found' });
      mockDb.findByIdAndDelete('departments', dep._id);
      return res.json({ message: 'Department deleted successfully' });
    } else {
      const deleted = await Department.findOneAndDelete({ name: req.params.name });
      if (!deleted) return res.status(404).json({ message: 'Department not found' });
      return res.json({ message: 'Department deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};

// ==========================================
// 4. APPOINTMENTS CONTROLLER
// ==========================================
const getAppointments = async (req, res) => {
  try {
    const { role, id } = req.user;
    
    if (process.env.USE_MOCK_DB === 'true') {
      let appointments = mockDb.find('appointments');
      
      // Filter by role
      if (role === 'patient') {
        const patient = mockDb.findOne('patients', { user: id });
        appointments = appointments.filter(a => a.patient === patient?._id);
      } else if (role === 'doctor') {
        const doctor = mockDb.findOne('doctors', { user: id });
        appointments = appointments.filter(a => a.doctor === doctor?._id);
      }

      // Populate Doctor and Patient manually
      const populated = appointments.map(app => {
        const doc = mockDb.findById('doctors', app.doctor);
        const pat = mockDb.findById('patients', app.patient);
        return {
          ...app,
          doctor: doc ? populateMockUser(doc, true) : null,
          patient: pat ? populateMockUser(pat, false) : null
        };
      });

      return res.json(populated);
    } else {
      let query = {};
      if (role === 'patient') {
        const patient = await Patient.findOne({ user: id });
        query.patient = patient?._id;
      } else if (role === 'doctor') {
        const doctor = await Doctor.findOne({ user: id });
        query.doctor = doctor?._id;
      }

      const appointments = await Appointment.find(query)
        .populate({ path: 'doctor', populate: { path: 'user', select: '-password' } })
        .populate({ path: 'patient', populate: { path: 'user', select: '-password' } });

      return res.json(appointments);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

const createAppointment = async (req, res) => {
  const { doctorId, date, time, reason, patientId } = req.body;
  try {
    let finalPatientId = patientId;
    
    // If patient books it themselves, fetch their patient profile ID from user ID
    if (req.user.role === 'patient') {
      if (process.env.USE_MOCK_DB === 'true') {
        const pat = mockDb.findOne('patients', { user: req.user.id });
        finalPatientId = pat?._id;
      } else {
        const pat = await Patient.findOne({ user: req.user.id });
        finalPatientId = pat?._id;
      }
    }

    if (!finalPatientId) {
      return res.status(400).json({ message: 'Valid Patient profile ID is required' });
    }

    if (process.env.USE_MOCK_DB === 'true') {
      const app = mockDb.create('appointments', {
        patient: finalPatientId,
        doctor: doctorId,
        date,
        time,
        status: 'Pending',
        reason
      });
      return res.status(201).json(app);
    } else {
      const app = new Appointment({
        patient: finalPatientId,
        doctor: doctorId,
        date,
        time,
        status: 'Pending',
        reason
      });
      return res.status(201).json(await app.save());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const app = mockDb.findByIdAndUpdate('appointments', req.params.id, { status });
      if (!app) return res.status(404).json({ message: 'Appointment not found' });
      return res.json(app);
    } else {
      const app = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!app) return res.status(404).json({ message: 'Appointment not found' });
      return res.json(app);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment status', error: error.message });
  }
};

// ==========================================
// 5. PRESCRIPTIONS CONTROLLER
// ==========================================
const getPrescriptions = async (req, res) => {
  try {
    const { role, id } = req.user;
    
    if (process.env.USE_MOCK_DB === 'true') {
      let prescriptions = mockDb.find('prescriptions');
      
      if (role === 'patient') {
        const patient = mockDb.findOne('patients', { user: id });
        prescriptions = prescriptions.filter(p => p.patient === patient?._id);
      } else if (role === 'doctor') {
        const doctor = mockDb.findOne('doctors', { user: id });
        prescriptions = prescriptions.filter(p => p.doctor === doctor?._id);
      }

      const populated = prescriptions.map(pr => {
        const doc = mockDb.findById('doctors', pr.doctor);
        const pat = mockDb.findById('patients', pr.patient);
        return {
          ...pr,
          doctor: doc ? populateMockUser(doc, true) : null,
          patient: pat ? populateMockUser(pat, false) : null
        };
      });
      return res.json(populated);
    } else {
      let query = {};
      if (role === 'patient') {
        const patient = await Patient.findOne({ user: id });
        query.patient = patient?._id;
      } else if (role === 'doctor') {
        const doctor = await Doctor.findOne({ user: id });
        query.doctor = doctor?._id;
      }

      const prescriptions = await Prescription.find(query)
        .populate({ path: 'doctor', populate: { path: 'user', select: '-password' } })
        .populate({ path: 'patient', populate: { path: 'user', select: '-password' } });

      return res.json(prescriptions);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
  }
};

const createPrescription = async (req, res) => {
  const { appointmentId, medicines, notes } = req.body;
  try {
    let appointment;
    if (process.env.USE_MOCK_DB === 'true') {
      appointment = mockDb.findById('appointments', appointmentId);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

      // Create prescription
      const pr = mockDb.create('prescriptions', {
        appointment: appointmentId,
        patient: appointment.patient,
        doctor: appointment.doctor,
        medicines,
        notes,
        date: new Date().toISOString().split('T')[0]
      });

      // Complete the appointment
      mockDb.findByIdAndUpdate('appointments', appointmentId, { status: 'Completed' });

      return res.status(201).json(pr);
    } else {
      appointment = await Appointment.findById(appointmentId);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

      const pr = new Prescription({
        appointment: appointmentId,
        patient: appointment.patient,
        doctor: appointment.doctor,
        medicines,
        notes
      });
      const saved = await pr.save();

      // Complete appointment
      appointment.status = 'Completed';
      await appointment.save();

      return res.status(201).json(saved);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error writing prescription', error: error.message });
  }
};

// ==========================================
// 6. MEDICINES CONTROLLER
// ==========================================
const getMedicines = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      return res.json(mockDb.find('medicines'));
    } else {
      return res.json(await Medicine.find());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicines', error: error.message });
  }
};

const createMedicine = async (req, res) => {
  const { name, price, stock, expiryDate, supplier } = req.body;
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const exists = mockDb.findOne('medicines', { name });
      if (exists) return res.status(400).json({ message: 'Medicine already exists' });
      const med = mockDb.create('medicines', {
        name,
        price: Number(price),
        stock: Number(stock),
        expiryDate,
        supplier
      });
      return res.status(201).json(med);
    } else {
      const exists = await Medicine.findOne({ name });
      if (exists) return res.status(400).json({ message: 'Medicine already exists' });
      const med = new Medicine({ name, price, stock, expiryDate, supplier });
      return res.status(201).json(await med.save());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating medicine', error: error.message });
  }
};

const updateMedicine = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const updated = mockDb.findByIdAndUpdate('medicines', req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Medicine not found' });
      return res.json(updated);
    } else {
      const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Medicine not found' });
      return res.json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating medicine', error: error.message });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const deleted = mockDb.findByIdAndDelete('medicines', req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Medicine not found' });
      return res.json({ message: 'Medicine deleted successfully' });
    } else {
      const deleted = await Medicine.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Medicine not found' });
      return res.json({ message: 'Medicine deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medicine', error: error.message });
  }
};

// ==========================================
// 7. ROOMS CONTROLLER
// ==========================================
const getRooms = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const rooms = mockDb.find('rooms');
      const populated = rooms.map(r => {
        const pat = r.patient ? mockDb.findById('patients', r.patient) : null;
        return {
          ...r,
          patient: pat ? populateMockUser(pat, false) : null
        };
      });
      return res.json(populated);
    } else {
      return res.json(await Room.find().populate({ path: 'patient', populate: { path: 'user', select: '-password' } }));
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error: error.message });
  }
};

const updateRoom = async (req, res) => {
  const { status, patientId } = req.body;
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const room = mockDb.findOne('rooms', { roomNumber: req.params.roomNumber });
      if (!room) return res.status(404).json({ message: 'Room not found' });
      
      const updateData = { status };
      updateData.patient = patientId || null;
      
      const updated = mockDb.findByIdAndUpdate('rooms', room._id, updateData);
      return res.json(updated);
    } else {
      const room = await Room.findOne({ roomNumber: req.params.roomNumber });
      if (!room) return res.status(404).json({ message: 'Room not found' });

      room.status = status;
      room.patient = patientId || null;
      return res.json(await room.save());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating room', error: error.message });
  }
};

// ==========================================
// 8. BILLING CONTROLLER
// ==========================================
const getBills = async (req, res) => {
  try {
    const { role, id } = req.user;
    
    if (process.env.USE_MOCK_DB === 'true') {
      let bills = mockDb.find('bills');
      if (role === 'patient') {
        const patient = mockDb.findOne('patients', { user: id });
        bills = bills.filter(b => b.patient === patient?._id);
      }
      
      const populated = bills.map(b => {
        const pat = mockDb.findById('patients', b.patient);
        return {
          ...b,
          patient: pat ? populateMockUser(pat, false) : null
        };
      });
      return res.json(populated);
    } else {
      let query = {};
      if (role === 'patient') {
        const patient = await Patient.findOne({ user: id });
        query.patient = patient?._id;
      }
      const bills = await Bill.find(query).populate({ path: 'patient', populate: { path: 'user', select: '-password' } });
      return res.json(bills);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills', error: error.message });
  }
};

const createBill = async (req, res) => {
  const { patientId, appointmentId, consultationFee, medicineFee, labFee, roomCharges } = req.body;
  try {
    const subtotal = Number(consultationFee || 0) + Number(medicineFee || 0) + Number(labFee || 0) + Number(roomCharges || 0);
    const tax = Math.round(subtotal * 0.15 * 100) / 100; // 15% tax
    const total = subtotal + tax;

    if (process.env.USE_MOCK_DB === 'true') {
      const bill = mockDb.create('bills', {
        patient: patientId,
        appointment: appointmentId || null,
        consultationFee: Number(consultationFee || 0),
        medicineFee: Number(medicineFee || 0),
        labFee: Number(labFee || 0),
        roomCharges: Number(roomCharges || 0),
        tax,
        total,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      });
      return res.status(201).json(bill);
    } else {
      const bill = new Bill({
        patient: patientId,
        appointment: appointmentId,
        consultationFee,
        medicineFee,
        labFee,
        roomCharges,
        tax,
        total,
        status: 'Pending'
      });
      return res.status(201).json(await bill.save());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating bill', error: error.message });
  }
};

const payBill = async (req, res) => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const bill = mockDb.findByIdAndUpdate('bills', req.params.id, { status: 'Paid' });
      if (!bill) return res.status(404).json({ message: 'Bill not found' });
      return res.json(bill);
    } else {
      const bill = await Bill.findByIdAndUpdate(req.params.id, { status: 'Paid' }, { new: true });
      if (!bill) return res.status(404).json({ message: 'Bill not found' });
      return res.json(bill);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

// ==========================================
// 9. LAB REPORTS CONTROLLER
// ==========================================
const getReports = async (req, res) => {
  try {
    const { role, id } = req.user;
    if (process.env.USE_MOCK_DB === 'true') {
      let reports = mockDb.find('reports');
      if (role === 'patient') {
        const patient = mockDb.findOne('patients', { user: id });
        reports = reports.filter(r => r.patient === patient?._id);
      }
      const populated = reports.map(r => {
        const pat = mockDb.findById('patients', r.patient);
        return {
          ...r,
          patient: pat ? populateMockUser(pat, false) : null
        };
      });
      return res.json(populated);
    } else {
      let query = {};
      if (role === 'patient') {
        const patient = await Patient.findOne({ user: id });
        query.patient = patient?._id;
      }
      return res.json(await Report.find(query).populate({ path: 'patient', populate: { path: 'user', select: '-password' } }));
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

const createReport = async (req, res) => {
  const { patientId, testName, result, fileUrl, status } = req.body;
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      const rep = mockDb.create('reports', {
        patient: patientId,
        testName,
        result: result || 'Analysis in progress',
        fileUrl: fileUrl || `/uploads/${testName.toLowerCase().replace(' ', '_')}_report.pdf`,
        status: status || 'Completed',
        date: new Date().toISOString().split('T')[0]
      });
      return res.status(201).json(rep);
    } else {
      const rep = new Report({
        patient: patientId,
        testName,
        result,
        fileUrl: fileUrl || `/uploads/${testName.toLowerCase().replace(' ', '_')}_report.pdf`,
        status: status || 'Completed'
      });
      return res.status(201).json(await rep.save());
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};

module.exports = {
  // Doctors
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  // Patients
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  // Departments
  getDepartments,
  createDepartment,
  deleteDepartment,
  // Appointments
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  // Prescriptions
  getPrescriptions,
  createPrescription,
  // Medicines
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  // Rooms
  getRooms,
  updateRoom,
  // Bills
  getBills,
  createBill,
  payBill,
  // Reports
  getReports,
  createReport
};
