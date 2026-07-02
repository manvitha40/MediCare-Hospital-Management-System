import React, { useState, useEffect } from 'react';
import { Users, Calendar, BedDouble, Receipt, Clock, Activity } from 'lucide-react';
import { api } from '../../services/api';
import StatCard from '../../components/common/StatCard';
import { Link } from 'react-router-dom';

const ReceptionDashboard = () => {
  const [stats, setStats] = useState({
    patientsCount: 0,
    todayAppointments: 0,
    availableRooms: 0
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [pats, apps, rooms] = await Promise.all([
          api.get('/api/patients'),
          api.get('/api/appointments'),
          api.get('/api/rooms')
        ]);

        const todayStr = new Date().toISOString().split('T')[0];
        const todayApps = apps.filter(a => a.date === todayStr);
        const vacantRooms = rooms.filter(r => r.status === 'Available');

        setStats({
          patientsCount: pats.length,
          todayAppointments: todayApps.length,
          availableRooms: vacantRooms.length
        });
        setAppointments(apps.slice(0, 5));
      } catch (err) {
        console.error('Error loading receptionist dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Frontdesk...</div>;

  return (
    <div>
      {/* Frontdesk stats */}
      <div className="stats-grid">
        <StatCard title="Total Registered Patients" value={stats.patientsCount} icon={Users} type="primary" />
        <StatCard title="Today's Bookings" value={stats.todayAppointments} icon={Calendar} type="warning" />
        <StatCard title="Available Ward Beds" value={stats.availableRooms} icon={BedDouble} type="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Recent Schedule */}
        <div className="card">
          <div className="card-header flex justify-between align-center">
            <h4 style={{ fontWeight: 700 }}>Upcoming Clinical Appointments</h4>
            <Link to="/receptionist/appointments" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>
              Bookings Registry
            </Link>
          </div>

          {appointments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              No appointments registered.
            </p>
          ) : (
            <div className="table-container" style={{ border: 'none', boxShadow: 'none', marginBottom: 0 }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Slot</th>
                    <th>Patient Name</th>
                    <th>Doctor Specialty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id}>
                      <td style={{ fontWeight: 600 }}>{app.date} ({app.time})</td>
                      <td>{app.patient?.name || 'Rahul Sharma'}</td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{app.doctor?.name || 'Dr. John Doe'}</span>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {app.doctor?.department || 'Cardiology'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${app.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Shortcuts */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Desk Operations
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/receptionist/patients" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
              Register New Patient
            </Link>
            <Link to="/receptionist/appointments" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>
              Book Doctor Visit
            </Link>
            <Link to="/receptionist/billing" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none' }}>
              Billing Calculator Desk
            </Link>
            <Link to="/receptionist/rooms" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none' }}>
              Bed Allocations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
