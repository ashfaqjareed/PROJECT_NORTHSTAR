// src/components/Header.jsx
// Flat at top → slides into orange curved header on scroll → hides after 5s idle
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon } from '../icons';
import AnimatedTabs from './AnimatedTabs';
import Logo from './Logo';

export default function Header({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false); // true after first scroll off top
  const [visible, setVisible]   = useState(true);
  const idleTimer = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest > 60;
    setScrolled(isScrolled);
    setVisible(true); // always show on scroll

    // Start 5-second idle timer to hide header
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (scrollY.get() > 60) setVisible(false);
    }, 5000);
  });

  useEffect(() => () => { if (idleTimer.current) clearTimeout(idleTimer.current); }, []);

  const tabs = [
    { name: 'Home',     href: '/'         },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing',  href: '/pricing'  },
  ];

  return (
    <>
      <motion.header
        animate={{ y: visible ? 0 : '-110%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '0',
          transition: 'padding 0.4s ease',
        }}
      >
        <motion.div
          animate={{
            background: scrolled ? 'var(--orange)' : 'var(--lime)',
            borderBottomLeftRadius: scrolled ? '24px' : '0px',
            borderBottomRightRadius: scrolled ? '24px' : '0px',
            boxShadow: scrolled
              ? '0 8px 40px rgba(254,107,0,0.25), 0 2px 8px rgba(0,0,0,0.08)'
              : 'none',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {/* Noise overlay */}
          <div className="noise-overlay" style={{ mixBlendMode: 'multiply' }} />

          <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              height: scrolled ? '68px' : '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              transition: 'height 0.4s ease',
            }}>
              {/* Logo — bigger, always visible */}
              <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                <Logo variant="header" />
              </Link>

              {/* Desktop centred nav */}
              <nav style={{
                display: 'none',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }} className="hdr-nav">
                <AnimatedTabs tabs={tabs} />
              </nav>

              {/* Right side: theme + menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--header-text-locked)',
                    display: 'flex', padding: '8px', borderRadius: '999px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>

                <button
                  onClick={onOpenSidebar}
                  aria-label="Open menu"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--header-text-locked)',
                    display: 'flex', alignItems: 'center',
                    padding: '8px', borderRadius: '999px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <style>{`
        @media (min-width: 1024px) {
          .hdr-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
