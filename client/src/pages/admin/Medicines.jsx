import React, { useState, useEffect } from 'react';
import { Pill, Plus, Search, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    expiryDate: '',
    supplier: ''
  });

  // Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchMedicines = async () => {
    try {
      const data = await api.get('/api/medicines');
      setMedicines(data);
    } catch (err) {
      setToastMessage('Error loading medicine inventory');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setIsEdit(false);
    setSelectedId(null);
    setFormData({ name: '', price: '', stock: '', expiryDate: '', supplier: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (med) => {
    setIsEdit(true);
    setSelectedId(med._id);
    setFormData({
      name: med.name,
      price: med.price,
      stock: med.stock,
      expiryDate: med.expiryDate,
      supplier: med.supplier
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/api/medicines/${selectedId}`, formData);
        setToastMessage('Medicine stock updated successfully');
      } else {
        await api.post('/api/medicines', formData);
        setToastMessage('New medicine registered in inventory');
      }
      setToastType('success');
      setIsModalOpen(false);
      fetchMedicines();
    } catch (err) {
      setToastMessage(err.message || 'Error processing request');
      setToastType('error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this medicine?')) return;
    try {
      await api.delete(`/api/medicines/${id}`);
      setToastMessage('Medicine removed from directory');
      setToastType('success');
      fetchMedicines();
    } catch (err) {
      setToastMessage('Error deleting medicine');
      setToastType('error');
    }
  };

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(search.toLowerCase()) ||
    med.supplier.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search pharmacy inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} />
          Add Medicine
        </button>
      </div>

      {/* Directory list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Inventory...</div>
      ) : filteredMedicines.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Pill size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>Pharmacy Empty</h3>
          <p style={{ color: 'var(--text-muted)' }}>Click Add Medicine to populate pharmacy stock.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Retail Price</th>
                <th>Stock Level</th>
                <th>Expiry Date</th>
                <th>Supplier Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((med) => {
                const isLowStock = med.stock < 100;
                return (
                  <tr key={med._id}>
                    <td>
                      <div className="flex align-center gap-1">
                        <Pill size={16} style={{ color: 'var(--primary)' }} />
                        <span style={{ fontWeight: 600 }}>{med.name}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>₹{med.price}</td>
                    <td>
                      <div className="flex align-center gap-1">
                        <span className={`badge ${isLowStock ? 'badge-danger' : 'badge-success'}`}>
                          {med.stock} units
                        </span>
                        {isLowStock && (
                          <AlertTriangle size={14} style={{ color: 'var(--danger)' }} title="Restock Recommended" />
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{med.expiryDate}</span>
                    </td>
                    <td>{med.supplier || 'Generic Provider'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => handleOpenEdit(med)}>
                          <Edit size={12} />
                        </button>
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => handleDelete(med._id)}
                          style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.1)' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={isEdit ? 'Update Medicine Stock Details' : 'Register Pharmacy Medicine'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Medicine Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              placeholder="e.g. Paracetamol 500mg"
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              disabled={isEdit} // don't rename key
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price per Unit (₹)</label>
              <input 
                type="number" 
                className="form-control" 
                name="price" 
                placeholder="10"
                value={formData.price} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input 
                type="number" 
                className="form-control" 
                name="stock" 
                placeholder="200"
                value={formData.stock} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input 
                type="date" 
                className="form-control" 
                name="expiryDate" 
                value={formData.expiryDate} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Supplier Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="supplier" 
                placeholder="Apex Pharma Ltd"
                value={formData.supplier} 
                onChange={handleInputChange} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Update Stock' : 'Register Medicine'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminMedicines;
