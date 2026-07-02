import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Save, Settings } from 'lucide-react';
import Toast from '../../components/common/Toast';
import HospitalInfoCard from '../../components/common/HospitalInfoCard';

const ReceptionistSettings = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    shiftHours: '08:00 AM – 08:00 PM',
    deskPhone: '+91 40 4567 8901',
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Frontdesk profile saved successfully!');
    setToastType('success');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      <form className="card" onSubmit={handleSave}>
        <div className="card-header flex align-center gap-1">
          <Settings size={20} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Frontdesk Staff Settings</h3>
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
            <label className="form-label">Shift Hours</label>
            <input
              type="text"
              className="form-control"
              name="shiftHours"
              value={formData.shiftHours}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Desk Phone Extension</label>
            <input
              type="text"
              className="form-control"
              name="deskPhone"
              value={formData.deskPhone}
              onChange={handleChange}
            />
          </div>
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

export default ReceptionistSettings;
