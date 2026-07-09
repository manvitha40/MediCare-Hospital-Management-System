import React, { useState } from 'react';
import { Settings, Save, User, ShieldCheck } from 'lucide-react';
import Toast from '../../components/common/Toast';
import HospitalInfoCard from '../../components/common/HospitalInfoCard';
import { useAuth } from '../../context/AuthContext';

const AdminSettings = () => {
  const { user } = useAuth();
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

      {/* Admin Profile Card */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: '24px', flexShrink: 0
        }}>
          {user?.name?.charAt(0) || 'A'}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{user?.name || 'Administrator'}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
              <ShieldCheck size={11} /> Admin
            </span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user?.email || 'admin@medicare.com'}</span>
        </div>
      </div>

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
          <textarea 
            className="form-control" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            rows="3"
            style={{ resize: 'vertical', fontFamily: 'inherit' }}
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
