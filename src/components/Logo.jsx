// src/components/Logo.jsx — variant-based logo with swappable SVG assets
import React from 'react';
import logoHeader from '../assets/logo-header.svg';
import logoFooter from '../assets/logo-footer.svg';

export default function Logo({ variant = 'header', className = '' }) {
  if (variant === 'favicon') {
    // Favicon is referenced directly via <link> in index.html — /public/favicon.svg
    // This render is for in-app usage if ever needed
    return (
      <img
        src="/favicon.svg"
        alt="NorthStarDevs"
        className={className}
        style={{ width: '1em', height: '1em' }}
      />
    );
  }

  const src = variant === 'footer' ? logoFooter : logoHeader;

  return (
    <img
      src={src}
      alt="NorthStarDevs"
      className={className}
      style={{ height: '24px', width: 'auto' }}
    />
  );
}
