import React, { useState, useEffect } from 'react';
import { FileText, Search, ShieldCheck, Clock } from 'lucide-react';
import { api } from '../../services/api';
import Toast from '../../components/common/Toast';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchReports = async () => {
    try {
      const data = await api.get('/api/reports');
      setReports(data);
    } catch (err) {
      setToastMessage('Error loading laboratory records log');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

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
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Diagnostic Logs...</div>
      ) : filteredReports.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <FileText size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Lab Reports Logged</h3>
          <p style={{ color: 'var(--text-muted)' }}>Laboratory staff and doctors upload reports directly from their panels.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Diagnostic Test</th>
                <th>Patient Name</th>
                <th>Date Conducted</th>
                <th>Lab Analysis Result Summary</th>
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
    </div>
  );
};

export default AdminReports;
