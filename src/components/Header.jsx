import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon, MenuIcon, WhatsAppIcon } from '../icons';
import PillButton from './PillButton';
import Logo from './Logo';

export default function Header({ onOpenSidebar }) {
  const { theme, toggleTheme } = useTheme();
  
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [currentRadius, setCurrentRadius] = useState('48px');
  
  const { scrollY } = useScroll();
  const idleTimeout = useRef(null);
  const scrollTimeout = useRef(null);

  // Parallax background layer
  const bgY = useTransform(scrollY, [0, 300], [0, 40]);
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setAtTop(latest < 10);
    setIsScrolling(true);
    setIsVisible(true);
    setCurrentRadius('64px'); // Curve deepens while scrolling
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setCurrentRadius(latest < 10 ? '48px' : '48px');
    }, 150);
    
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => {
      setIsScrolling(false);
      if (scrollY.get() > 100) {
        setIsVisible(false);
      }
    }, 5000);
  });

  useEffect(() => {
    return () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const navLinks = [
    { to: '/',          label: 'Home' },
    { to: '/services',  label: 'Services' },
    { to: '/projects',  label: 'Projects' },
    { to: '/about',     label: 'About Us' },
    { to: '/contact',   label: 'Get a Quote' },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '-100%' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
      className={`transition-shadow duration-300 ${!atTop ? 'shadow-md' : ''}`}
    >
      <motion.div
        animate={{ borderBottomLeftRadius: currentRadius, borderBottomRightRadius: currentRadius }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: 'var(--lime)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Parallax Background Layer */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <div className="noise-overlay" style={{ mixBlendMode: 'multiply' }} />
          {/* Subtle geometric shape */}
          <svg viewBox="0 0 400 400" className="absolute -right-20 top-[-100px] w-96 h-96 opacity-10 pointer-events-none">
            <circle cx="200" cy="200" r="150" fill="var(--text)" />
          </svg>
        </motion.div>

        <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="h-[80px] md:h-[96px] flex items-center justify-between">

            <Link to="/" style={{ textDecoration: 'none' }} className="flex-shrink-0">
              <Logo variant="header" />
            </Link>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="group relative"
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
                  onMouseLeave={e => {
                    if (!e.target.classList.contains('active')) {
                      e.target.style.color = 'var(--header-text-locked-muted)';
                    }
                  }}
                >
                  {label}
                  {/* Underline hover effect */}
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[var(--header-text-locked)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </NavLink>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              
              <a
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110 bg-[var(--whatsapp-bg)] border border-[var(--whatsapp-border)] text-[var(--whatsapp-brand)]"
                title="Message on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              <div className="hidden md:block">
                <PillButton as="link" to="/contact" variant="orange">
                  Get a Quote
                </PillButton>
              </div>

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
                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>

              <button
                onClick={onOpenSidebar}
                aria-label="Open navigation menu"
                className="flex md:hidden"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--header-text-locked)',
                  padding: '6px',
                }}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
