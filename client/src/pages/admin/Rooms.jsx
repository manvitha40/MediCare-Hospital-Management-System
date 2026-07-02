import React, { useState, useEffect } from 'react';
import { Bed, BedDouble, Search, AlertCircle, ShieldAlert } from 'lucide-react';
import { api } from '../../services/api';
import Toast from '../../components/common/Toast';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Notification states
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchRooms = async () => {
    try {
      const data = await api.get('/api/rooms');
      setRooms(data);
    } catch (err) {
      setToastMessage('Error loading clinic rooms checklist');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleStatusToggle = async (roomNumber, currentStatus) => {
    const nextStatus = currentStatus === 'Available' ? 'Maintenance' : 'Available';
    try {
      await api.put(`/api/rooms/${roomNumber}`, { status: nextStatus });
      setToastMessage(`Room ${roomNumber} set to ${nextStatus}`);
      setToastType('success');
      fetchRooms();
    } catch (err) {
      setToastMessage('Error modifying room status');
      setToastType('error');
    }
  };

  const filteredRooms = rooms.filter(rm => 
    rm.roomNumber.includes(search) || 
    rm.roomType.toLowerCase().includes(search.toLowerCase()) ||
    (rm.patient?.name && rm.patient.name.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return 'badge-success';
      case 'Occupied': return 'badge-danger';
      case 'Maintenance': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

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
            placeholder="Search room number, type, or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Ward Status...</div>
      ) : filteredRooms.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Bed size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Rooms Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try modifying your search term.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredRooms.map((rm) => (
            <div key={rm._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
              <div>
                <div className="flex justify-between align-center" style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 800 }}>Room {rm.roomNumber}</span>
                  <span className={`badge ${getStatusBadge(rm.status)}`}>{rm.status}</span>
                </div>
                
                <div className="flex align-center gap-1" style={{ marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                  <BedDouble size={16} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{rm.roomType} Type</span>
                </div>

                <div style={{ 
                  margin: '1rem 0',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-sm)',
                  minHeight: '60px'
                }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    Current Allocation
                  </span>
                  {rm.patient ? (
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {rm.patient.name} ({rm.patient.gender}, {rm.patient.age} yrs)
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      Vacant / Unassigned
                    </span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.875rem', marginTop: '1rem' }}>
                {rm.status === 'Occupied' ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Patient occupies ward bed
                  </span>
                ) : (
                  <button 
                    className="btn btn-outline btn-sm" 
                    style={{ width: '100%' }}
                    onClick={() => handleStatusToggle(rm.roomNumber, rm.status)}
                  >
                    {rm.status === 'Available' ? 'Mark for Maintenance' : 'Set as Available'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
