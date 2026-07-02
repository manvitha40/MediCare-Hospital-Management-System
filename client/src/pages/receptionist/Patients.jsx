import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, UserCheck } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const ReceptionistPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    address: ''
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchPatients = async () => {
    try {
      const data = await api.get('/api/patients');
      setPatients(data);
    } catch (err) {
      setToastMessage('Error loading patient list');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/patients', formData);
      setToastMessage('Patient account created successfully');
      setToastType('success');
      setIsModalOpen(false);
      // Reset
      setFormData({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: 'Male',
        bloodGroup: 'O+',
        address: ''
      });
      fetchPatients();
    } catch (err) {
      setToastMessage(err.message || 'Error creating patient account');
      setToastType('error');
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

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
            placeholder="Search patients by name or blood group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Register Patient
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Patients Directory...</div>
      ) : filteredPatients.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Patients Registered</h3>
          <p style={{ color: 'var(--text-muted)' }}>Click Register Patient to create a new patient health record.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Address</th>
                <th>Medical History Log</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((pat) => (
                <tr key={pat._id}>
                  <td>
                    <div className="flex align-center gap-2">
                      <img 
                        src={pat.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                        alt={pat.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div className="flex flex-col">
                        <span style={{ fontWeight: 600 }}>{pat.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pat.email || 'patient@medicare.com'}</span>
                      </div>
                    </div>
                  </td>
                  <td>{pat.age} yrs</td>
                  <td>{pat.gender}</td>
                  <td>
                    <span className="badge badge-danger">{pat.bloodGroup}</span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{pat.address || 'Not Logged'}</td>
                  <td>
                    {pat.medicalHistory && pat.medicalHistory.length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {pat.medicalHistory.map((hist, i) => (
                          <span key={i} className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                            {hist}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Clean History</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Register Patient Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Patient Health Record"
      >
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              placeholder="e.g. Rahul Sharma"
              value={formData.name} 
              onChange={handleChange} 
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
                placeholder="patient@gmail.com"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password (Default)</label>
              <input 
                type="password" 
                className="form-control" 
                name="password" 
                placeholder="patient123"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input 
                type="number" 
                className="form-control" 
                name="age" 
                placeholder="28"
                value={formData.age} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-control" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Home Address</label>
            <input 
              type="text" 
              className="form-control" 
              name="address" 
              placeholder="e.g. 123 Main St, City"
              value={formData.address} 
              onChange={handleChange} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserCheck size={16} /> Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistPatients;
