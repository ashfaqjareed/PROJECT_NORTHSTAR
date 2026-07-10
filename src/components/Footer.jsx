// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa6';

const SITEMAP = [
  { to: '/pricing',      label: 'Pricing' },
  { to: '/faq',          label: 'FAQ' },
  { to: '/process',      label: 'Process' },
  { to: '/support',      label: 'Support' },
];

const LEGAL = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms',   label: 'Terms of Service' },
];

export default function Footer() {
  const linkStyle = {
    color: 'var(--footer-text-locked-70)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  };

  const SocialIcon = ({ Icon, href }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '40px', height: '40px',
        background: 'var(--white-locked-10)',
        borderRadius: '12px',
        color: 'var(--footer-text-locked)',
        textDecoration: 'none'
      }}
      whileHover={{ scale: 1.1, rotate: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Icon size={20} />
    </motion.a>
  );

  return (
    <footer
      style={{
        background: 'var(--orange)',
        borderRadius: 'var(--radius-curve) var(--radius-curve) 0 0',
        marginTop: '6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Noise texture */}
      <div className="noise-overlay" />

      <div className="section-container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '2rem' }}>

        {/* Row 1 — main footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>

          {/* Left column: Brand + Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span
                className="font-display"
                style={{ fontSize: '1.5rem', color: 'var(--footer-text-locked)', letterSpacing: '-0.02em' }}
              >
                NORTHSTAR<span style={{ color: 'var(--footer-charcoal-locked)', opacity: 0.85 }}>DEVS</span>
              </span>
            </Link>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--footer-text-locked-75)',
              lineHeight: 1.7,
              maxWidth: '320px',
            }}>
              Elite creative engineering — Swiss-modern interfaces, performance-first React ecosystems, brand identities that endure.
            </p>

            {/* Social Icons row */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <SocialIcon Icon={FaXTwitter} href="#" />
              <SocialIcon Icon={FaInstagram} href="#" />
              <SocialIcon Icon={FaLinkedin} href="#" />
              <SocialIcon Icon={FaGithub} href="#" />
            </div>
            
            {/* Contact Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="mailto:northstardevs1@gmail.com" style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem',
                background: 'var(--white-locked-10)', borderRadius: '999px',
                color: 'var(--footer-text-locked)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                transition: 'background 0.2s'
              }} onMouseEnter={e => e.currentTarget.style.background = 'var(--white-locked-20)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--white-locked-10)'}>
                northstardevs1@gmail.com
              </a>
              <a href="tel:+94768325949" style={{
                display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem',
                background: 'var(--white-locked-10)', borderRadius: '999px',
                color: 'var(--footer-text-locked)', textDecoration: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                transition: 'background 0.2s'
              }} onMouseEnter={e => e.currentTarget.style.background = 'var(--white-locked-20)'} onMouseLeave={e => e.currentTarget.style.background = 'var(--white-locked-10)'}>
                +94 76 832 5949
              </a>
            </div>
          </div>

          {/* Right column: WhatsApp Pulse + Sitemap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
            <motion.a
              href="https://wa.me/94768325949"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                background: 'var(--whatsapp-brand)', color: 'white',
                padding: '1rem 2rem', borderRadius: '16px',
                textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(37,211,102,0.4)'
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <FaWhatsapp size={24} />
              Fastest way to reach us
            </motion.a>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase',
                  letterSpacing: '0.12em', fontWeight: 700, color: 'var(--footer-charcoal-locked)',
                }}>
                  Sitemap
                </span>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {SITEMAP.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        style={linkStyle}
                        onMouseEnter={e => e.target.style.color = 'var(--white-locked)'}
                        onMouseLeave={e => e.target.style.color = 'var(--footer-text-locked-70)'}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — Credit bar / Wordmark */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--footer-charcoal-locked)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
        }}>
          
          <h2 className="font-display" style={{ 
            fontSize: 'clamp(3rem, 10vw, 7rem)', 
            color: 'var(--footer-text-locked)', 
            lineHeight: 1,
            margin: 0,
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            NORTHSTARDEVS
          </h2>

          <div style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--footer-text-locked-50)',
            }}>
              &copy; {new Date().getFullYear()} NorthStarDevs. All rights reserved. Colombo, Sri Lanka.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {LEGAL.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--footer-text-locked-50)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--white-locked)'}
                  onMouseLeave={e => e.target.style.color = 'var(--footer-text-locked-50)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
