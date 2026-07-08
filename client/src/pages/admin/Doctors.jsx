import React, { useState, useEffect } from 'react';
import { Stethoscope, Plus, Trash2, Mail, Clock, Search, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Cardiology',
    experience: '',
    qualification: '',
    fee: '',
    availableDays: [],
    availableTime: '09:00 AM - 05:00 PM'
  });

  // Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchDoctors = async () => {
    try {
      const data = await api.get('/api/doctors');
      setDoctors(data);
    } catch (error) {
      setToastMessage('Error loading doctors list');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDayToggle = (day) => {
    const updated = formData.availableDays.includes(day)
      ? formData.availableDays.filter(d => d !== day)
      : [...formData.availableDays, day];
    
    setFormData({ ...formData, availableDays: updated });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (formData.availableDays.length === 0) {
      alert('Please select at least one available day.');
      return;
    }

    try {
      await api.post('/api/doctors', formData);
      setToastMessage('Doctor added successfully!');
      setToastType('success');
      setIsModalOpen(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        department: 'Cardiology',
        experience: '',
        qualification: '',
        fee: '',
        availableDays: [],
        availableTime: '09:00 AM - 05:00 PM'
      });
      fetchDoctors();
    } catch (error) {
      setToastMessage(error.message || 'Failed to create doctor');
      setToastType('error');
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to remove this doctor? This will delete their credentials.')) {
      return;
    }

    try {
      await api.delete(`/api/doctors/${id}`);
      setToastMessage('Doctor removed successfully');
      setToastType('success');
      fetchDoctors();
    } catch (error) {
      setToastMessage('Error deleting doctor');
      setToastType('error');
    }
  };

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Top Header controls */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search doctors by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Doctor
        </button>
      </div>

      {/* Doctor directory table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Doctors...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <AlertCircle size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Doctors Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try resetting your filter or click Add Doctor to register one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Qualification</th>
                <th>Consulting Fee</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc._id}>
                  <td>
                    <div className="flex align-center gap-2">
                      <div
  style={{
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "18px"
  }}
>
  {doc.name.replace("Dr. ", "").charAt(0)}
</div>
                      <div className="flex flex-col">
                        <span style={{ fontWeight: 600 }}>{doc.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Mail size={12} /> {doc.email || 'doctor@medicare.com'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{doc.department}</span>
                  </td>
                  <td>{doc.experience} Years</td>
                  <td>{doc.qualification}</td>
                  <td style={{ fontWeight: 600 }}>₹{doc.fee}</td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {doc.availableTime}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {doc.availableDays.join(', ')}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm" 
                      onClick={() => handleDeleteDoctor(doc._id)}
                      style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Doctor Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Register New Doctor Profile"
      >
        <form onSubmit={handleAddDoctor}>
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              placeholder="Dr. John Doe"
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                name="email" 
                placeholder="john.doe@medicare.com"
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Login Password</label>
              <input 
                type="password" 
                className="form-control" 
                name="password" 
                placeholder="••••••••"
                value={formData.password} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department / Specialty</label>
              <select 
                className="form-control" 
                name="department" 
                value={formData.department} 
                onChange={handleInputChange}
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="ENT">ENT</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input 
                type="number" 
                className="form-control" 
                name="experience" 
                placeholder="10"
                value={formData.experience} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Qualification Credentials</label>
              <input 
                type="text" 
                className="form-control" 
                name="qualification" 
                placeholder="MD, MBBS, FACC"
                value={formData.qualification} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Consultation Fee (₹)</label>
              <input 
                type="number" 
                className="form-control" 
                name="fee" 
                placeholder="150"
                value={formData.fee} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Consultation Shift Hours</label>
            <input 
              type="text" 
              className="form-control" 
              name="availableTime" 
              value={formData.availableTime} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Available Days</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {daysList.map(day => (
                <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.availableDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                  <span>{day.substring(0, 3)}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Doctor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDoctors;
