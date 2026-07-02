import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Check, X } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Booking Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '10:00 AM',
    reason: ''
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchData = async () => {
    try {
      const [appData, patData, docData] = await Promise.all([
        api.get('/api/appointments'),
        api.get('/api/patients'),
        api.get('/api/doctors')
      ]);
      setAppointments(appData);
      setPatients(patData);
      setDoctors(docData);
    } catch (err) {
      setToastMessage('Error loading desk registry data');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.doctorId) {
      alert('Please select patient and doctor.');
      return;
    }

    try {
      await api.post('/api/appointments', formData);
      setToastMessage('Appointment scheduled successfully!');
      setToastType('success');
      setIsModalOpen(false);
      setFormData({ patientId: '', doctorId: '', date: '', time: '10:00 AM', reason: '' });
      fetchData();
    } catch (err) {
      setToastMessage('Error creating appointment');
      setToastType('error');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/api/appointments/${id}`, { status });
      setToastMessage(`Appointment set to ${status}`);
      setToastType('success');
      fetchData();
    } catch (err) {
      setToastMessage('Error updating status');
      setToastType('error');
    }
  };

  const filteredAppointments = appointments.filter(app => 
    (app.patient?.name && app.patient.name.toLowerCase().includes(search.toLowerCase())) ||
    (app.doctor?.name && app.doctor.name.toLowerCase().includes(search.toLowerCase()))
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
            placeholder="Search bookings by patient or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Book Appointment
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Desk Bookings...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Calendar size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Appointments Scheduled</h3>
          <p style={{ color: 'var(--text-muted)' }}>Click Book Appointment to log a clinic checkup schedule.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Patient Name</th>
                <th>Assigned Doctor</th>
                <th>Reason for Visit</th>
                <th>Status</th>
                <th>Desk Actions</th>
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
                    <span style={{ fontWeight: 600 }}>{app.patient?.name || 'Unknown Patient'}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{app.doctor?.name || 'Unknown Doctor'}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {app.doctor?.department || 'Cardiology'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{app.reason}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
                  </td>
                  <td>
                    {app.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button className="btn btn-primary btn-sm flex align-center" onClick={() => handleUpdateStatus(app._id, 'Confirmed')}>
                          <Check size={12} /> Confirm
                        </button>
                        <button className="btn btn-outline btn-sm flex align-center" style={{ color: 'var(--danger)' }} onClick={() => handleUpdateStatus(app._id, 'Cancelled')}>
                          <X size={12} /> Cancel
                        </button>
                      </div>
                    )}
                    {app.status === 'Confirmed' && (
                      <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger)' }} onClick={() => handleUpdateStatus(app._id, 'Cancelled')}>
                        Cancel Booking
                      </button>
                    )}
                    {app.status === 'Completed' && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Consult Completed</span>
                    )}
                    {app.status === 'Cancelled' && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Clinical Consult"
      >
        <form onSubmit={handleBook}>
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <select className="form-control" name="patientId" value={formData.patientId} onChange={handleChange} required>
              <option value="">Select Patient Profile...</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name} ({p.gender}, {p.age} yrs)</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Doctor Specialist</label>
            <select className="form-control" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
              <option value="">Select Doctor...</option>
              {doctors.map(d => (
                <option key={d._id} value={d._id}>{d.name} ({d.department})</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Schedule Date</label>
              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <input type="text" className="form-control" name="time" placeholder="e.g. 10:30 AM" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea className="form-control" name="reason" rows="2" placeholder="Brief symptoms summary..." value={formData.reason} onChange={handleChange}></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Book Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistAppointments;
