import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = ({ title }) => {
  const { user, logout } = useAuth();

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin': return 'badge-danger';
      case 'doctor': return 'badge-primary';
      case 'receptionist': return 'badge-warning';
      case 'patient': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  return (
    <nav className="top-navbar">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, textTransform: 'capitalize' }}>
        {title || 'Dashboard'}
      </h2>
      
      <div className="navbar-user">
        <span className={`badge ${getRoleBadgeClass(user?.role)}`} style={{ textTransform: 'capitalize' }}>
          {user?.role}
        </span>
        
        <div className="flex align-center gap-1">
          {user?.profileImage && !user.profileImage.includes('photo-') && !user.profileImage.includes('default') ? (
            <img 
              src={user.profileImage} 
              alt={user.name} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }}
            />
          ) : (
            <div 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                background: user?.role === 'admin' 
                  ? 'linear-gradient(135deg, #1e40af, #3b82f6)' 
                  : user?.role === 'patient' 
                    ? 'linear-gradient(135deg, #0f766e, #14b8a6)' 
                    : user?.role === 'doctor'
                      ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                      : 'linear-gradient(135deg, #b45309, #f59e0b)', 
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)',
                fontWeight: 'bold',
                fontSize: '16px',
                textTransform: 'uppercase'
              }}
            >
              {user?.name ? user.name.replace("Dr. ", "").charAt(0) : 'U'}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</span>
          </div>
        </div>

        <button 
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '1rem',
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
