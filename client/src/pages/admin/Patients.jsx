import React, { useState, useEffect } from 'react';
import { Search, UserMinus, PlusCircle, Activity } from 'lucide-react';
import { api } from '../../services/api';
import Toast from '../../components/common/Toast';

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchPatients = async () => {
    try {
      const data = await api.get('/api/patients');
      setPatients(data);
    } catch (err) {
      setToastMessage('Error loading patients');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDeletePatient = async (id) => {
    if (!window.confirm('Are you sure you want to remove this patient? This will delete all clinical appointments, records, and login credentials.')) {
      return;
    }

    try {
      await api.delete(`/api/patients/${id}`);
      setToastMessage('Patient profile successfully deleted');
      setToastType('success');
      fetchPatients();
    } catch (err) {
      setToastMessage('Error deleting patient profile');
      setToastType('error');
    }
  };

  const filteredPatients = patients.filter(pat => 
    pat.name.toLowerCase().includes(search.toLowerCase()) ||
    pat.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Search and control */}
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
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Patients Directory...</div>
      ) : filteredPatients.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Patients Registered</h3>
          <p style={{ color: 'var(--text-muted)' }}>Patients can register via the landing page or receptionist front desk.</p>
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
                <th>Home Address</th>
                <th>Medical History / Allergies</th>
                <th>Actions</th>
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
                    <span className="badge badge-danger" style={{ fontWeight: 'bold' }}>{pat.bloodGroup}</span>
                  </td>
                  <td style={{ fontSize: '0.8125rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pat.address || 'Not Provided'}
                  </td>
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
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None Logged</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn btn-outline btn-sm" 
                      onClick={() => handleDeletePatient(pat._id)}
                      style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                    >
                      <UserMinus size={14} />
                    </button>
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

export default AdminPatients;
