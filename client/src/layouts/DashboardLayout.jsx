import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

const DashboardLayout = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If still loading session details, show a clean spinner
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--primary)',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        <div className="flex flex-col align-center gap-2">
          <div style={{
            width: 40,
            height: 40,
            border: '4px solid var(--border)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span>Loading MediCare Portal...</span>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authorize user role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If unauthorized, redirect to their default landing dashboard
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Resolve Navbar title based on active path
  const getNavbarTitle = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length <= 1) return 'Overview';
    return paths[1].replace('-', ' ');
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-panel">
        <Navbar title={getNavbarTitle()} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
