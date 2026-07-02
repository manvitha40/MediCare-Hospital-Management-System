const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');

// Controllers
const authController = require('../controllers/authController');
const hmsController = require('../controllers/hmsController');
const seedController = require('../controllers/seedController');
const initController = require('../controllers/initController');

// ==========================================
// 1. AUTH ROUTES
// ==========================================
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', auth, authController.getMe);
router.put('/auth/profile', auth, authController.updateProfile);

// ==========================================
// 2. DOCTOR ROUTES
// ==========================================
router.get('/doctors', hmsController.getDoctors);
router.get('/doctors/:id', auth, hmsController.getDoctorById);
router.post('/doctors', auth, authorize(['admin']), hmsController.createDoctor);
router.put('/doctors/:id', auth, authorize(['admin', 'doctor']), hmsController.updateDoctor);
router.delete('/doctors/:id', auth, authorize(['admin']), hmsController.deleteDoctor);

// ==========================================
// 3. PATIENT ROUTES
// ==========================================
router.get('/patients', auth, authorize(['admin', 'doctor', 'receptionist']), hmsController.getPatients);
router.get('/patients/:id', auth, hmsController.getPatientById);
router.post('/patients', auth, authorize(['admin', 'receptionist']), hmsController.createPatient);
router.put('/patients/:id', auth, authorize(['admin', 'receptionist', 'patient']), hmsController.updatePatient);
router.delete('/patients/:id', auth, authorize(['admin']), hmsController.deletePatient);

// ==========================================
// 4. DEPARTMENT ROUTES
// ==========================================
router.get('/departments', hmsController.getDepartments);
router.post('/departments', auth, authorize(['admin']), hmsController.createDepartment);
router.delete('/departments/:name', auth, authorize(['admin']), hmsController.deleteDepartment);

// ==========================================
// 5. APPOINTMENT ROUTES
// ==========================================
router.get('/appointments', auth, hmsController.getAppointments);
router.post('/appointments', auth, authorize(['patient', 'receptionist', 'admin']), hmsController.createAppointment);
router.put('/appointments/:id', auth, authorize(['doctor', 'receptionist', 'admin']), hmsController.updateAppointmentStatus);

// ==========================================
// 6. PRESCRIPTION ROUTES
// ==========================================
router.get('/prescriptions', auth, hmsController.getPrescriptions);
router.post('/prescriptions', auth, authorize(['doctor']), hmsController.createPrescription);

// ==========================================
// 7. MEDICINE ROUTES
// ==========================================
router.get('/medicines', auth, hmsController.getMedicines);
router.post('/medicines', auth, authorize(['admin', 'receptionist']), hmsController.createMedicine);
router.put('/medicines/:id', auth, authorize(['admin']), hmsController.updateMedicine);
router.delete('/medicines/:id', auth, authorize(['admin']), hmsController.deleteMedicine);

// ==========================================
// 8. ROOM ROUTES
// ==========================================
router.get('/rooms', auth, hmsController.getRooms);
router.put('/rooms/:roomNumber', auth, authorize(['admin', 'receptionist']), hmsController.updateRoom);

// ==========================================
// 9. BILLING ROUTES
// ==========================================
router.get('/bills', auth, hmsController.getBills);
router.post('/bills', auth, authorize(['admin', 'receptionist']), hmsController.createBill);
router.put('/bills/:id/pay', auth, hmsController.payBill);

// ==========================================
// 10. LAB REPORT ROUTES
// ==========================================
router.get('/reports', auth, hmsController.getReports);
router.post('/reports', auth, authorize(['admin', 'doctor', 'receptionist']), hmsController.createReport);
router.get('/seed', seedController.seedDatabase);
router.get('/init', initController.initDatabase);
module.exports = router;
