import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Stethoscope, Heart, Brain, Eye, ShieldAlert, Users, Award, Clock, FolderHeart } from 'lucide-react';

const LandingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docsRes, deptsRes] = await Promise.all([
          fetch('/api/doctors'),
          fetch('/api/departments')
        ]);
        if (docsRes.ok) {
          const docsData = await docsRes.json();
          setDoctors(docsData);
        }
        if (deptsRes.ok) {
          const deptsData = await deptsRes.json();
          setDepartments(deptsData);
        }
      } catch (error) {
        console.error('Error fetching landing page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const backupDoctors = [
    {
      _id: 'doc1',
      name: 'Dr. John Doe',
      department: 'Cardiology',
      experience: 15,
      profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: 'doc2',
      name: 'Dr. Sarah Jenkins',
      department: 'Neurology',
      experience: 12,
      profileImage: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80'
    },
    {
      _id: 'doc3',
      name: 'Dr. Alex Mercer',
      department: 'General Medicine',
      experience: 8,
      profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const displayedDoctors = doctors.length > 0 ? doctors : backupDoctors;

  const deptIcons = {
    Cardiology: Heart,
    Neurology: Brain,
    ENT: Stethoscope,
    Orthopedics: Stethoscope,
    Ophthalmology: Eye,
    Dermatology: Stethoscope,
    'General Medicine': Stethoscope,
    Pediatrics: Users,
    Gynecology: FolderHeart,
    Gastroenterology: Stethoscope,
    Pulmonology: Stethoscope,
    Endocrinology: Stethoscope,
    Urology: Stethoscope,
    Oncology: Stethoscope,
    Psychiatry: Brain,
    Nephrology: Stethoscope,
    Rheumatology: Stethoscope,
  };

  const backupServices = [
    { icon: Heart, title: 'Cardiology', desc: 'Comprehensive heart care, vascular treatments, and ECG tests.' },
    { icon: Brain, title: 'Neurology', desc: 'Expert diagnosis and management of brain and spinal cord conditions.' },
    { icon: Stethoscope, title: 'General Medicine', desc: 'Daily healthcare consults, disease prevention, and wellness guidance.' },
    { icon: Eye, title: 'Eye Care', desc: 'Advanced vision screening, cataract surgeries, and laser treatments.' },
    { icon: ShieldAlert, title: 'Emergency 24/7', desc: 'Instant acute trauma management and intensive critical units.' }
  ];

  const displayedServices = departments.length > 0 
    ? departments.map(d => ({
        icon: deptIcons[d.name] || Stethoscope,
        title: d.name,
        desc: d.description
      }))
    : backupServices;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Navbar */}
      <header className="landing-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem' }}>
          <Activity size={32} />
          <span>MediCare</span>
        </div>
        <ul className="landing-nav-links">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#doctors">Doctors</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" className="btn btn-outline" style={{ textDecoration: 'none' }}>Login</Link>
          <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Register</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Your Health, <br /><span style={{ color: 'var(--primary)' }}>Our Priority</span></h1>
          <p>
            Welcome to MediCare, where we combine state-of-the-art medical systems with compassionate treatment. 
            Book appointments instantly with board-certified clinical specialists.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
              Book Appointment
            </Link>
            <a href="#services" className="btn btn-outline" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
              Our Services
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" 
            alt="Hospital Hallway" 
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-app)' }}>
        <div className="section-title">
          <h2>Our Specialized Services</h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            We provide advanced diagnostics and tailored medical treatments managed by expert healthcare units.
          </p>
        </div>
        <div className="services-grid">
          {displayedServices.map((ser, index) => {
            const Icon = ser.icon;
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <Icon size={28} />
                </div>
                <h3 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>{ser.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{ser.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{ padding: '5rem 5%', backgroundColor: 'var(--primary)', color: '#ffffff' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '3rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}><Stethoscope size={36} /></div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>250+</h3>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Specialist Doctors</p>
          </div>
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}><Users size={36} /></div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>20,000+</h3>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Happy Patients</p>
          </div>
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}><Award size={36} /></div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>50+</h3>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Specialty Departments</p>
          </div>
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}><Clock size={36} /></div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800 }}>24/7</h3>
            <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>Emergency Care</p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section id="doctors" style={{ padding: '5rem 0' }}>
        <div className="section-title">
          <h2>Meet Our Top Specialists</h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
            Book direct consultations with highly qualified experts.
          </p>
        </div>
        <div className="doctors-grid">
          {displayedDoctors.map((doc) => (
            <div key={doc._id} className="doctor-card">
              <img src={doc.profileImage || doc.user?.profileImage || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'} alt={doc.name} />
              <div className="doctor-info">
                <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>{doc.department}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0' }}>{doc.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  {doc.experience} Years Experience
                </p>
                <Link to="/login" className="btn btn-outline btn-sm" style={{ width: '100%', textDecoration: 'none' }}>
                  Book Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '5rem 5%', backgroundColor: 'var(--bg-app)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" 
              alt="Medical Care" 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}
            />
          </div>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>About Us</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
              Your Journey to Better Health Starts Here
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              At MediCare, we believe healthcare should be accessible, prompt, and of the highest caliber. 
              Our integrated digital system connects patients directly with our front desk, clinical experts, 
              ward management, and pharmacies.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontWeight: 700, color: '#1e1b4b' }}>Our Mission</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  To deliver stellar healthcare services supported by robust technology.
                </p>
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#1e1b4b' }}>Our Vision</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  To lead medical innovation and create a patient-centric ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={24} /> MediCare</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '1rem', lineHeight: 1.6 }}>
              Professional healthcare automation platforms connecting hospital wings into a single unified workspace.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#doctors">Doctors</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact Info</h4>
            <ul style={{ fontSize: '0.875rem' }}>
              <li>123 Hospital Road, Health City</li>
              <li>Emergency Line: +1 (555) 999-1234</li>
              <li>Support: support@medicare.com</li>
              <li>Operational Hours: 24/7</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MediCare HMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
