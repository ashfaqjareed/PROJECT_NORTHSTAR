import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPopup() {
  const [visible, setVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isClosed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          className="fixed bottom-6 left-6 z-40 flex flex-col items-start"
        >
          <div className="relative bg-[var(--bg)] border border-[var(--border)] shadow-2xl rounded-2xl p-4 flex flex-col items-center backdrop-blur-md max-w-[220px]">
            {/* Close button */}
            <button
              onClick={() => setIsClosed(true)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--bg-alt)] border border-[var(--border)] hover:bg-[var(--orange)] hover:text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-md z-10"
              aria-label="Dismiss QR code"
            >
              ✕
            </button>

            {/* Header / Text */}
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer text-center group"
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--orange)] block mb-1">
                Scan & Explore
              </span>
              <p className="font-display text-xs font-semibold leading-tight group-hover:text-[var(--orange)] transition-colors">
                Want to learn more about us?
              </p>
            </div>

            {/* QR Code Container */}
            <motion.div
              animate={{ height: isExpanded ? 'auto' : '140px', opacity: 1 }}
              className="w-32 bg-white p-2 rounded-xl border border-[var(--border)] my-2 overflow-hidden shadow-sm"
            >
              <img
                src="/About Us.png"
                alt="Scan to visit About Us"
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>

            <span className="font-sans text-[10px] text-[var(--text-muted)] text-center">
              Scan with phone camera
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
