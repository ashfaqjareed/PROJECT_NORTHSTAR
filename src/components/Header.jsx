import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon } from '../icons';
import PillButton from './PillButton';
import Logo from './Logo';

export default function Header({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme();
  
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [atTop, setAtTop] = useState(true);
  
  const { scrollY } = useScroll();
  const idleTimeout = useRef(null);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setAtTop(latest < 10);
    
    // We are actively scrolling
    setIsScrolling(true);
    setIsVisible(true); // Bring header back immediately if hidden
    
    // Reset the 5s idle timer
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    
    idleTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      // If we are not at the top, hide the header after 5s idle
      if (scrollY.get() > 100) {
        setIsVisible(false);
      }
    }, 5000);
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  const navLinks = [
    { to: '/',          label: 'Home' },
    { to: '/services',  label: 'Services' },
    { to: '/projects',  label: 'Projects' },
    { to: '/about',     label: 'About' },
    { to: '/contact',   label: 'Contact' },
  ];

  // Dynamic curve based on scroll state
  const currentCurve = atTop ? '48px' : isScrolling ? '64px' : '48px';

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '-100%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
      className={`transition-shadow duration-300 ${!atTop ? 'shadow-md' : ''}`}
    >
      {/* Lime color-block bar with curved bottom */}
      <motion.div
        animate={{ borderBottomLeftRadius: currentCurve, borderBottomRightRadius: currentCurve }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: 'var(--lime)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" style={{ mixBlendMode: 'multiply' }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-[80px] md:h-[96px] flex items-center justify-between">

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }} className="flex-shrink-0">
              <Logo variant="header" />
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
                    transition: 'color 0.2s',
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
              <div className="hidden-mobile">
                <PillButton as="link" to="/contact" variant="orange">
                  Get Started
                </PillButton>
              </div>

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
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
