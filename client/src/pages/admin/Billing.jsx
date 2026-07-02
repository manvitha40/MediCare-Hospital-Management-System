import React, { useState, useEffect } from 'react';
import { Receipt, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import Toast from '../../components/common/Toast';

const AdminBilling = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Aggregate stats
  const [stats, setStats] = useState({
    totalBilled: 0,
    totalPaid: 0,
    totalPending: 0
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchBills = async () => {
    try {
      const data = await api.get('/api/bills');
      setBills(data);
      
      // Calculate Aggregations
      const billed = data.reduce((acc, curr) => acc + curr.total, 0);
      const paid = data.filter(b => b.status === 'Paid').reduce((acc, curr) => acc + curr.total, 0);
      const pending = data.filter(b => b.status === 'Pending').reduce((acc, curr) => acc + curr.total, 0);

      setStats({
        totalBilled: Math.round(billed),
        totalPaid: Math.round(paid),
        totalPending: Math.round(pending)
      });
    } catch (err) {
      setToastMessage('Error loading billing logs');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filteredBills = bills.filter(b => 
    b.patient?.name.toLowerCase().includes(search.toLowerCase()) ||
    b._id.includes(search)
  );

  return (
    <div>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Stats Aggregations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Receipt size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Billed Revenue</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>₹{stats.totalBilled}</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderLeft: '4px solid var(--success)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Revenue Collected (Paid)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)' }}>₹{stats.totalPaid}</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderLeft: '4px solid var(--warning)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--warning-light)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Outstanding Revenue (Pending)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--warning)' }}>₹{stats.totalPending}</div>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search invoice ID or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Bills logs list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Bills...</div>
      ) : filteredBills.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Billing Records Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Reception desk generates invoice statements upon checkout.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient Name</th>
                <th>Subtotal (Consult + Med + Lab + Room)</th>
                <th>Tax (15%)</th>
                <th>Total Bill</th>
                <th>Status</th>
                <th>Date Generated</th>
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
                  <td>{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBilling;
