// src/components/Header.jsx — Flat at top, floating pill when scrolled, logo always visible
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon } from '../icons';
import AnimatedTabs from './AnimatedTabs';
import Logo from './Logo';

export default function Header({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const idleTimeout = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setAtTop(latest < 10);
    setVisible(true);

    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      if (scrollY.get() > 120) setVisible(false);
    }, 4000);
  });

  useEffect(() => () => { if (idleTimeout.current) clearTimeout(idleTimeout.current); }, []);

  const tabs = [
    { name: 'Home',     href: '/'         },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Pricing',  href: '/pricing'  },
  ];

  return (
    <motion.header
      animate={{ y: visible ? 0 : '-110%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        // When scrolled, add side+top padding so pill floats inside the page
        padding: atTop ? '0' : '0.75rem 1rem 0 1rem',
        transition: 'padding 0.35s ease',
      }}
    >
      <motion.div
        animate={{
          borderRadius: atTop ? '0px' : '40px',
          boxShadow: atTop
            ? 'none'
            : '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          background: 'var(--lime)',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: atTop ? '100%' : '1280px',
          margin: '0 auto',
        }}
      >
        {/* Subtle noise texture */}
        <div className="noise-overlay" style={{ mixBlendMode: 'multiply' }} />

        <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Main bar — 80px mobile, 88px desktop */}
          <div style={{ height: atTop ? '80px' : '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', transition: 'height 0.35s ease' }}>

            {/* Logo — always visible on all devices */}
            <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
              <Logo variant="header" />
            </Link>

            {/* Desktop centred nav */}
            <nav style={{ display: 'none', flex: 1, justifyContent: 'center', alignItems: 'center' }} className="lg-nav">
              <AnimatedTabs tabs={tabs} />
            </nav>

            {/* Right controls: theme toggle + hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle colour scheme"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--header-text-locked)',
                  display: 'flex', padding: '8px', borderRadius: '999px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>

              <button
                onClick={onOpenSidebar}
                aria-label="Open navigation menu"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--header-text-locked)',
                  display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '999px',
                  transition: 'background 0.2s',
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

      {/* Inline responsive nav — visible only on desktop */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-nav { display: flex !important; }
        }
      `}</style>
    </motion.header>
  );
}
