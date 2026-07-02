import React, { useState, useEffect } from 'react';
import { Calendar, Search, Edit, FilePlus, Check, X, ShieldAlert, Plus, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [medicinesList, setMedicinesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Prescription Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Dynamic Prescription lines
  const [prescriptionLines, setPrescriptionLines] = useState([
    { name: '', dosage: '', duration: '', frequency: '1-0-1' }
  ]);
  const [notes, setNotes] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchAppointmentsAndMeds = async () => {
    try {
      const [appData, medData] = await Promise.all([
        api.get('/api/appointments'),
        api.get('/api/medicines')
      ]);
      setAppointments(appData);
      setMedicinesList(medData);
    } catch (err) {
      setToastMessage('Error loading clinic appointments');
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsAndMeds();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/api/appointments/${id}`, { status });
      setToastMessage(`Appointment set to ${status}`);
      setToastType('success');
      fetchAppointmentsAndMeds();
    } catch (err) {
      setToastMessage('Failed to update appointment status');
      setToastType('error');
    }
  };

  const handleOpenPrescribe = (app) => {
    setSelectedAppointment(app);
    setPrescriptionLines([{ name: '', dosage: '', duration: '', frequency: '1-0-1' }]);
    setNotes('');
    setIsModalOpen(true);
  };

  const handlePrescriptionLineChange = (index, field, val) => {
    const updated = [...prescriptionLines];
    updated[index][field] = val;
    setPrescriptionLines(updated);
  };

  const addPrescriptionLine = () => {
    setPrescriptionLines([...prescriptionLines, { name: '', dosage: '', duration: '', frequency: '1-0-1' }]);
  };

  const removePrescriptionLine = (index) => {
    if (prescriptionLines.length === 1) return;
    const updated = prescriptionLines.filter((_, idx) => idx !== index);
    setPrescriptionLines(updated);
  };

  const handleSavePrescription = async (e) => {
    e.preventDefault();
    // Validate
    const invalid = prescriptionLines.some(line => !line.name || !line.dosage || !line.duration);
    if (invalid) {
      alert('Please fill out all prescription fields.');
      return;
    }

    try {
      await api.post('/api/prescriptions', {
        appointmentId: selectedAppointment._id,
        medicines: prescriptionLines,
        notes
      });

      // Calculate totals for a matching bill!
      // Consultation fee is doctor's fee.
      const docFee = selectedAppointment.doctor?.fee || 500;
      
      // Medicine fee is sum of prices of selected medicines in inventory.
      let medFeeTotal = 0;
      prescriptionLines.forEach(line => {
        const foundMed = medicinesList.find(m => m.name.toLowerCase() === line.name.toLowerCase());
        if (foundMed) {
          medFeeTotal += foundMed.price;
        } else {
          medFeeTotal += 20; // default generic mock price
        }
      });

      // Automatically generate a billing invoice! This is a stellar full-stack clinical flow detail!
      await api.post('/api/bills', {
        patientId: selectedAppointment.patient?._id || selectedAppointment.patient,
        appointmentId: selectedAppointment._id,
        consultationFee: docFee,
        medicineFee: medFeeTotal,
        labFee: 0,
        roomCharges: 0
      });

      setToastMessage('Prescription written and invoice generated successfully!');
      setToastType('success');
      setIsModalOpen(false);
      fetchAppointmentsAndMeds();
    } catch (err) {
      setToastMessage('Error writing patient prescription');
      setToastType('error');
    }
  };

  const filteredAppointments = appointments.filter(app => 
    (app.patient?.name && app.patient.name.toLowerCase().includes(search.toLowerCase())) ||
    app.status.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Completed': return 'badge-primary';
      case 'Cancelled': return 'badge-danger';
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
            placeholder="Search appointments by patient or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Appointments...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Calendar size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Appointments Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>You will see scheduled checkups here once patient/reception bookings are active.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Patient Details</th>
                <th>Reason for Visit</th>
                <th>Consult Status</th>
                <th>Clinical Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="flex flex-col">
                      <span style={{ fontWeight: 600 }}>{app.date}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.time}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex align-center gap-2">
                      <img 
                        src={app.patient?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                        alt={app.patient?.name} 
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div className="flex flex-col">
                        <span style={{ fontWeight: 600 }}>{app.patient?.name || 'Unknown Patient'}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Age: {app.patient?.age || 'N/A'} | Gender: {app.patient?.gender || 'N/A'} | BG: {app.patient?.bloodGroup || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', display: 'block', maxWidth: '250px' }}>{app.reason}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
                  </td>
                  <td>
                    {app.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button className="btn btn-primary btn-sm flex align-center gap-1" onClick={() => handleUpdateStatus(app._id, 'Confirmed')}>
                          <Check size={12} /> Confirm
                        </button>
                        <button className="btn btn-outline btn-sm flex align-center gap-1" style={{ color: 'var(--danger)' }} onClick={() => handleUpdateStatus(app._id, 'Cancelled')}>
                          <X size={12} /> Cancel
                        </button>
                      </div>
                    )}
                    {app.status === 'Confirmed' && (
                      <button className="btn btn-secondary btn-sm flex align-center gap-1" onClick={() => handleOpenPrescribe(app)}>
                        <FilePlus size={12} /> Consult & Prescribe
                      </button>
                    )}
                    {app.status === 'Completed' && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>
                        Treatment Completed
                      </span>
                    )}
                    {app.status === 'Cancelled' && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Prescription Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Diagnose Patient: ${selectedAppointment?.patient?.name || ''}`}
      >
        <form onSubmit={handleSavePrescription}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Add Medicines & Dosages
            </h4>
            
            {prescriptionLines.map((line, index) => (
              <div key={index} className="flex align-center gap-1" style={{ marginBottom: '0.5rem' }}>
                
                {/* Medicine Selector */}
                <select
                  className="form-control"
                  style={{ flex: 2 }}
                  value={line.name}
                  onChange={(e) => handlePrescriptionLineChange(index, 'name', e.target.value)}
                  required
                >
                  <option value="">Select Medicine...</option>
                  {medicinesList.map(med => (
                    <option key={med._id} value={med.name}>
                      {med.name} (₹{med.price}) - Stock: {med.stock}
                    </option>
                  ))}
                  <option value="Custom Paracetamol 500mg">Paracetamol 500mg (Generic)</option>
                  <option value="Custom Amoxicillin 250mg">Amoxicillin 250mg (Generic)</option>
                  <option value="Custom MultiVitamins">Multivitamin Cap (Generic)</option>
                </select>

                {/* Dosage */}
                <input
                  type="text"
                  className="form-control"
                  style={{ flex: 1 }}
                  placeholder="e.g. 1 tablet"
                  value={line.dosage}
                  onChange={(e) => handlePrescriptionLineChange(index, 'dosage', e.target.value)}
                  required
                />

                {/* Duration */}
                <input
                  type="text"
                  className="form-control"
                  style={{ flex: 1 }}
                  placeholder="e.g. 5 days"
                  value={line.duration}
                  onChange={(e) => handlePrescriptionLineChange(index, 'duration', e.target.value)}
                  required
                />

                {/* Frequency */}
                <select
                  className="form-control"
                  style={{ flex: 1.2 }}
                  value={line.frequency}
                  onChange={(e) => handlePrescriptionLineChange(index, 'frequency', e.target.value)}
                >
                  <option value="1-0-1">Morning-Night (1-0-1)</option>
                  <option value="1-1-1">Mor-Aft-Night (1-1-1)</option>
                  <option value="1-0-0">Morning Only (1-0-0)</option>
                  <option value="0-0-1">Night Only (0-0-1)</option>
                  <option value="As needed">As needed (PRN)</option>
                </select>

                {prescriptionLines.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    style={{ padding: '0.5rem', color: 'var(--danger)' }}
                    onClick={() => removePrescriptionLine(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button 
              type="button" 
              className="btn btn-secondary btn-sm flex align-center gap-1" 
              style={{ marginTop: '0.5rem' }} 
              onClick={addPrescriptionLine}
            >
              <Plus size={12} /> Add Row
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Diagnosis Notes & Special Instructions</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="e.g. Rest in bed. Drink plenty of warm water. Avoid cold food items."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Diagnosis
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorAppointments;
