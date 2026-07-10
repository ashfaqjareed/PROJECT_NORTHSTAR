import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../icons';

export default function PricingPill({ 
  tier, 
  price, 
  desc, 
  features, 
  accent = 'lime', 
  featured = false 
}) {
  const accentColor = accent === 'orange' ? 'var(--orange)' : 'var(--lime)';
  
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative flex flex-col h-full bg-[var(--bg)] border p-8"
      style={{
        borderRadius: '32px',
        borderColor: featured ? accentColor : 'var(--border)',
        boxShadow: featured ? `0 0 0 1px ${accentColor}` : 'none',
        y: featured ? -12 : 0,
        scale: featured ? 1.02 : 1,
        zIndex: featured ? 10 : 1,
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-4 left-8">
          <span className="font-mono text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full" style={{ background: accentColor, color: 'var(--white-locked)' }}>
            Recommended
          </span>
        </div>
      )}

      {/* Shine effect overlay on hover */}
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
          position: 'absolute', inset: 0,
          background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
          borderRadius: '32px', zIndex: 1, pointerEvents: 'none',
        }}
      />
      
      {/* Dynamic border color on hover (for non-featured) */}
      {!featured && (
        <motion.div
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.2 } }
          }}
          style={{
            position: 'absolute', inset: 0,
            borderRadius: '32px', border: `1px solid ${accentColor}`,
            zIndex: 0, pointerEvents: 'none',
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2">
          {tier}
        </p>
        
        <div className="font-display text-[1.75rem] mb-3" style={{ color: accent === 'orange' ? 'var(--brand-orange)' : 'var(--text)' }}>
          {price}
          {price !== "Let's talk" && price !== "Custom" && (
            <span className="font-sans text-[0.9rem] text-[var(--text-muted)] font-normal ml-2">USD</span>
          )}
        </div>

        <p className="font-sans text-[0.875rem] text-[var(--text-muted)] leading-relaxed mb-6 flex-1">
          {desc}
        </p>

        <ul className="flex flex-col gap-2 mb-8 list-none p-0 m-0">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 font-sans text-[0.875rem]">
              <CheckIcon className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: accentColor }} />
              <span className="text-[var(--text)]">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/pricing"
          className="flex items-center justify-center font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 transition-opacity"
          style={{
            background: featured ? accentColor : 'var(--bg-alt)',
            color: featured ? 'var(--white-locked)' : 'var(--text)',
            borderRadius: '999px',
            border: featured ? 'none' : '1px solid var(--border)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          See Full Details
        </Link>
      </div>
    </motion.div>
  );
}
