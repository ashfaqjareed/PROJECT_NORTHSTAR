// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon } from '../icons';

export default function Header({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/services',  label: 'Services' },
    { to: '/projects',  label: 'Projects' },
    { to: '/pricing',   label: 'Pricing' },
    { to: '/about',     label: 'About' },
    { to: '/process',   label: 'Process' },
  ];

  return (
    <header
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
      className={`transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
    >
      {/* Lime color-block bar with curved bottom */}
      <div
        style={{
          background: 'var(--lime)',
          borderRadius: '0 0 var(--radius-curve) var(--radius-curve)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" style={{ mixBlendMode: 'multiply' }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span
                className="font-display"
                style={{ fontSize: '1.25rem', color: 'var(--header-text-locked)', letterSpacing: '-0.02em' }}
              >
                NORTHSTAR<span style={{ opacity: 0.45 }}>DEVS</span>
              </span>
            </Link>

            {/* Nav — desktop */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    color: isActive ? 'var(--header-text-locked)' : 'var(--header-text-locked-muted)',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  })}
                  onMouseEnter={e => e.target.style.color = 'var(--header-text-locked)'}
                  onMouseLeave={e => e.target.style.color = 'var(--header-text-locked-muted)'}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle colour scheme"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--header-text-locked)',
                  display: 'flex',
                  padding: '6px',
                  borderRadius: '8px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.55'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {theme === 'dark'
                  ? <SunIcon className="w-5 h-5" />
                  : <MoonIcon className="w-5 h-5" />}
              </button>

              {/* CTA — desktop */}
              <Link
                to="/contact"
                className="btn-liquid hidden-mobile"
                style={{
                  background: 'var(--orange)',
                  color: 'var(--white-locked)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '0.6rem 1.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Get Started
              </Link>

              {/* Hamburger — mobile */}
              <button
                onClick={onOpenSidebar}
                aria-label="Open navigation menu"
                className="show-mobile"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--header-text-locked)',
                  display: 'none',
                  padding: '6px',
                }}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
