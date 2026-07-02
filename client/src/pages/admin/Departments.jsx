import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FolderHeart, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchData = async () => {
    try {
      const [depData, docData] = await Promise.all([
        api.get('/api/departments'),
        api.get('/api/doctors')
      ]);
      setDepartments(depData);
      setDoctors(docData);
    } catch (err) {
      setToastMessage('Error loading clinic departments data');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/departments', formData);
      setToastMessage('Department created successfully!');
      setToastType('success');
      setIsModalOpen(false);
      setFormData({ name: '', description: '' });
      fetchData();
    } catch (err) {
      setToastMessage(err.message || 'Error creating department');
      setToastType('error');
    }
  };

  const handleDelete = async (name) => {
    if (!window.confirm(`Are you sure you want to remove the ${name} department?`)) {
      return;
    }

    try {
      await api.delete(`/api/departments/${name}`);
      setToastMessage('Department deleted successfully');
      setToastType('success');
      fetchData();
    } catch (err) {
      setToastMessage('Error deleting department');
      setToastType('error');
    }
  };

  const getDoctorCount = (depName) => {
    return doctors.filter(doc => doc.department.toLowerCase() === depName.toLowerCase()).length;
  };

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Header controls */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Manage active departments and view clinical headcounts.</p>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Department
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Departments...</div>
      ) : departments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Departments Configured</h3>
          <p style={{ color: 'var(--text-muted)' }}>Add clinical categories (e.g. Ophthalmology, Pediatrics).</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {departments.map((dep) => {
            const docCount = getDoctorCount(dep.name);
            return (
              <div key={dep._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex justify-between align-center" style={{ marginBottom: '1rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FolderHeart size={20} />
                    </div>
                    <span className={`badge ${dep.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {dep.status}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>{dep.name}</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', minHeight: '40px', lineHeight: 1.4 }}>
                    {dep.description || 'No description provided.'}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderTop: '1px solid var(--border)', 
                  paddingTop: '0.875rem', 
                  marginTop: '1.25rem' 
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {docCount} {docCount === 1 ? 'Doctor' : 'Doctors'}
                  </span>
                  
                  {/* Allow deleting departments (except predefined ones for safety, or all) */}
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={() => handleDelete(dep.name)}
                    style={{ color: 'var(--danger)', border: 'none', padding: '0.25rem' }}
                    title="Remove Department"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add Clinical Department"
      >
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Department Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              placeholder="e.g. Dermatology"
              value={formData.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              name="description" 
              rows="3"
              placeholder="Describe department functions..."
              value={formData.description} 
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDepartments;
