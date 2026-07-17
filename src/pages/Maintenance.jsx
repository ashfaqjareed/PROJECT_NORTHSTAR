import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

export default function Maintenance() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#adff2f', // requested lime color
      color: '#171717', // Dark color for readability against lime
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle grid/dot pattern matching the image vibe */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px',
          width: '100%',
          zIndex: 10,
        }}
      >
        {/* Logo Match from Image */}
        <div style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Logo style={{ height: '70px', marginBottom: '1.5rem', filter: 'brightness(0) invert(0)' }} />
        </div>

        <h2 className="font-display" style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
          fontWeight: 700
        }}>
          We are Tuning the Experience<span style={{color: '#fe6c01'}}>.</span>
        </h2>
        <p className="font-sans" style={{
          fontSize: '1.125rem',
          opacity: 0.8,
          lineHeight: 1.6,
          marginBottom: '3rem',
          maxWidth: '600px'
        }}>
          For our Dear Customers, We apologize for the inconvenience caused.<br />
          The Site will be Live Soon again.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px', marginBottom: '4rem' }}>
          <button style={{
            background: 'transparent',
            border: '1px solid rgba(23,23,23,0.3)',
            borderRadius: '999px',
            padding: '1.1rem 2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: '#171717',
            cursor: 'default',
            textTransform: 'uppercase',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(23,23,23,0.8)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(23,23,23,0.3)'}
          >
            Site is in Maintenance
          </button>

          <button onClick={() => setShowModal(true)} style={{
            background: '#171717',
            border: 'none',
            borderRadius: '999px',
            padding: '1.1rem 2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: '#ffffff',
            cursor: 'pointer',
            textTransform: 'uppercase',
            display: 'inline-block',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Learn More
          </button>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          opacity: 0.6,
          textTransform: 'uppercase'
        }}>
          SITE ERROR | ERROR CODE 503
        </p>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 100
              }}
            />
            <div style={{ position: 'fixed', inset: 0, zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{
                  pointerEvents: 'auto',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  padding: '3rem',
                  borderRadius: '24px',
                  width: '90%',
                  maxWidth: '600px',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                  border: '1px solid var(--border)',
                  textAlign: 'left'
                }}
              >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: 0 }}>What's New</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'var(--bg-alt)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
                  ✕
                </button>
              </div>
              
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--orange)' }}>Project Gallery Upgrades</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Individual project pages now feature a high-performance, swipeable image carousel. Easily upload multiple pictures to fully showcase your work from every angle.
                  </p>
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--lime)' }}>Expanded Pricing Transparency</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6 }}>
                    We've introduced dedicated detail pages for every pricing tier. You can now view comprehensive breakdowns of timelines, features, and specific terms and conditions before you commit.
                  </p>
                </div>
                
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text)' }}>UI & Navigation Refinements</h4>
                  <p style={{ fontFamily: 'var(--font-sans)', opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.6 }}>
                    The sidebar has been reworked to feature bold, structural typography, while the overall site architecture has been optimized for seamless responsive flow across mobile and desktop.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
        )}
      </AnimatePresence>
    </div>
  );
}
