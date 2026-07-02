import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const DoctorReports = () => {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    testName: 'Blood Test',
    result: '',
    status: 'Completed'
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchData = async () => {
    try {
      const [repData, patData] = await Promise.all([
        api.get('/api/reports'),
        api.get('/api/patients')
      ]);
      setReports(repData);
      setPatients(patData);
    } catch (err) {
      setToastMessage('Error loading laboratory files');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.patientId) {
      alert('Please select a patient.');
      return;
    }

    try {
      await api.post('/api/reports', formData);
      
      // Automatically generate a billing invoice for the Lab Fee! Excellent integration.
      const patientObj = patients.find(p => p._id === formData.patientId);
      await api.post('/api/bills', {
        patientId: formData.patientId,
        consultationFee: 0,
        medicineFee: 0,
        labFee: 350, // default lab test fee
        roomCharges: 0
      });

      setToastMessage('Lab test logged and lab billing invoice created!');
      setToastType('success');
      setIsModalOpen(false);
      setFormData({ patientId: '', testName: 'Blood Test', result: '', status: 'Completed' });
      fetchData();
    } catch (err) {
      setToastMessage('Error logging diagnostic lab report');
      setToastType('error');
    }
  };

  const filteredReports = reports.filter(rep => 
    rep.patient?.name.toLowerCase().includes(search.toLowerCase()) ||
    rep.testName.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search report name or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Lab Report
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Diagnostic Logs...</div>
      ) : filteredReports.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <FileText size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Laboratory Records Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Click Add Lab Report to log diagnostic files for clinic patients.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Diagnostic Test</th>
                <th>Patient Name</th>
                <th>Conducted Date</th>
                <th>Lab Analysis Result Findings</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((rep) => (
                <tr key={rep._id}>
                  <td>
                    <div className="flex align-center gap-1" style={{ fontWeight: 600 }}>
                      <FileText size={16} style={{ color: 'var(--primary)' }} />
                      <span>{rep.testName}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{rep.patient?.name || 'Unknown Patient'}</span>
                  </td>
                  <td>{rep.date}</td>
                  <td style={{ fontSize: '0.8125rem', maxWidth: '300px', lineHeight: 1.4 }}>
                    {rep.result}
                  </td>
                  <td>
                    <span className={`badge ${rep.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                      {rep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Report Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add Diagnostic Laboratory Report"
      >
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Select Patient</label>
            <select 
              className="form-control" 
              name="patientId" 
              value={formData.patientId} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Choose Patient Profile...</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name} ({p.gender}, {p.age} yrs)</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Laboratory Diagnostic Test</label>
              <select 
                className="form-control" 
                name="testName" 
                value={formData.testName} 
                onChange={handleInputChange}
              >
                <option value="Blood Test">Blood Test</option>
                <option value="MRI">MRI</option>
                <option value="X-Ray">X-Ray</option>
                <option value="ECG">ECG</option>
                <option value="CT Scan">CT Scan</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select 
                className="form-control" 
                name="status" 
                value={formData.status} 
                onChange={handleInputChange}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Lab Findings Summary</label>
            <textarea 
              className="form-control" 
              name="result" 
              rows="3"
              placeholder="e.g. Haemoglobin levels normal. Cholesterol slight elevation (210 mg/dL)..."
              value={formData.result} 
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Log Report
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorReports;
