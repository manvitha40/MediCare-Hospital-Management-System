import React from 'react';

const StatCard = ({ title, value, icon: Icon, type = 'primary' }) => {
  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: 'var(--success-light)', color: 'var(--success)' };
      case 'danger':
        return { bg: 'var(--danger-light)', color: 'var(--danger)' };
      case 'warning':
        return { bg: 'var(--warning-light)', color: 'var(--warning)' };
      case 'primary':
      default:
        return { bg: 'var(--primary-light)', color: 'var(--primary)' };
    }
  };

  const colors = getColors();

  return (
    <div className="card stat-card">
      <div 
        className="stat-icon" 
        style={{ backgroundColor: colors.bg, color: colors.color }}
      >
        <Icon size={24} />
      </div>
      <div>
        <div className="stat-label">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
