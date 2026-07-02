import React from 'react';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';

const HospitalInfoCard = () => {
  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header flex align-center gap-1">
        <Building2 size={20} style={{ color: 'var(--primary)' }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>🏥 MediCare General Hospital</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', padding: '0.5rem 0' }}>

        {/* Address */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <MapPin size={13} /> Address
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
            MediCare General Hospital<br />
            45, Health Care Avenue,<br />
            Madhapur,<br />
            Hyderabad, Telangana – 500081,<br />
            India
          </p>
        </div>

        {/* Phone Numbers */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Phone size={13} /> Phone Numbers
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.8, margin: 0 }}>
            <div><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Reception:</span><br /><strong>+91 40 4567 8901</strong></div>
            <div style={{ marginTop: '0.35rem' }}><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Appointments:</span><br /><strong>+91 40 4567 8902</strong></div>
            <div style={{ marginTop: '0.35rem' }}><span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>Emergency (24×7):</span><br /><strong style={{ color: 'var(--danger)' }}>+91 40 4567 8999</strong></div>
            <div style={{ marginTop: '0.35rem' }}><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ambulance:</span><br /><strong>+91 98765 43210</strong></div>
          </div>
        </div>

        {/* Email */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Mail size={13} /> Email
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.8, margin: 0 }}>
            <div><a href="mailto:info@medicaregeneralhospital.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>info@medicaregeneralhospital.com</a></div>
            <div><a href="mailto:appointments@medicaregeneralhospital.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>appointments@medicaregeneralhospital.com</a></div>
            <div><a href="mailto:emergency@medicaregeneralhospital.com" style={{ color: 'var(--danger)', textDecoration: 'none' }}>emergency@medicaregeneralhospital.com</a></div>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Clock size={13} /> Working Hours
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.7, margin: 0 }}>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Outpatient (OPD):</span><br />
              <strong>Monday – Saturday</strong><br />
              8:00 AM – 8:00 PM
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>Emergency Services:</span><br />
              <strong style={{ color: 'var(--danger)' }}>24 Hours × 7 Days</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Map embed */}
      <div style={{ marginTop: '1.25rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <iframe
          title="MediCare General Hospital Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2973!2d78.3892!3d17.4485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688bbb35c0a8a1!2sMadhapur%2C+Hyderabad%2C+Telangana!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          width="100%"
          height="200"
          style={{ border: 'none', display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default HospitalInfoCard;
