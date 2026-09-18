import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PillButton({ 
  children, 
  variant = 'orange', 
  as = 'button', 
  className = '', 
  ...props 
}) {
  const getStyles = () => {
    switch(variant) {
      case 'orange':
        return {
          background: 'var(--orange)',
          color: 'var(--white-locked)'
        };
      case 'lime':
        return {
          background: 'var(--lime)',
          color: 'var(--header-text-locked)'
        };
      case 'neutral':
      default:
        return {
          background: 'var(--bg-alt)',
          color: 'var(--text)',
          border: '1px solid var(--border)'
        };
    }
  };

  const baseStyles = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '999px',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    fontWeight: 500,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 2.5rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    ...getStyles()
  };

  const Component = as === 'link' ? motion(Link) : as === 'a' ? motion.a : motion.button;
  
  // Custom props routing based on component type
  if (as === 'link' && props.href) {
    props.to = props.href;
    delete props.href;
  }

  const { style: customStyle, ...restProps } = props;

  return (
    <Component
      style={{ ...baseStyles, ...customStyle }}
      className={className}
      whileTap={{ scale: 0.97 }}
      {...restProps}
    >
      <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center' }}>{children}</span>
    </Component>
  );
}
