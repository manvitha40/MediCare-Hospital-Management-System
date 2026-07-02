import React, { useState, useEffect } from 'react';
import { ClipboardList, Search, Eye, FileText } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // View prescription modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await api.get('/api/prescriptions');
        setPrescriptions(data);
      } catch (err) {
        console.error('Error fetching prescriptions list:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  const handleOpenView = (pr) => {
    setSelectedPrescription(pr);
    setIsModalOpen(true);
  };

  const filteredPrescriptions = prescriptions.filter(pr => 
    pr.patient?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search prescriptions by patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Prescriptions...</div>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <ClipboardList size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Prescriptions Written</h3>
          <p style={{ color: 'var(--text-muted)' }}>Go to Appointments and click Consult & Prescribe to write a prescription.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Prescription ID</th>
                <th>Date Written</th>
                <th>Patient Details</th>
                <th>Medicines Count</th>
                <th>Remarks / Advice Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrescriptions.map((pr) => (
                <tr key={pr._id}>
                  <td style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--primary)' }}>
                    #{pr._id.toUpperCase()}
                  </td>
                  <td>{pr.date}</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{pr.patient?.name || 'Unknown Patient'}</span>
                  </td>
                  <td>
                    <span className="badge badge-primary">{pr.medicines?.length || 0} items</span>
                  </td>
                  <td style={{ fontSize: '0.8125rem', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pr.notes || 'No notes logged'}
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm flex align-center gap-1" onClick={() => handleOpenView(pr)}>
                      <Eye size={12} /> View Prescription
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Rx Prescription Details"
      >
        {selectedPrescription && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Patient Details</div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selectedPrescription.patient?.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Age: {selectedPrescription.patient?.age} | Gender: {selectedPrescription.patient?.gender}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date Prescribed</div>
                <div style={{ fontWeight: 700 }}>{selectedPrescription.date}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Rx: #{selectedPrescription._id.substring(0, 8).toUpperCase()}
                </div>
              </div>
            </div>

            <table className="custom-table" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Medicine</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Dosage</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Frequency</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {selectedPrescription.medicines?.map((med, i) => (
                  <tr key={i}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{med.name}</td>
                    <td style={{ padding: '0.75rem' }}>{med.dosage}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-primary">{med.frequency}</span></td>
                    <td style={{ padding: '0.75rem' }}>{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '1.5rem', padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Doctor Advice Notes
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5, fontStyle: 'italic' }}>
                {selectedPrescription.notes || 'No special clinical notes provided.'}
              </p>
            </div>
            
            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
              Written by {selectedPrescription.doctor?.name || 'Dr. John Doe'} | Department of {selectedPrescription.doctor?.department || 'General Medicine'}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPrescriptions;
