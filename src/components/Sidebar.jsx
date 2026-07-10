// src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { XIcon, SunIcon, MoonIcon, WhatsAppIcon, MailIcon } from '../icons';

const STAGGER = 0.035;

const TextRoll = ({ children, className }) => (
  <motion.span
    initial="initial"
    whileHover="hovered"
    className={`relative block overflow-hidden ${className}`}
    style={{ lineHeight: 0.9 }}
  >
    <div>
      {children.split("").map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
          transition={{ ease: "easeInOut", delay: STAGGER * i }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
    <div className="absolute inset-0">
      {children.split("").map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
          transition={{ ease: "easeInOut", delay: STAGGER * i }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
  </motion.span>
);

const ALL_LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/services',    label: 'Services' },
  { to: '/projects',    label: 'Projects' },
  { to: '/pricing',     label: 'Pricing' },
  { to: '/about',       label: 'About Us' },
  { to: '/contact',     label: 'Get a Quote' },
  { to: '/faq',         label: 'FAQ' },
  { to: '/process',     label: 'Process' },
  { to: '/support',     label: 'Support' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="sidebar-overlay open"
            style={{ pointerEvents: 'auto' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="sidebar-panel open"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            aria-expanded={isOpen}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border)',
            }}>
              <span className="eyebrow">Navigation</span>
              <button
                onClick={onClose}
                aria-label="Close navigation"
                style={{
                  background: 'var(--bg-alt)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '6px', cursor: 'pointer',
                  color: 'var(--text)', display: 'flex',
                }}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <ul className="flex min-h-full w-full flex-col items-center justify-center gap-4 py-3 m-0 p-0 list-none">
                {ALL_LINKS.map(({ to, label }) => (
                  <li key={to} className="relative flex cursor-pointer flex-col items-center">
                    <NavLink
                      to={to}
                      onClick={onClose}
                      end={to === '/'}
                      className={({ isActive }) => (isActive ? 'text-[var(--orange)]' : 'text-[var(--text)]')}
                      style={{ textDecoration: 'none' }}
                    >
                      <TextRoll className="text-3xl font-display uppercase tracking-tight lg:text-4xl">
                        {label}
                      </TextRoll>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom controls */}
            <div style={{
              borderTop: '1px solid var(--border)',
              padding: '1.5rem',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                }}
              >
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
              </button>

              {/* WhatsApp */}
              <a
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--whatsapp-bg)',
                  border: '1px solid var(--whatsapp-border)',
                  borderRadius: '12px',
                  color: 'var(--whatsapp-brand)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Message on WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href="mailto:northstardevs1@gmail.com"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'border-color 0.2s',
                }}
              >
                <MailIcon className="w-5 h-5" />
                <span>northstardevs1@gmail.com</span>
              </a>

              {/* CTA */}
              <Link
                to="/contact"
                onClick={onClose}
                className="btn-liquid"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--orange)',
                  color: 'var(--white-locked)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '0.875rem 1.5rem',
                  marginTop: '0.25rem',
                }}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
