import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Save, ClipboardList } from 'lucide-react';
import Toast from '../../components/common/Toast';
import HospitalInfoCard from '../../components/common/HospitalInfoCard';

const PatientProfile = () => {
  const { user, profile, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: profile?.age || '',
    gender: profile?.gender || 'Male',
    bloodGroup: profile?.bloodGroup || 'O+',
    address: profile?.address || ''
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setToastMessage('Medical profile saved successfully!');
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

      {/* Patient Profile Header */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: '24px', flexShrink: 0
        }}>
          {user?.name?.charAt(0) || 'P'}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{user?.name || 'Patient'}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', backgroundColor: '#d1fae5', color: '#065f46', fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
              Patient
            </span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user?.email || '—'}</span>
          {profile?.bloodGroup && (
            <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.1rem 0.5rem', borderRadius: '8px' }}>
              {profile.bloodGroup}
            </span>
          )}
        </div>
      </div>

      <form className="card" onSubmit={handleSubmit}>
        <div className="card-header flex align-center gap-1">
          <User size={20} style={{ color: 'var(--primary)' }} />
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Personal Health Profile</h3>
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
            <label className="form-label">Contact Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              disabled // Login stability
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
            value={formData.address} 
            onChange={handleChange} 
          />
        </div>

        {/* Display Medical history logs */}
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            <ClipboardList size={16} /> Clinical History logs
          </h4>
          {profile?.medicalHistory && profile.medicalHistory.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
              {profile.medicalHistory.map((hist, i) => (
                <span key={i} className="badge badge-warning" style={{ fontWeight: 600 }}>
                  {hist}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              No critical medical history or drug allergies are logged in your profile.
            </p>
          )}
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

export default PatientProfile;
