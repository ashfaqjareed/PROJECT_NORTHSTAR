import React from 'react';

export default function BentoCard({ children, className = '', accentColor = 'orange' }) {
  const hoverClass = accentColor === 'lime' ? 'hover:border-[var(--lime)]' : 'hover:border-[var(--orange)]';
  
  return (
    <div className={`group bg-[var(--bg)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 transition-all duration-300 ease-[var(--ease)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
