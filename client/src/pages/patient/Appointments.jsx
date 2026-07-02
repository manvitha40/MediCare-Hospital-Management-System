import React, { useState, useEffect } from 'react';
import { Calendar, Search, AlertCircle, XCircle } from 'lucide-react';
import { api } from '../../services/api';
import Toast from '../../components/common/Toast';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchAppointments = async () => {
    try {
      const data = await api.get('/api/appointments');
      setAppointments(data);
    } catch (err) {
      setToastMessage('Error loading appointments log');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment booking?')) {
      return;
    }

    try {
      await api.put(`/api/appointments/${id}`, { status: 'Cancelled' });
      setToastMessage('Appointment booking cancelled successfully');
      setToastType('success');
      fetchAppointments();
    } catch (err) {
      setToastMessage('Error cancelling appointment');
      setToastType('error');
    }
  };

  const filteredAppointments = appointments.filter(app => 
    (app.doctor?.name && app.doctor.name.toLowerCase().includes(search.toLowerCase())) ||
    app.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Completed': return 'badge-primary';
      case 'Cancelled': return 'badge-danger';
      default: return 'badge-primary';
    }
  };

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Control bar */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by doctor or booking status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading appointments log...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Calendar size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Appointments Scheduled</h3>
          <p style={{ color: 'var(--text-muted)' }}>Go to Book Appointment to schedule a doctor consultation.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Specialist Doctor</th>
                <th>Reason for Visit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="flex flex-col">
                      <span style={{ fontWeight: 600 }}>{app.date}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.time}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex align-center gap-2">
                      <img 
                        src={app.doctor?.profileImage || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80'} 
                        alt={app.doctor?.name} 
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div className="flex flex-col">
                        <span style={{ fontWeight: 600 }}>{app.doctor?.name || 'Unknown Doctor'}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {app.doctor?.department || 'Cardiology'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{app.reason}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
                  </td>
                  <td>
                    {(app.status === 'Pending' || app.status === 'Confirmed') ? (
                      <button 
                        className="btn btn-outline btn-sm flex align-center gap-1" 
                        onClick={() => handleCancelAppointment(app._id)}
                        style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.1)' }}
                      >
                        <XCircle size={12} /> Cancel Booking
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        No Actions Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
