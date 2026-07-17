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
      whileHover="hover"
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

      {/* Shine effect overlay */}
      <motion.div
        variants={{
          initial: { x: '-100%', opacity: 0 },
          hover: { 
            x: '100%', 
            opacity: 1, 
            transition: { duration: 0.8, ease: 'easeInOut' } 
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: '-50%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      {/* Dynamic border color on hover */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.2 } }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '32px',
          border: `1px solid var(--${accent})`,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}
