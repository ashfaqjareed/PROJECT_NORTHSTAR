import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon } from '../icons';

// Resolve accent to a concrete color
function resolveAccent(accent, accentHex) {
  if (accent === 'none' || (!accent && !accentHex)) return null; // no color
  if (accentHex) return accentHex;
  if (accent === 'orange') return 'var(--orange)';
  if (accent === 'red')    return '#ef4444';
  if (accent === 'lime')   return '#22c55e';
  return null;
}

export default function PricingPill({ 
  slug,
  tier, 
  price,
  desc, 
  features, 
  accent = 'none', 
  accentHex = null,
  featured = false,
  badgeText,
}) {
  const color = resolveAccent(accent, accentHex);
  const borderColor = featured && color ? color : 'var(--border)';
  const badgeColor  = color || 'var(--orange)';

  return (
    <motion.div
      className="relative flex flex-col w-full"
      style={{
        background: 'var(--bg)',
        border: `2px solid ${borderColor}`,
        borderRadius: '28px',
        boxShadow: featured && color ? `0 0 0 1px ${color}33` : 'none',
        transform: featured ? 'translateY(-10px) scale(1.03)' : 'none',
        zIndex: featured ? 10 : 1,
      }}
    >
      {/* Badge bridging the top border — only shown when there's a badge */}
      {badgeText && (
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}>
          <span
            className="font-mono text-[9px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full whitespace-nowrap"
            style={{ background: badgeColor, color: '#ffffff' }}
          >
            {badgeText}
          </span>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full p-7 pt-9">
        {/* Tier name */}
        <p
          className="font-mono text-[10px] uppercase tracking-widest font-bold mb-2"
          style={{ color: color || 'var(--text-muted)' }}
        >
          {tier}
        </p>

        {/* Price */}
        <div className="mb-4">
          <div className="font-display leading-tight text-[var(--text)]" style={{ fontSize: '1.55rem' }}>
            {price}
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-[0.875rem] text-[var(--text-muted)] leading-relaxed mb-5">
          {desc}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-2 mb-6 list-none p-0 m-0 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 font-sans text-[0.875rem]">
              <CheckIcon
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: color || 'var(--text-muted)' }}
              />
              <span className="text-[var(--text)]">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to={`/pricing/${slug}`}
          className="flex items-center justify-center font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 transition-opacity"
          style={{
            background: featured && color ? color : 'transparent',
            color: featured && color ? '#ffffff' : (color || 'var(--text)'),
            borderRadius: '999px',
            border: `1.5px solid ${featured && color ? color : 'var(--border)'}`,
            textDecoration: 'none',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          See Full Details →
        </Link>
      </div>
    </motion.div>
  );
}
