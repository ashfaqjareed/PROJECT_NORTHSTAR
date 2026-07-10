import React from 'react';

export default function Logo({ variant = 'header', className = '' }) {
  // If we had actual assets, we'd import them here like:
  // import HeaderLogo from '../assets/logo-header.svg';
  // ...
  
  if (variant === 'favicon') {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 64 64" 
        className={className} 
        style={{ width: '1em', height: '1em' }}
      >
        <rect width="64" height="64" rx="16" fill="var(--lime)" />
        <text 
          x="50%" y="55%" 
          fontFamily="var(--font-display)" 
          fontSize="40" 
          fontWeight="900" 
          fill="var(--header-text-locked)" 
          textAnchor="middle" 
          alignmentBaseline="middle"
        >
          N
        </text>
      </svg>
    );
  }

  const isFooter = variant === 'footer';
  const textColor = isFooter ? 'var(--footer-text-locked)' : 'var(--header-text-locked)';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 300 48" 
      className={className} 
      style={{ height: '24px', width: 'auto' }}
    >
      <text 
        x="0" y="32" 
        fontFamily="var(--font-display)" 
        fontSize="24" 
        fontWeight="900" 
        fill={textColor} 
        letterSpacing="-0.02em"
      >
        NORTHSTAR
        <tspan fill={textColor} fillOpacity={isFooter ? "0.7" : "0.45"}>
          DEVS
        </tspan>
      </text>
    </svg>
  );
}
