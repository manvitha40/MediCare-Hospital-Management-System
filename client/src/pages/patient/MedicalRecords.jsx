import React, { useState, useEffect } from 'react';
import { ClipboardList, FileText, Receipt, Eye, CheckCircle, CreditCard } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const PatientMedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // View prescription modal state
  const [isPrModalOpen, setIsPrModalOpen] = useState(false);
  const [selectedPr, setSelectedPr] = useState(null);

  // Notification
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchData = async () => {
    try {
      const [prData, repData, billData] = await Promise.all([
        api.get('/api/prescriptions'),
        api.get('/api/reports'),
        api.get('/api/bills')
      ]);
      setPrescriptions(prData);
      setReports(repData);
      setBills(billData);
    } catch (err) {
      setToastMessage('Error loading medical logs');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPr = (pr) => {
    setSelectedPr(pr);
    setIsPrModalOpen(true);
  };

  const handlePayBill = async (id) => {
    try {
      await api.put(`/api/bills/${id}/pay`);
      setToastMessage('Payment completed successfully! Invoice settled.');
      setToastType('success');
      fetchData();
    } catch (err) {
      setToastMessage('Error processing invoice payment');
      setToastType('error');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Medical Records...</div>;

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Tabs Controller */}
      <div className="flex gap-1" style={{ borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
        <button 
          className={`btn ${activeTab === 'prescriptions' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          onClick={() => setActiveTab('prescriptions')}
        >
          <ClipboardList size={16} /> Prescriptions
        </button>
        <button 
          className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          onClick={() => setActiveTab('reports')}
        >
          <FileText size={16} /> Lab Reports
        </button>
        <button 
          className={`btn ${activeTab === 'bills' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          onClick={() => setActiveTab('bills')}
        >
          <Receipt size={16} /> Bills & Invoices
        </button>
      </div>

      {/* TABS CONTAINER */}
      <div className="card">

        {/* TAB 1: PRESCRIPTIONS */}
        {activeTab === 'prescriptions' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem' }}>Prescriptions Registry</h3>
            {prescriptions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No clinical prescriptions found.</p>
            ) : (
              <div className="table-container" style={{ border: 'none', boxShadow: 'none', marginBottom: 0 }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Prescription ID</th>
                      <th>Date Prescribed</th>
                      <th>Consulting Doctor</th>
                      <th>Items Count</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((pr) => (
                      <tr key={pr._id}>
                        <td style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--primary)' }}>#{pr._id.toUpperCase()}</td>
                        <td>{pr.date}</td>
                        <td>
                          <span style={{ fontWeight: 600 }}>{pr.doctor?.name}</span>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pr.doctor?.department}</span>
                        </td>
                        <td><span className="badge badge-primary">{pr.medicines?.length || 0} meds</span></td>
                        <td>
                          <button className="btn btn-outline btn-sm flex align-center gap-1" onClick={() => handleOpenPr(pr)}>
                            <Eye size={12} /> View Rx
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LAB REPORTS */}
        {activeTab === 'reports' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem' }}>Laboratory Reports Directory</h3>
            {reports.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No diagnostic test files found.</p>
            ) : (
              <div className="table-container" style={{ border: 'none', boxShadow: 'none', marginBottom: 0 }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Diagnostic Test</th>
                      <th>Conducted Date</th>
                      <th>Findings Summary</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((rep) => (
                      <tr key={rep._id}>
                        <td>
                          <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <FileText size={16} style={{ color: 'var(--primary)' }} /> {rep.testName}
                          </span>
                        </td>
                        <td>{rep.date}</td>
                        <td style={{ fontSize: '0.8125rem', maxWidth: '300px', lineHeight: 1.4 }}>{rep.result}</td>
                        <td><span className="badge badge-success">{rep.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BILLS & INVOICES */}
        {activeTab === 'bills' && (
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem' }}>Outstanding Invoices & Bills</h3>
            {bills.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No billing invoice logs found.</p>
            ) : (
              <div className="table-container" style={{ border: 'none', boxShadow: 'none', marginBottom: 0 }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Date Issued</th>
                      <th>Breakdown (Consult + Med + Lab + Room)</th>
                      <th>Tax (15%)</th>
                      <th>Total Charges</th>
                      <th>Status</th>
                      <th>Payment Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((b) => (
                      <tr key={b._id}>
                        <td style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--primary)' }}>#{b._id.toUpperCase()}</td>
                        <td>{b.date}</td>
                        <td>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            ₹{b.consultationFee} + ₹{b.medicineFee} + ₹{b.labFee} + ₹{b.roomCharges}
                          </span>
                        </td>
                        <td>₹{b.tax}</td>
                        <td style={{ fontWeight: 700 }}>₹{b.total}</td>
                        <td>
                          <span className={`badge ${b.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          {b.status === 'Pending' ? (
                            <button className="btn btn-primary btn-sm flex align-center gap-1" onClick={() => handlePayBill(b._id)}>
                              <CreditCard size={12} /> Pay Online (₹)
                            </button>
                          ) : (
                            <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <CheckCircle size={14} /> Settled
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Prescription View Modal */}
      <Modal
        isOpen={isPrModalOpen}
        onClose={() => setIsPrModalOpen(false)}
        title="Rx Medical Prescription"
      >
        {selectedPr && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Consulting Specialist</div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selectedPr.doctor?.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Department: {selectedPr.doctor?.department}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prescribed Date</div>
                <div style={{ fontWeight: 700 }}>{selectedPr.date}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Rx: #{selectedPr._id.substring(0, 8).toUpperCase()}</div>
              </div>
            </div>

            <table className="custom-table" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Medicine</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Dosage</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Frequency</th>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {selectedPr.medicines?.map((med, i) => (
                  <tr key={i}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{med.name}</td>
                    <td style={{ padding: '0.75rem' }}>{med.dosage}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-primary">{med.frequency}</span></td>
                    <td style={{ padding: '0.75rem' }}>{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Special Clinical Instructions
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.5 }}>
                {selectedPr.notes || 'No special clinical instructions logged.'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientMedicalRecords;
