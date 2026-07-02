import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Users, FileCheck, ClipboardList, CheckSquare } from 'lucide-react';
import { api } from '../../services/api';
import StatCard from '../../components/common/StatCard';
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ todayCount: 0, pendingCount: 0, completedCount: 0 });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await api.get('/api/appointments');
        setAppointments(data);

        // Calculate doctor stats
        const todayStr = new Date().toISOString().split('T')[0];
        const todayApps = data.filter(a => a.date === todayStr);
        const pending = data.filter(a => a.status === 'Pending' || a.status === 'Confirmed');
        const completed = data.filter(a => a.status === 'Completed');

        setStats({
          todayCount: todayApps.length,
          pendingCount: pending.length,
          completedCount: completed.length
        });
      } catch (err) {
        console.error('Error loading doctor dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Dashboard...</div>;

  return (
    <div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
        Welcome Back, {user?.name}!
      </h3>

      {/* Metrics */}
      <div className="stats-grid">
        <StatCard title="Today's Appointments" value={stats.todayCount} icon={Calendar} type="primary" />
        <StatCard title="Total Pending checkups" value={stats.pendingCount} icon={Users} type="warning" />
        <StatCard title="Completed Consultations" value={stats.completedCount} icon={FileCheck} type="success" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Today's Schedule Card */}
        <div className="card">
          <div className="card-header flex justify-between align-center">
            <h4 style={{ fontWeight: 700 }}>Today's Clinical Schedule</h4>
            <Link to="/doctor/appointments" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>
              View All
            </Link>
          </div>
          
          {appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <CheckSquare size={36} style={{ marginBottom: '0.75rem', strokeWidth: 1.5 }} />
              <p>No active consultations scheduled for today.</p>
            </div>
          ) : (
            <div className="table-container" style={{ border: 'none', boxShadow: 'none', marginBottom: 0 }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Time slot</th>
                    <th>Patient Name</th>
                    <th>Reason for Visit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments
                    .filter(a => a.status === 'Confirmed' || a.status === 'Pending')
                    .slice(0, 5)
                    .map((app) => (
                      <tr key={app._id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{app.time}</td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{app.patient?.name || 'Rahul Sharma'}</span>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Age: {app.patient?.age || '28'} | Gender: {app.patient?.gender || 'Male'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8125rem' }}>{app.reason || 'Checkup'}</td>
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

        {/* Shortcuts Panel */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Quick Actions
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/doctor/appointments" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
              Consult Patients
            </Link>
            <Link to="/doctor/profile" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none' }}>
              Manage availability Hours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
