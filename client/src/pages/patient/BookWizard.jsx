import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderHeart, Stethoscope, Calendar, ClipboardCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import Toast from '../../components/common/Toast';

const PatientBookWizard = () => {
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected values
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [reason, setReason] = useState('');
  // Added state for doctor list search and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('ranking'); // 'ranking', 'rating', 'experience', 'fee'
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depData, docData] = await Promise.all([
          api.get('/api/departments'),
          api.get('/api/doctors')
        ]);
        setDepartments(depData);
        setDoctors(docData);
      } catch (err) {
        setToastMessage('Error loading clinic data');
        setToastType('error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectDept = (deptName) => {
    setSelectedDept(deptName);
    setSelectedDoctor(null); // reset doctor choice if dept shifts
    setStep(2);
  };

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setStep(3);
  };

  const handleConfirmBooking = async () => {
    try {
      await api.post('/api/appointments', {
        doctorId: selectedDoctor._id,
        date: bookingDate,
        time: bookingTime,
        reason: reason
      });
      setStep(5); // Success step
    } catch (err) {
      setToastMessage('Failed to schedule appointment booking');
      setToastType('error');
    }
  };

  const getFilteredDoctors = () => {
    return doctors.filter(doc => doc.department.toLowerCase() === selectedDept.toLowerCase());
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading Wizard...</div>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}

      {/* Progress Tracker Steps (only for Step 1 to 4) */}
      {step <= 4 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
          {/* Subtle line background */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', height: '2px', backgroundColor: 'var(--border)', zIndex: 1 }}></div>
          
          <div style={{ zIndex: 2, textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--border)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 0.25rem auto' }}>1</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step >= 1 ? 'var(--text-main)' : 'var(--text-muted)' }}>Department</span>
          </div>
          <div style={{ zIndex: 2, textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 0.25rem auto' }}>2</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step >= 2 ? 'var(--text-main)' : 'var(--text-muted)' }}>Doctor</span>
          </div>
          <div style={{ zIndex: 2, textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--border)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 0.25rem auto' }}>3</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step >= 3 ? 'var(--text-main)' : 'var(--text-muted)' }}>Date & Time</span>
          </div>
          <div style={{ zIndex: 2, textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= 4 ? 'var(--primary)' : 'var(--border)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 0.25rem auto' }}>4</div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: step >= 4 ? 'var(--text-main)' : 'var(--text-muted)' }}>Confirm</span>
          </div>
        </div>
      )}

      {/* Step Panel Content */}
      <div className="card" style={{ padding: '2rem' }}>
        
        {/* STEP 1: SELECT DEPARTMENT */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
              Select Specialty Clinic
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {departments.map((dept) => (
                <button
                  key={dept._id}
                  onClick={() => handleSelectDept(dept.name)}
                  className="btn btn-outline"
                  style={{
                    padding: '1.5rem',
                    flexDirection: 'column',
                    height: '110px',
                    borderColor: selectedDept === dept.name ? 'var(--primary)' : 'var(--border)',
                    backgroundColor: selectedDept === dept.name ? 'var(--primary-light)' : '#ffffff',
                    gap: '0.5rem'
                  }}
                >
                  <FolderHeart size={24} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{dept.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DOCTOR */}
        {step === 2 && (() => {
          /* Search and sort state lifted to top level */

          // Get filtered list for the chosen department
          const unfilteredList = getFilteredDoctors();

          // Apply name search filter
          const searchedList = unfilteredList.filter(doc => 
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.qualification.toLowerCase().includes(searchQuery.toLowerCase())
          );

          // Compute rankings/sort based on state
          const sortedList = [...searchedList].sort((a, b) => {
            if (sortBy === 'ranking') {
              // Composite ranking formula: 70% rating (out of 5), 30% experience
              const scoreA = (a.rating || 4) * 20 * 0.7 + (a.experience || 0) * 0.3;
              const scoreB = (b.rating || 4) * 20 * 0.7 + (b.experience || 0) * 0.3;
              return scoreB - scoreA; // High score first
            }
            if (sortBy === 'rating') {
              return (b.rating || 0) - (a.rating || 0);
            }
            if (sortBy === 'experience') {
              return (b.experience || 0) - (a.experience || 0);
            }
            if (sortBy === 'fee') {
              return (a.fee || 0) - (b.fee || 0);
            }
            return 0;
          });

          // Helper to get total department ranking rank
          const getDepartmentRank = (doc) => {
            const allInDeptSorted = [...unfilteredList].sort((a, b) => {
              const scoreA = (a.rating || 4) * 20 * 0.7 + (a.experience || 0) * 0.3;
              const scoreB = (b.rating || 4) * 20 * 0.7 + (b.experience || 0) * 0.3;
              return scoreB - scoreA;
            });
            const index = allInDeptSorted.findIndex(d => d._id === doc._id);
            return index !== -1 ? index + 1 : null;
          };

          return (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button className="btn btn-outline btn-sm" onClick={() => setStep(1)} style={{ padding: '0.35rem' }}>
                  <ArrowLeft size={16} />
                </button>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Choose Consulting Specialist
                </h3>
              </div>

              {unfilteredList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No doctors currently available in the {selectedDept} department.</p>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }} onClick={() => setStep(1)}>Go Back</button>
                </div>
              ) : (
                <>
                  {/* Sorting & Searching Controls */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Search doctor by name or qualification..."
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1, height: '40px' }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        Showing {sortedList.length} of {unfilteredList.length} specialists
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort by:</span>
                        <select
                          className="form-control"
                          style={{ width: '150px', height: '32px', padding: '0 0.5rem', fontSize: '0.8rem' }}
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="ranking">Top Ranked</option>
                          <option value="rating">Highest Rating</option>
                          <option value="experience">Most Experience</option>
                          <option value="fee">Lowest Consultation Fee</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {sortedList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                      No doctor matches your search query.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {sortedList.map((doc) => {
                        const rank = getDepartmentRank(doc);
                        return (
                          <div 
                            key={doc._id} 
                            style={{
                              padding: '1.25rem',
                              border: '1px solid var(--border)',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: selectedDoctor?._id === doc._id ? 'var(--primary-light)' : '#ffffff',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.75rem',
                              transition: 'all 0.2s ease',
                              boxShadow: selectedDoctor?._id === doc._id ? '0 4px 12px rgba(var(--primary-rgb), 0.15)' : 'none'
                            }}
                            onClick={() => handleSelectDoctor(doc)}
                            onMouseEnter={(e) => {
                              if (selectedDoctor?._id !== doc._id) {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (selectedDoctor?._id !== doc._id) {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.boxShadow = 'none';
                              }
                            }}
                          >
                            <div className="flex align-start justify-between" style={{ gap: '1rem' }}>
                              <div className="flex align-start gap-2">
                                <div style={{ position: 'relative' }}>
                                  <div
  style={{
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "18px"
  }}
>
  {doc.name.replace("Dr. ", "").charAt(0)}
</div>
                                  {rank && rank <= 3 && (
                                    <span style={{
                                      position: 'absolute',
                                      bottom: '-4px',
                                      right: '-4px',
                                      backgroundColor: rank === 1 ? '#D4AF37' : rank === 2 ? '#C0C0C0' : '#CD7F32',
                                      color: '#ffffff',
                                      fontSize: '0.65rem',
                                      fontWeight: 800,
                                      padding: '0.1rem 0.35rem',
                                      borderRadius: '4px',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                    }}>
                                      #{rank}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>{doc.name}</span>
                                    {rank && rank <= 2 && (
                                      <span style={{
                                        fontSize: '0.65rem',
                                        backgroundColor: 'var(--primary-light)',
                                        color: 'var(--primary)',
                                        fontWeight: 700,
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '10px'
                                      }}>
                                        Top Specialist
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                                    {doc.qualification}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                                      ⭐ {(doc.rating || 4.5).toFixed(1)} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({doc.reviewCount || 10} reviews)</span>
                                    </span>
                                    <span style={{ color: 'var(--border)' }}>|</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
                                      💼 {doc.experience} Years Exp
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fee</div>
                                <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.25rem', marginTop: '0.1rem' }}>₹{doc.fee}</div>
                              </div>
                            </div>
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              fontSize: '0.75rem', 
                              color: 'var(--primary)', 
                              fontWeight: 600,
                              backgroundColor: 'var(--bg-app)',
                              padding: '0.5rem 0.75rem',
                              borderRadius: 'var(--radius-sm)'
                            }}>
                              <span>🗓️ {doc.availableDays.join(', ')}</span>
                              <span style={{ color: 'var(--text-muted)' }}>🕒 {doc.availableTime}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })()}

        {/* STEP 3: SELECT DATE & TIME */}
        {step === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setStep(2)} style={{ padding: '0.35rem' }}>
                <ArrowLeft size={16} />
              </button>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Select appointment slot
              </h3>
            </div>

            <div className="form-group">
              <label className="form-label">Consultation Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={bookingDate} 
                onChange={(e) => setBookingDate(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time Slot Slot</label>
              <select className="form-control" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => {
                if (!bookingDate) {
                  alert('Please choose a valid date.');
                  return;
                }
                setStep(4);
              }}>
                Continue <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REASON & CONFIRM */}
        {step === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setStep(3)} style={{ padding: '0.35rem' }}>
                <ArrowLeft size={16} />
              </button>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Confirm details
              </h3>
            </div>

            {/* Summary Details */}
            <div style={{ 
              backgroundColor: 'var(--bg-app)', 
              padding: '1.25rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)',
              marginBottom: '1.5rem' 
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Department Specialty</span>
                  <span style={{ fontWeight: 700 }}>{selectedDept}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Consulting Doctor</span>
                  <span style={{ fontWeight: 700 }}>{selectedDoctor?.name}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Appointment Date</span>
                  <span style={{ fontWeight: 700 }}>{bookingDate}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Time Slot Slot</span>
                  <span style={{ fontWeight: 700 }}>{bookingTime}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Doctor consulting fee</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{selectedDoctor?.fee}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Scheduling (Brief symptoms/complaints)</label>
              <textarea 
                className="form-control" 
                rows="2" 
                placeholder="e.g. Mild chest pain, routine checkup..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleConfirmBooking}>
              Confirm & Book Appointment
            </button>
          </div>
        )}

        {/* STEP 5: SUCCESS PANEL */}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--success)', marginBottom: '1rem', strokeWidth: 1.5 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Booking Confirmed!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
              Your appointment with {selectedDoctor?.name} has been submitted. You can check its validation status in the My Appointments log.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/patient')}>
                Go to Dashboard
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => {
                setSelectedDept('');
                setSelectedDoctor(null);
                setBookingDate('');
                setReason('');
                setStep(1);
              }}>
                Book Another
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientBookWizard;
