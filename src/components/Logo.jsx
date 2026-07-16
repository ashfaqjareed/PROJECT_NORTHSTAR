// src/components/Logo.jsx — real PNG logos, correct sizes
import React from 'react';

export default function Logo({ variant = 'header', className = '', style = {} }) {
  if (variant === 'footer') {
    // Footer logo — removed, using text wordmark instead
    return null;
  }

  if (variant === 'icon') {
    return (
      <img
        src="/N1.png"
        alt="NorthStarDevs"
        className={className}
        style={{ height: '40px', width: 'auto', objectFit: 'contain', ...style }}
      />
    );
  }

  // header — show the actual logo image at a sensible size
  return (
    <img
      src="/NDS1.png"
      alt="NorthStarDevs"
      className={className}
      style={{ height: '200px', width: 'auto', objectFit: 'contain', ...style }}
    />
  );
}
