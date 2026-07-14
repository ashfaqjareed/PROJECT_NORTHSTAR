// src/components/Sidebar.jsx — Secondary nav only + WhatsApp pill (no dark mode toggle)
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, WhatsAppIcon, ArrowRightIcon } from '../icons';

const STAGGER = 0.03;

const TextRoll = ({ children, className = '' }) => (
  <motion.span
    initial="initial"
    whileHover="hovered"
    className={`relative block overflow-hidden ${className}`}
    style={{ lineHeight: 0.95 }}
  >
    <div>
      {children.split('').map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
          transition={{ ease: 'easeInOut', delay: STAGGER * i }}
          className="inline-block"
        >
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      ))}
    </div>
    <div style={{ position: 'absolute', inset: 0 }}>
      {children.split('').map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
          transition={{ ease: 'easeInOut', delay: STAGGER * i }}
          className="inline-block"
          style={{ color: 'var(--orange)' }}
        >
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      ))}
    </div>
  </motion.span>
);

// Pages not in the primary top-bar nav
const NAV_ITEMS = [
  { name: 'About Us', href: '/about'   },
  { name: 'Contact',  href: '/contact' },
  { name: 'Pricing',  href: '/pricing' },
  { name: 'Privacy',  href: '/privacy' },
  { name: 'Terms',    href: '/terms'   },
];

export default function Sidebar({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 99,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(88vw, 360px)',
              background: 'var(--bg)',
              borderLeft: '1px solid var(--border)',
              zIndex: 100,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* Top bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)',
              }}>Menu</span>

              <motion.button
                onClick={onClose}
                aria-label="Close menu"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'var(--bg-alt)', border: '1px solid var(--border)',
                  borderRadius: '999px', padding: '8px',
                  cursor: 'pointer', color: 'var(--text)', display: 'flex',
                }}
              >
                <XIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Nav links — centered, bold, large */}
            <nav style={{
              flex: 1, overflowY: 'auto',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '2rem 1.5rem',
            }}>
              <ul style={{
                listStyle: 'none', margin: 0, padding: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.25rem', width: '100%',
              }}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} style={{ width: '100%', textAlign: 'center' }}>
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      end={item.href === '/'}
                      style={{ textDecoration: 'none', display: 'block', padding: '0.5rem 0' }}
                    >
                      {({ isActive }) => (
                        <TextRoll
                          className={`font-display ${isActive ? 'text-[var(--orange)]' : 'text-[var(--text)]'}`}
                          style={{
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.name}
                        </TextRoll>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom — WhatsApp pill only */}
            <div style={{
              borderTop: '1px solid var(--border)',
              padding: '1.5rem',
            }}>
              <motion.a
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(37,211,102,0.45)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
                  padding: '1rem 1.75rem',
                  background: '#25D366',
                  borderRadius: '999px',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Shine sweep */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '200%', opacity: 1, transition: { duration: 0.5 } }}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
                    background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <WhatsAppIcon className="w-5 h-5" />
                <span>Message on WhatsApp</span>
                <ArrowRightIcon className="w-4 h-4" style={{ marginLeft: '0.25rem' }} />
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
