import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Save, Clock, Stethoscope } from 'lucide-react';
import Toast from '../../components/common/Toast';
import HospitalInfoCard from '../../components/common/HospitalInfoCard';

const DoctorProfile = () => {
  const { user, profile, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    experience: profile?.experience || '',
    qualification: profile?.qualification || '',
    fee: profile?.fee || '',
    availableTime: profile?.availableTime || '09:00 AM - 05:00 PM',
    availableDays: profile?.availableDays || ['Monday', 'Wednesday', 'Friday']
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayToggle = (day) => {
    const updated = formData.availableDays.includes(day)
      ? formData.availableDays.filter(d => d !== day)
      : [...formData.availableDays, day];
    
    setFormData({ ...formData, availableDays: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.availableDays.length === 0) {
      alert('Please select at least one available day.');
      return;
    }

    try {
      await updateProfile(formData);
      setToastMessage('Profile settings updated successfully!');
      setToastType('success');
    } catch (err) {
      setToastMessage(err.message || 'Error updating profile details');
      setToastType('error');
    }
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-header flex align-center gap-1">
          <User size={20} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Clinical Specialist Profile Settings</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
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
            <label className="form-label">Contact Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              disabled // Email cannot be changed for login stability
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Clinical Specialty / Department</label>
            <input 
              type="text" 
              className="form-control" 
              value={profile?.department || 'General Medicine'} 
              disabled 
              style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-muted)' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Experience (Years)</label>
            <input 
              type="number" 
              className="form-control" 
              name="experience" 
              value={formData.experience} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Credentials & Qualifications</label>
            <input 
              type="text" 
              className="form-control" 
              name="qualification" 
              value={formData.qualification} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Consulting Fee (₹)</label>
            <input 
              type="number" 
              className="form-control" 
              name="fee" 
              value={formData.fee} 
              onChange={handleChange} 
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
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Consultation Days</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {daysList.map(day => (
              <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={formData.availableDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            Save Profile
          </button>
        </div>
      </form>

      <HospitalInfoCard />
    </div>
  );
};

export default DoctorProfile;
