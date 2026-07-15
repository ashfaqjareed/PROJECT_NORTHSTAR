// src/components/Header.jsx
// White/dark-adaptive at top → green curved header on scroll → hides after 5s idle
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon } from '../icons';
import AnimatedTabs from './AnimatedTabs';
import Logo from './Logo';

export default function Header({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible]   = useState(true);
  const idleTimer = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isScrolled = latest > 60;
    setScrolled(isScrolled);
    setVisible(true);

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

  // When scrolled, lime background always has dark text (it's always light green).
  // When NOT scrolled, adapt to current theme.
  const iconColor = scrolled ? '#171717' : (theme === 'dark' ? '#f5f5f5' : '#171717');

  return (
    <>
      <motion.header
        animate={{ y: visible ? 0 : '-110%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <motion.div
          animate={{
            background: scrolled
              ? 'var(--lime)'
              : (theme === 'dark' ? '#0d0d0d' : '#ffffff'),
            borderBottomLeftRadius: scrolled ? '28px' : '0px',
            borderBottomRightRadius: scrolled ? '28px' : '0px',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'
              : theme === 'dark'
                ? '0 1px 0 rgba(255,255,255,0.06)'
                : '0 1px 0 rgba(0,0,0,0.08)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              height: scrolled ? '72px' : '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              transition: 'height 0.4s ease',
              position: 'relative',
            }}>
              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none', flexShrink: 0, zIndex: 10 }}>
                <Logo variant="header" />
              </Link>

              {/* Desktop strictly centred nav */}
              <nav style={{
                display: 'none',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
              }} className="hdr-nav">
                <AnimatedTabs tabs={tabs} scrolled={scrolled} theme={theme} />
              </nav>

              {/* Right side: theme toggle + menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, zIndex: 10 }}>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: iconColor,
                    display: 'flex', padding: '8px', borderRadius: '999px',
                    transition: 'background 0.2s, color 0.4s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                </button>

                <button
                  onClick={onOpenSidebar}
                  aria-label="Open menu"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: iconColor,
                    display: 'flex', alignItems: 'center',
                    padding: '8px', borderRadius: '999px',
                    transition: 'background 0.2s, color 0.4s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
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
