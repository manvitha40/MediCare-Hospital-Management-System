import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      
      // Determine redirection page based on role
      const role = data.user.role;
      if (from && from.startsWith(`/${role}`)) {
        navigate(from, { replace: true });
      } else {
        navigate(`/${role}`, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (roleEmail, rolePwd) => {
    setEmail(roleEmail);
    setPassword(rolePwd);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem' }}>
            <Activity size={24} />
            <span>MediCare HMS</span>
          </Link>
          <h2>Welcome Back</h2>
          <p>Sign in to access your customized dashboard</p>
        </div>

        {error && (
          <div className="badge badge-danger flex align-center gap-1" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              className="form-control" 
              type="email" 
              id="email" 
              placeholder="name@medicare.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              className="form-control" 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', height: '42px' }}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link to="/register" style={{ fontWeight: 600 }}>Create patient account</Link>
        </div>

        {/* Demo Quick Fill Controls */}
        <div style={{ 
          marginTop: '2rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid var(--border)',
        }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center' }}>
            Demo Profiles Quick-Fill
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => handleQuickFill('admin@medicare.com', 'admin123')}
              style={{ fontSize: '0.7rem', padding: '0.35rem' }}
            >
              Admin Portal
            </button>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => handleQuickFill('john@medicare.com', 'doctor123')}
              style={{ fontSize: '0.7rem', padding: '0.35rem' }}
            >
              Doctor Portal
            </button>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => handleQuickFill('pooja.reception@medicare.com', 'reception123')}
              style={{ fontSize: '0.7rem', padding: '0.35rem' }}
            >
              Reception Desk
            </button>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => handleQuickFill('rahul@gmail.com', 'patient123')}
              style={{ fontSize: '0.7rem', padding: '0.35rem' }}
            >
              Patient Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
