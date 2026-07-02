import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  FolderHeart, 
  Pill, 
  Bed, 
  Receipt, 
  FileCheck, 
  Settings, 
  Calendar, 
  ClipboardList, 
  UserSquare2, 
  PlusCircle, 
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  const menuItems = {
    admin: [
      { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
      { path: '/admin/patients', label: 'Patients', icon: Users },
      { path: '/admin/departments', label: 'Departments', icon: FolderHeart },
      { path: '/admin/medicines', label: 'Medicines', icon: Pill },
      { path: '/admin/rooms', label: 'Rooms', icon: Bed },
      { path: '/admin/billing', label: 'Billing', icon: Receipt },
      { path: '/admin/reports', label: 'Reports', icon: FileCheck },
      { path: '/admin/settings', label: 'Settings', icon: Settings },
    ],
    doctor: [
      { path: '/doctor', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/doctor/appointments', label: 'Appointments', icon: Calendar },
      { path: '/doctor/prescriptions', label: 'Prescriptions', icon: ClipboardList },
      { path: '/doctor/reports', label: 'Reports', icon: FileCheck },
      { path: '/doctor/profile', label: 'Profile', icon: UserSquare2 },
      { path: '/doctor/settings', label: 'Settings', icon: Settings },
    ],
    receptionist: [
      { path: '/receptionist', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/receptionist/patients', label: 'Patients', icon: Users },
      { path: '/receptionist/appointments', label: 'Appointments', icon: Calendar },
      { path: '/receptionist/billing', label: 'Billing', icon: Receipt },
      { path: '/receptionist/rooms', label: 'Rooms', icon: Bed },
      { path: '/receptionist/settings', label: 'Settings', icon: Settings },
    ],
    patient: [
      { path: '/patient', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { path: '/patient/book', label: 'Book Appointment', icon: PlusCircle },
      { path: '/patient/appointments', label: 'My Appointments', icon: Calendar },
      { path: '/patient/records', label: 'Medical Records', icon: ClipboardList },
      { path: '/patient/profile', label: 'Profile', icon: UserSquare2 },
      { path: '/patient/settings', label: 'Settings', icon: Settings },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Activity size={28} />
        <span>MediCare HMS</span>
      </div>

      <ul className="sidebar-menu">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path} className="sidebar-item">
              <NavLink 
                to={item.path} 
                end={item.end}
                className={({ isActive }) => isActive ? 'active' : ''}
                style={{ textDecoration: 'none' }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          MediCare v1.0.0
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
