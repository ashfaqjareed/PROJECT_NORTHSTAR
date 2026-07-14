import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function AnimatedTabs({ tabs }) {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="flex space-x-1 rounded-full bg-white/5 p-1 backdrop-blur-md border border-white/10">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.href || (tab.href !== '/' && location.pathname.startsWith(tab.href));

        return (
          <Link
            key={tab.name}
            to={tab.href}
            onMouseEnter={() => setHoveredTab(tab.name)}
            onMouseLeave={() => setHoveredTab(null)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none"
            style={{
              color: isActive || hoveredTab === tab.name ? 'var(--header-text-locked)' : 'var(--header-text-locked-muted)',
              textDecoration: 'none'
            }}
          >
            {hoveredTab === tab.name && !isActive && (
              <motion.div
                layoutId="hover-tab"
                className="absolute inset-0 z-0 rounded-full bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 z-0 rounded-full bg-white/20 shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
