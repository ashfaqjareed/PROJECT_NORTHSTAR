import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon } from '../icons';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col gap-3 mb-2"
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/94770000000" // Replace with actual number
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-full shadow-lg hover:border-[#25D366] transition-colors group text-decoration-none"
            >
              <span className="font-sans text-sm font-semibold text-[var(--text)]">WhatsApp Us</span>
              <div className="bg-[#25D366] p-1.5 rounded-full text-white">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
            </a>
            
            {/* Email */}
            <a
              href="mailto:hello@northstardevs.com" // Replace with actual email
              className="flex items-center gap-3 bg-[var(--bg)] border border-[var(--border)] px-4 py-2 rounded-full shadow-lg hover:border-[var(--orange)] transition-colors group text-decoration-none"
            >
              <span className="font-sans text-sm font-semibold text-[var(--text)]">Email Us</span>
              <div className="bg-[var(--orange)] p-1.5 rounded-full text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[var(--text)] text-[var(--bg)] rounded-full flex items-center justify-center shadow-xl hover:bg-[var(--orange)] transition-colors"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )}
        </svg>
      </button>
    </div>
  );
}
