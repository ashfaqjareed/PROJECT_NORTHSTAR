import React from 'react';
import { motion } from 'framer-motion';
import PillButton from './PillButton';
import { ArrowRightIcon } from '../icons';

export default function PreFooter() {
  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(135deg, var(--lime) 0%, var(--orange) 100%)',
            borderRadius: '32px',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background texture */}
          <div className="noise-overlay" />
          
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--bg)', marginBottom: '1rem', lineHeight: 1.1 }}>
              Let&apos;s craft something beautiful.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'rgba(0,0,0,0.7)', marginBottom: '2.5rem', maxWidth: '480px', lineHeight: 1.75 }}>
              Reach out today to discuss your next project. We&apos;re ready to engineer your vision.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <PillButton
                as="link"
                to="/contact"
                style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', fontWeight: 700 }}
              >
                Start a Project <ArrowRightIcon className="w-4 h-4" style={{ marginLeft: '0.5rem' }} />
              </PillButton>
              <PillButton
                as="a"
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#25D366', color: '#fff', fontWeight: 700 }}
              >
                WhatsApp Us
              </PillButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
