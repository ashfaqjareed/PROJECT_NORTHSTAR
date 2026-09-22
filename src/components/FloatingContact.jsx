import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon } from '../icons';

const GOOGLE_FORM_URL = 'https://forms.gle/NFh3nKCzf8ER6ZMU7';
const WHATSAPP_NUMBER = '94768325949';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const distFromBottom = docHeight - scrollY - winHeight;

      // Hide when near footer (within 300px of bottom)
      if (distFromBottom < 300) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close when clicking/touching outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 mb-1"
              >
                {/* WhatsApp */}
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    minWidth: '170px',
                  }}
                >
                  <span className="font-sans text-sm font-semibold text-[var(--text)] flex-1">WhatsApp Us</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                  </div>
                </motion.a>

                {/* Email / Contact Form */}
                <motion.a
                  href="mailto:northstardevs1@gmail.com"
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    minWidth: '170px',
                  }}
                >
                  <span className="font-sans text-sm font-semibold text-[var(--text)] flex-1">Email Us</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--orange)' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </motion.a>

                {/* Google Form */}
                <motion.a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -4 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-xl"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    minWidth: '170px',
                  }}
                >
                  <span className="font-sans text-sm font-semibold text-[var(--text)] flex-1">Contact Form</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#4285F4' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <motion.button
            onClick={() => setIsOpen(prev => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: isOpen ? 'var(--orange)' : 'var(--text)',
              color: 'var(--bg)',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.25s ease',
            }}
            aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
          >
            <motion.svg
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
