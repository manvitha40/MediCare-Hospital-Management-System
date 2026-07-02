import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import Toast from '../../components/common/Toast';
import HospitalInfoCard from '../../components/common/HospitalInfoCard';

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    hospitalName: 'MediCare General Hospital',
    address: '45, Health Care Avenue, Madhapur, Hyderabad, Telangana – 500081, India',
    email: 'info@medicaregeneralhospital.com',
    phone: '+91 40 4567 8901',
    emergencyHotline: '+91 40 4567 8999',
    currency: 'INR (₹)',
    taxRate: '18',
    shiftHours: '08:00 AM - 08:00 PM'
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Hospital configurations saved successfully!');
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
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>MediCare System Settings</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Hospital Branding Name</label>
          <input 
            type="text" 
            className="form-control" 
            name="hospitalName" 
            value={formData.hospitalName} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hospital Address</label>
          <input 
            type="text" 
            className="form-control" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Landline Phone</label>
            <input 
              type="text" 
              className="form-control" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Emergency Call Hotline</label>
            <input 
              type="text" 
              className="form-control" 
              name="emergencyHotline" 
              value={formData.emergencyHotline} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">System Currency Code</label>
            <input 
              type="text" 
              className="form-control" 
              name="currency" 
              value={formData.currency} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Default Tax Rate (%)</label>
            <input 
              type="number" 
              className="form-control" 
              name="taxRate" 
              value={formData.taxRate} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Default Shift Duration</label>
            <input 
              type="text" 
              className="form-control" 
              name="shiftHours" 
              value={formData.shiftHours} 
              onChange={handleChange} 
              required 
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

export default AdminSettings;
