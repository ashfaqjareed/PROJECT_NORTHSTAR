import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

/* ─── UPDATE ITEMS SHOWN IN MODAL ─── */
const UPDATES = [
  {
    emoji: '🎞️',
    title: 'Project Gallery Upgrades',
    color: '#fe6c01',
    body: 'Individual project pages now feature a high-performance, swipeable image carousel. Drop your photos into the public folder and they load instantly.',
  },
  {
    emoji: '💳',
    title: 'Expanded Pricing Transparency',
    color: '#adff2f',
    body: 'Dedicated detail pages for every pricing tier. Full breakdown of timelines, features, and Terms & Conditions before you commit.',
  },
  {
    emoji: '🧭',
    title: 'Navigation & Sidebar Refinement',
    color: '#fff',
    body: 'Bold structural typography in the mobile sidebar, fully centered header on tablet, and improved smooth transitions across all breakpoints.',
  },
  {
    emoji: '🌗',
    title: 'Enhanced Dark / Light Mode',
    color: '#fe6c01',
    body: 'All pages now respect the theme tokens across every component — no more colour inconsistencies when switching modes.',
  },
];

/* ─── MODAL (rendered via Portal so it always sits above everything) ─── */
function Modal({ onClose }) {
  // Lock scroll on open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />

        {/* Card */}
        <motion.div
          key="card"
          initial={{ opacity: 0, y: 48, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 48, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          style={{
            position: 'relative',
            zIndex: 1,
            background: '#0d0d0d',
            borderRadius: '28px',
            border: '1px solid rgba(255,255,255,0.1)',
            width: 'min(92vw, 560px)',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            color: '#fff',
            textAlign: 'left',
          }}
        >
          {/* Modal header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.75rem 2rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'sticky',
            top: 0,
            background: '#0d0d0d',
            zIndex: 1,
          }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#adff2f', marginBottom: '0.25rem' }}>
                Maintenance Update
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: 0, color: '#fff' }}>
                What's New
              </h3>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              ✕
            </motion.button>
          </div>

          {/* Update items */}
          <div style={{ padding: '0.5rem 0 2rem' }}>
            {UPDATES.map((item, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ padding: '1.5rem 2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                >
                  <div style={{
                    fontSize: '1.5rem',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    flexShrink: 0,
                  }}>
                    {item.emoji}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', color: item.color }}>
                      {item.title}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                </motion.div>
                {i < UPDATES.length - 1 && (
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 2rem' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

/* ─── FLOATING ORBS for background animation ─── */
const ORB_DATA = [
  { w: 320, h: 320, top: '-10%', left: '-10%', delay: 0 },
  { w: 200, h: 200, top: '60%', right: '-5%', delay: 1.2 },
  { w: 150, h: 150, top: '30%', left: '60%', delay: 0.7 },
];

/* ─── MAIN PAGE ─── */
export default function Maintenance() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#adff2f',
      color: '#171717',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.07) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
      }} />

      {/* Animated floating orbs */}
      {ORB_DATA.map((orb, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: orb.w,
            height: orb.h,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.06)',
            top: orb.top,
            left: orb.left,
            right: orb.right,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5 + i * 1.3, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px',
          width: '100%',
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <Logo style={{ height: '220px', filter: 'brightness(0)' }} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            fontWeight: 800,
            marginBottom: '1.25rem',
            color: '#111',
          }}
        >
          We are Tuning<br />the Experience<span style={{ color: '#fe6c01' }}>.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.1rem',
            color: 'rgba(0,0,0,0.65)',
            lineHeight: 1.6,
            marginBottom: '3rem',
            maxWidth: '520px',
          }}
        >
          We apologize for the inconvenience caused.<br />
          The site will be live again soon.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '380px', marginBottom: '4rem' }}
        >
          {/* Status pill */}
          <div style={{
            background: 'rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '999px',
            padding: '1rem 2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: '#111',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#fe6c01',
              boxShadow: '0 0 0 3px rgba(254,108,1,0.3)',
              display: 'inline-block',
              animation: 'pulse-dot 1.8s ease-in-out infinite',
            }} />
            Site is Under-Maintenance
          </div>

          {/* Learn More button */}
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: '#111',
              border: 'none',
              borderRadius: '999px',
              padding: '1.1rem 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: '#fff',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Learn More — What's New
          </motion.button>
        </motion.div>

        {/* Footer tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#111',
          }}
        >
          SITE ERROR · ERROR CODE 503
        </motion.p>
      </motion.div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>

      {/* Modal Portal */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
