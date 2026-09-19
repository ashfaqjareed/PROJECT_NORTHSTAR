import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup a short time after the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[var(--bg-alt)] border border-[var(--border)] rounded-[24px] overflow-hidden shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[var(--bg)]/80 hover:bg-[var(--orange)] hover:text-white text-[var(--text)] rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Close popup"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 text-center flex flex-col items-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--orange)] mb-2">Welcome</span>
              <h3 className="font-display text-2xl mb-3">Want to learn more about us?</h3>

              {/* QR Code Container */}
              <div className="w-56 h-56 bg-white p-3 rounded-2xl flex items-center justify-center my-4 border border-[var(--border)] shadow-md">
                <img
                  src="/About Us.png"
                  alt="Scan to visit About Us"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              <p className="font-sans text-[var(--text-muted)] text-sm max-w-xs">
                Scan with your mobile camera to view our story.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
