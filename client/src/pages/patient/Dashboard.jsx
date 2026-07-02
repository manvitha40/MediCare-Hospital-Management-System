import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, ClipboardList, Receipt, Heart, PlusCircle, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import StatCard from '../../components/common/StatCard';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [appData, prData, billData] = await Promise.all([
          api.get('/api/appointments'),
          api.get('/api/prescriptions'),
          api.get('/api/bills')
        ]);
        
        setAppointments(appData);
        setPrescriptions(prData);
        setBills(billData);
      } catch (err) {
        console.error('Error fetching patient dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getNextAppointment = () => {
    const active = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending');
    if (active.length === 0) return null;
    // Sort by date ascending (closest date first)
    return active.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  };

  const nextApp = getNextAppointment();
  const unpaidBills = bills.filter(b => b.status === 'Pending');

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Patient Portal...</div>;

  return (
    <div>
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)', 
        color: '#ffffff',
        padding: '2.5rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '2rem',
        border: 'none',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Hello, {user?.name}!</h2>
        <p style={{ opacity: 0.9, maxWidth: '600px', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Welcome back to your healthcare dashboard. You can schedule doctor appointments, view prescriptions, and pay billing statements.
        </p>
        <Link to="/patient/book" className="btn btn-secondary flex align-center" style={{ marginTop: '1.25rem', width: 'fit-content', backgroundColor: '#ffffff', color: 'var(--primary)' }}>
          <PlusCircle size={16} /> Book Appointment
        </Link>
      </div>

      {/* Metrics */}
      <div className="stats-grid">
        <StatCard title="Total Appointments" value={appointments.length} icon={Calendar} type="primary" />
        <StatCard title="Active Prescriptions" value={prescriptions.length} icon={ClipboardList} type="success" />
        <StatCard title="Pending Payments" value={unpaidBills.length} icon={Receipt} type="warning" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Next Appointment Card */}
        <div className="card">
          <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            Next Scheduled Checkup
          </h4>
          
          {nextApp ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date & Time Slot</div>
                <div style={{ fontWeight: 800, fontSize: '1.125rem', marginTop: '0.25rem' }}>{nextApp.date} at {nextApp.time}</div>
                
                <div style={{ marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Assigned Specialist</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{nextApp.doctor?.name || 'Dr. John Doe'}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                    {nextApp.doctor?.department || 'Cardiology'} Clinic
                  </span>
                </div>
              </div>
              <div>
                <span className={`badge ${nextApp.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                  {nextApp.status}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <Heart size={36} style={{ marginBottom: '0.75rem', strokeWidth: 1.5 }} />
              <p>No upcoming appointments found.</p>
            </div>
          )}
        </div>

        {/* Pending Actions */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            Quick Shortcuts
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/patient/records" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none', justifyContent: 'space-between' }}>
              <span>View Prescriptions</span> <ArrowRight size={14} />
            </Link>
            <Link to="/patient/records" className="btn btn-outline" style={{ width: '100%', textDecoration: 'none', justifyContent: 'space-between' }}>
              <span>View Outstanding Bills</span> <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
