import React from 'react';
import { motion } from 'framer-motion';

export default function ServicePill({ icon, label, description, accent = 'orange', className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden border ${className}`}
      style={{
        borderRadius: '32px',
        borderColor: 'var(--border)',
        background: 'linear-gradient(145deg, var(--bg-alt) 0%, var(--bg) 100%)',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
      initial="initial"
    >
      <div 
        className="flex-shrink-0"
        style={{
          color: accent === 'orange' ? 'var(--orange)' : 'var(--lime)'
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1 z-10 relative">
        <h3 className="font-sans font-bold text-[var(--text)] text-lg leading-tight">
          {label}
        </h3>
        <p className="font-sans text-[var(--text-muted)] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
