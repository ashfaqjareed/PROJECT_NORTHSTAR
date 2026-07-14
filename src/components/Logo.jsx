// src/components/Logo.jsx — real PNG logos from /public
import React from 'react';

export default function Logo({ variant = 'header', className = '', style = {} }) {
  if (variant === 'footer') {
    // Lime N-star icon for footer
    return (
      <img
        src="/logo-icon.png"
        alt="NorthStarDevs"
        className={className}
        style={{ height: '80px', width: 'auto', objectFit: 'contain', ...style }}
      />
    );
  }

  if (variant === 'icon') {
    // Lime N-star icon (small, for favicon use in-app)
    return (
      <img
        src="/logo-icon.png"
        alt="NorthStarDevs"
        className={className}
        style={{ height: '36px', width: 'auto', objectFit: 'contain', ...style }}
      />
    );
  }

  // Default: header — orange NORTHSTARDEVS wordmark
  return (
    <img
      src="/logo-header.png"
      alt="NorthStarDevs"
      className={className}
      style={{ height: '36px', width: 'auto', objectFit: 'contain', ...style }}
    />
  );
}
