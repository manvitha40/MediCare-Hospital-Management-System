import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminDoctors from './pages/admin/Doctors';
import AdminPatients from './pages/admin/Patients';
import AdminDepartments from './pages/admin/Departments';
import AdminMedicines from './pages/admin/Medicines';
import AdminRooms from './pages/admin/Rooms';
import AdminBilling from './pages/admin/Billing';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPrescriptions from './pages/doctor/Prescriptions';
import DoctorReports from './pages/doctor/Reports';
import DoctorProfile from './pages/doctor/Profile';
import DoctorSettings from './pages/doctor/Settings';

// Receptionist Pages
import ReceptionistDashboard from './pages/receptionist/Dashboard';
import ReceptionistPatients from './pages/receptionist/Patients';
import ReceptionistAppointments from './pages/receptionist/Appointments';
import ReceptionistBilling from './pages/receptionist/Billing';
import ReceptionistRooms from './pages/receptionist/Rooms';
import ReceptionistSettings from './pages/receptionist/Settings';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import PatientBookWizard from './pages/patient/BookWizard';
import PatientAppointments from './pages/patient/Appointments';
import PatientMedicalRecords from './pages/patient/MedicalRecords';
import PatientProfile from './pages/patient/Profile';
import PatientSettings from './pages/patient/Settings';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Dashboards */}
          <Route path="/admin" element={<DashboardLayout allowedRoles={['admin']} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="medicines" element={<AdminMedicines />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="billing" element={<AdminBilling />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Doctor Dashboards */}
          <Route path="/doctor" element={<DashboardLayout allowedRoles={['doctor']} />}>
            <Route index element={<DoctorDashboard />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="prescriptions" element={<DoctorPrescriptions />} />
            <Route path="reports" element={<DoctorReports />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="settings" element={<DoctorSettings />} />
          </Route>

          {/* Receptionist Dashboards */}
          <Route path="/receptionist" element={<DashboardLayout allowedRoles={['receptionist']} />}>
            <Route index element={<ReceptionistDashboard />} />
            <Route path="patients" element={<ReceptionistPatients />} />
            <Route path="appointments" element={<ReceptionistAppointments />} />
            <Route path="billing" element={<ReceptionistBilling />} />
            <Route path="rooms" element={<ReceptionistRooms />} />
            <Route path="settings" element={<ReceptionistSettings />} />
          </Route>

          {/* Patient Dashboards */}
          <Route path="/patient" element={<DashboardLayout allowedRoles={['patient']} />}>
            <Route index element={<PatientDashboard />} />
            <Route path="book" element={<PatientBookWizard />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="records" element={<PatientMedicalRecords />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="settings" element={<PatientSettings />} />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
