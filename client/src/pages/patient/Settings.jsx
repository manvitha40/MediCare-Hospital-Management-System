import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Settings } from 'lucide-react';
import Toast from '../../components/common/Toast';
import HospitalInfoCard from '../../components/common/HospitalInfoCard';

const PatientSettings = () => {
  const { user, profile, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: profile?.age || '',
    gender: profile?.gender || 'Male',
    bloodGroup: profile?.bloodGroup || 'O+',
    address: profile?.address || '',
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setToastMessage('Patient settings saved successfully!');
      setToastType('success');
    } catch (err) {
      setToastMessage(err.message || 'Error updating settings');
      setToastType('error');
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      <form className="card" onSubmit={handleSave}>
        <div className="card-header flex align-center gap-1">
          <Settings size={20} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Personal Portal Settings</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
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
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </form>

      <HospitalInfoCard />
    </div>
  );
};

export default PatientSettings;
