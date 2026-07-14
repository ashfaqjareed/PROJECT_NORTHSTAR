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
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      {...restProps}
    >
      <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center' }}>{children}</span>
      
      {/* Shine effect overlay */}
      <motion.div
        variants={{
          initial: { x: '-100%', opacity: 0 },
          hover: { 
            x: '100%', 
            opacity: 1, 
            transition: { duration: 0.6, ease: 'easeInOut' } 
          }
        }}
        initial="initial"
        style={{
          position: 'absolute',
          top: 0,
          left: '-50%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </Component>
  );
}
