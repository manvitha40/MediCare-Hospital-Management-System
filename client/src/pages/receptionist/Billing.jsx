import React, { useState, useEffect } from 'react';
import { Receipt, Search, Plus, Check } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const ReceptionistBilling = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Invoice modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    consultationFee: '500',
    medicineFee: '0',
    labFee: '0',
    roomCharges: '0'
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchData = async () => {
    try {
      const [billData, patData] = await Promise.all([
        api.get('/api/bills'),
        api.get('/api/patients')
      ]);
      setBills(billData);
      setPatients(patData);
    } catch (err) {
      setToastMessage('Error loading billing registry');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateBill = async (e) => {
    e.preventDefault();
    if (!formData.patientId) {
      alert('Please select a patient.');
      return;
    }

    try {
      await api.post('/api/bills', formData);
      setToastMessage('Billing invoice compiled successfully!');
      setToastType('success');
      setIsModalOpen(false);
      setFormData({ patientId: '', consultationFee: '500', medicineFee: '0', labFee: '0', roomCharges: '0' });
      fetchData();
    } catch (err) {
      setToastMessage('Error compiling invoice bill');
      setToastType('error');
    }
  };

  const handlePayBill = async (id) => {
    try {
      await api.put(`/api/bills/${id}/pay`);
      setToastMessage('Payment completed successfully');
      setToastType('success');
      fetchData();
    } catch (err) {
      setToastMessage('Error processing invoice payment');
      setToastType('error');
    }
  };

  const filteredBills = bills.filter(b => 
    b.patient?.name.toLowerCase().includes(search.toLowerCase()) ||
    b._id.includes(search)
  );

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Control bar */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search bills by patient or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Compile Invoice
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Bills...</div>
      ) : filteredBills.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Receipt size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Bills Logged</h3>
          <p style={{ color: 'var(--text-muted)' }}>Click Compile Invoice to calculate fees for patients.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient Details</th>
                <th>Fee Breakdown (Consult + Med + Lab + Room)</th>
                <th>Tax (15%)</th>
                <th>Total Charges</th>
                <th>Status</th>
                <th>Desk Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((b) => (
                <tr key={b._id}>
                  <td style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--primary)' }}>
                    #{b._id.toUpperCase()}
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{b.patient?.name || 'Unknown Patient'}</span>
                  </td>
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
                        <Check size={12} /> Collect Payment
                      </button>
                    ) : (
                      <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.8rem' }}>
                        Receipt Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Compile Invoice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Compile Fee Statement"
      >
        <form onSubmit={handleCreateBill}>
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <select className="form-control" name="patientId" value={formData.patientId} onChange={handleChange} required>
              <option value="">Choose Patient...</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name} ({p.gender}, {p.age} yrs)</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Consultation Fee (₹)</label>
              <input type="number" className="form-control" name="consultationFee" value={formData.consultationFee} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Medicine Charges (₹)</label>
              <input type="number" className="form-control" name="medicineFee" value={formData.medicineFee} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Lab Test Fees (₹)</label>
              <input type="number" className="form-control" name="labFee" value={formData.labFee} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Room Wards Charges (₹)</label>
              <input type="number" className="form-control" name="roomCharges" value={formData.roomCharges} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Generate Invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistBilling;
