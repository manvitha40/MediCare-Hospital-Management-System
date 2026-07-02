import React, { useState, useEffect } from 'react';
import { BedDouble, Plus, Search, Edit } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const ReceptionistRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Allocation Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    status: 'Occupied',
    patientId: ''
  });

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchData = async () => {
    try {
      const [roomData, patData] = await Promise.all([
        api.get('/api/rooms'),
        api.get('/api/patients')
      ]);
      setRooms(roomData);
      setPatients(patData);
    } catch (err) {
      setToastMessage('Error loading clinic rooms registry');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAllocation = (room) => {
    setSelectedRoom(room);
    setFormData({
      status: room.status,
      patientId: room.patient?._id || ''
    });
    setIsModalOpen(true);
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/rooms/${selectedRoom.roomNumber}`, formData);
      setToastMessage(`Room ${selectedRoom.roomNumber} allocation updated successfully!`);
      setToastType('success');
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      setToastMessage('Error updating room allocation');
      setToastType('error');
    }
  };

  const handleVacateRoom = async (roomNumber) => {
    if (!window.confirm(`Are you sure you want to vacate Room ${roomNumber}?`)) {
      return;
    }

    try {
      await api.put(`/api/rooms/${roomNumber}`, { status: 'Available', patientId: '' });
      setToastMessage(`Room ${roomNumber} is now vacant`);
      setToastType('success');
      fetchData();
    } catch (err) {
      setToastMessage('Error vacating ward room');
      setToastType('error');
    }
  };

  const filteredRooms = rooms.filter(rm => 
    rm.roomNumber.includes(search) || 
    rm.roomType.toLowerCase().includes(search.toLowerCase())
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

      {/* Control bar */}
      <div className="flex justify-between align-center" style={{ marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Wards...</div>
      ) : filteredRooms.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Rooms Found</h3>
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
                      {rm.patient.name}
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
                  <button className="btn btn-outline btn-sm" style={{ width: '100%', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.1)' }} onClick={() => handleVacateRoom(rm.roomNumber)}>
                    Discharge & Vacate
                  </button>
                ) : rm.status === 'Maintenance' ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Under Maintenance</span>
                ) : (
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={() => handleOpenAllocation(rm)}>
                    Allocate Patient Bed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Allocate Bed Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Allocate Room ${selectedRoom?.roomNumber || ''}`}
      >
        <form onSubmit={handleAllocate}>
          <div className="form-group">
            <label className="form-label">Assign Patient</label>
            <select 
              className="form-control" 
              value={formData.patientId} 
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              required
            >
              <option value="">Choose Patient...</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name} ({p.gender}, {p.age} yrs)</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Allocation Status</label>
            <select 
              className="form-control" 
              value={formData.status} 
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Occupied">Occupied</option>
              <option value="Available">Available</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Allocation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistRooms;
