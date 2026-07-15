// src/components/Logo.jsx — real PNG logos, bigger sizes
import React from 'react';

export default function Logo({ variant = 'header', className = '', style = {} }) {
  if (variant === 'footer') {
    return (
      <img
        src="/logo-icon.png"
        alt="NorthStarDevs"
        className={className}
        style={{ height: '100px', width: 'auto', objectFit: 'contain', ...style }}
      />
    );
  }

  if (variant === 'icon') {
    return (
      <img
        src="/logo-icon.png"
        alt="NorthStarDevs"
        className={className}
        style={{ height: '44px', width: 'auto', objectFit: 'contain', ...style }}
      />
    );
  }

  // header — orange NORTHSTARDEVS wordmark, bigger
  return (
    <img
      src="/logo-header.png"
      alt="NorthStarDevs"
      className={className}
      style={{ height: '48px', width: 'auto', objectFit: 'contain', ...style }}
    />
  );
}
