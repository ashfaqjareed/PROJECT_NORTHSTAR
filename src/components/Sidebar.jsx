// src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { XIcon, SunIcon, MoonIcon, WhatsAppIcon, MailIcon } from '../icons';

const ALL_LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/services',    label: 'Services' },
  { to: '/projects',    label: 'Projects' },
  { to: '/pricing',     label: 'Pricing' },
  { to: '/about',       label: 'About' },
  { to: '/process',     label: 'Process' },
  { to: '/contact',     label: 'Contact' },
  { to: '/testimonials',label: 'Testimonials' },
  { to: '/support',     label: 'Support' },
  { to: '/faq',         label: 'FAQ' },
  { to: '/careers',     label: 'Careers' },
  { to: '/blog',        label: 'Blog' },
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
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`sidebar-panel ${isOpen ? 'open' : ''}`}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {ALL_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onClose}
                end={to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.5rem',
                  letterSpacing: '-0.02em',
                  color: isActive ? 'var(--orange)' : 'var(--text)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  display: 'block',
                  transition: 'color 0.2s',
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>
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
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
