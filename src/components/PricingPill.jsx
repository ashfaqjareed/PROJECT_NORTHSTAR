import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../icons';

export default function PricingPill({ 
  slug,
  tier, 
  price,    // lkr value
  desc, 
  features, 
  accent = 'lime', 
  featured = false,
  badgeText = 'Recommended',
  customStrokeColor = null
}) {
  const accentColor = customStrokeColor || (accent === 'orange' ? 'var(--orange)' : 'var(--lime)');
  const isCustom = price === "Let's talk" || price === 'Custom';
  
  return (
    <motion.div
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
            {badgeText}
          </span>
        </div>
      )}



      <div className="relative z-10 flex flex-col h-full">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2">
          {tier}
        </p>
        
        {/* LKR Primary Price */}
        <div className="mb-1">
          <div className="font-display text-[1.6rem] leading-tight" style={{ color: accent === 'orange' ? 'var(--brand-orange)' : 'var(--text)' }}>
            {price}
            {!isCustom && (
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest ml-2 align-middle" style={{ color: accentColor }}>
                LKR
              </span>
            )}
          </div>
        </div>

        <p className="font-sans text-[0.875rem] text-[var(--text-muted)] leading-relaxed mb-6 flex-1 mt-3">
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
          to={`/pricing/${slug}`}
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
