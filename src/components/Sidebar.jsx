// src/components/Sidebar.jsx — Fixed TextRoll String Bug & Clean Navigation Drawer
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, WhatsAppIcon, ArrowRightIcon } from '../icons';
import { PAGE_VISIBILITY } from '../config';
import { useTheme } from '../context/ThemeContext';

const GOOGLE_FORM_URL = 'https://forms.gle/NFh3nKCzf8ER6ZMU7';
const STAGGER = 0.012;

// TextRoll animation — takes string `text` prop to prevent [object Object] coercion bugs
const TextRoll = ({ text, style = {} }) => {
  const str = typeof text === 'string' ? text : String(text || '');
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', lineHeight: 1.15, ...style }}
    >
      <span style={{ display: 'block' }}>
        {str.split('').map((l, i) => (
          <motion.span
            key={`a-${i}`}
            variants={{ initial: { y: 0, opacity: 1 }, hovered: { y: '-40%', opacity: 0 } }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.25, delay: STAGGER * i }}
            style={{ display: 'inline-block' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </span>

      <span style={{ position: 'absolute', inset: 0 }}>
        {str.split('').map((l, i) => (
          <motion.span
            key={`b-${i}`}
            variants={{ initial: { y: '40%', opacity: 0 }, hovered: { y: 0, opacity: 1 } }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.25, delay: STAGGER * i }}
            style={{ display: 'inline-block', color: 'var(--orange)' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
};

const NAV_ITEMS = [
  { name: 'Home', href: '/', id: 'home', subtext: 'Welcome & Core Highlights' },
  { name: 'Services', href: '/services', id: 'services', subtext: 'Custom Web Apps & Software' },
  { name: 'Projects', href: '/projects', id: 'projects', subtext: 'Portfolio & Completed Work' },
  { name: 'Pricing', href: '/pricing', id: 'pricing', subtext: 'Transparent Packages & Tiering' },
  { name: 'Process', href: '/process', id: 'process', subtext: 'Our 4-Step Engineering Workflow' },
  { name: 'About Us', href: '/about', id: 'about', subtext: 'Our Story & Engineering Team' },

  { name: 'Support', href: '/support', id: 'support', subtext: 'Post-Launch Maintenance & Terms' },
  { name: 'Contact', href: '/contact', id: 'contact', subtext: 'Start a Project or Send Inquiry' },
  { name: 'Privacy Policy', href: '/privacy', id: 'privacy', subtext: 'Data Protection & Security' },
  { name: 'Terms of Service', href: '/terms', id: 'terms', subtext: 'Legal Terms & Agreements' },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.35 } },
  exit: { opacity: 0, x: 20, transition: { ease: 'easeIn', duration: 0.15 } },
};

export default function Sidebar({ isOpen, onClose }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#171717';
  const bgColor = isDark ? '#111111' : '#ffffff';

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

  const visibleNavItems = NAV_ITEMS.filter(
    item => !item.id || PAGE_VISIBILITY[item.id] !== false
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — closes on click or touch anywhere */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onTouchEnd={(e) => {
              e.preventDefault();
              onClose();
            }}
            aria-hidden="true"
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9998,
              cursor: 'pointer',
            }}
          />

          {/* Panel — slides in from right */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(90vw, 360px)',
              background: bgColor,
              borderLeft: '1px solid var(--border)',
              zIndex: 9999,
              display: 'flex', flexDirection: 'column',
              boxShadow: '-16px 0 64px rgba(0,0,0,0.3)',
            }}
          >
            {/* Header row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem 1.25rem',
              borderBottom: '1px solid var(--border)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)'
                }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800,
                  textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)',
                }}>Menu</span>
              </div>

              <motion.button
                onClick={onClose}
                aria-label="Close menu"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{
                  background: 'var(--bg-alt)', border: '1px solid var(--border)',
                  borderRadius: '999px', padding: '8px', minWidth: '40px', minHeight: '40px',
                  cursor: 'pointer', color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <XIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Scrollable Nav List */}
            <nav style={{
              flex: 1, overflowY: 'auto',
              display: 'flex', flexDirection: 'column',
              padding: '1rem 1rem 2rem 1rem',
              gap: '1.25rem',
            }}>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}
              >
                {visibleNavItems.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      end={item.href === '/'}
                      style={({ isActive }) => ({
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '12px',
                        background: isActive ? (isDark ? 'rgba(254, 107, 0, 0.12)' : 'rgba(254, 107, 0, 0.08)') : 'transparent',
                        border: isActive ? '1px solid rgba(254, 107, 0, 0.3)' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                      })}
                    >
                      {({ isActive }) => (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {/* Main Title */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{
                              width: 6, height: 6, borderRadius: '50%',
                              background: isActive ? 'var(--orange)' : 'var(--text-muted)',
                              flexShrink: 0
                            }} />
                            <TextRoll
                              text={item.name}
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                color: isActive ? 'var(--orange)' : textColor,
                                letterSpacing: '-0.01em',
                              }}
                            />
                          </div>

                          {/* Subtext Below */}
                          <span style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                            paddingLeft: '0.85rem',
                            lineHeight: 1.3,
                          }}>
                            {item.subtext}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Action Buttons at bottom of sidebar */}
              <div style={{
                marginTop: 'auto', paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}>
                <motion.a
                  href="https://wa.me/94768325949"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(37,211,102,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
                    padding: '0.85rem 1.25rem',
                    background: '#25D366',
                    borderRadius: '999px',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem', fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(37,211,102,0.3)',
                    width: '100%', minHeight: '44px',
                  }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(66, 133, 244, 0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
                    padding: '0.85rem 1.25rem',
                    background: '#4285F4',
                    borderRadius: '999px',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem', fontWeight: 700,
                    width: '100%', minHeight: '44px',
                    boxShadow: '0 4px 12px rgba(66, 133, 244, 0.3)',
                  }}
                >
                  <div style={{ background: 'white', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg className="w-3 h-3" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                  </div>
                  <span>Fill Contact Form</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.a>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
