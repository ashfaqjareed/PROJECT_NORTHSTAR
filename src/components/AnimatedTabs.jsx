import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function AnimatedTabs({ tabs, scrolled, theme }) {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState(null);

  // Text color logic:
  // - When scrolled (lime bg): always dark text
  // - When not scrolled in dark mode: light text
  // - When not scrolled in light mode: dark text
  const baseTextColor = scrolled
    ? 'rgba(23,23,23,0.7)'
    : (theme === 'dark' ? 'rgba(245,245,245,0.7)' : 'rgba(23,23,23,0.7)');

  const activeTextColor = scrolled
    ? '#171717'
    : (theme === 'dark' ? '#f5f5f5' : '#171717');

  const hoverBg = scrolled
    ? 'rgba(0,0,0,0.08)'
    : (theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)');

  const activeBg = scrolled
    ? 'rgba(0,0,0,0.12)'
    : (theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)');

  const containerBg = scrolled
    ? 'rgba(0,0,0,0.06)'
    : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)');

  const containerBorder = scrolled
    ? 'rgba(0,0,0,0.1)'
    : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)');

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      padding: '6px',
      borderRadius: '999px',
      background: containerBg,
      border: `1px solid ${containerBorder}`,
      backdropFilter: 'blur(8px)',
    }}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.href || (tab.href !== '/' && location.pathname.startsWith(tab.href));
        const isHovered = hoveredTab === tab.name;

        return (
          <Link
            key={tab.name}
            to={tab.href}
            onMouseEnter={() => setHoveredTab(tab.name)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              color: isActive || isHovered ? activeTextColor : baseTextColor,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {isHovered && !isActive && (
              <motion.div
                layoutId="hover-tab"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '999px',
                  background: hoverBg,
                  zIndex: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}
            {isActive && (
              <motion.div
                layoutId="active-tab"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '999px',
                  background: activeBg,
                  zIndex: 0,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
