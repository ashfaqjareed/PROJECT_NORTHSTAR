// src/components/Footer.jsx — clean sitemap footer
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa6';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const LEGAL = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/contact', label: 'Support' },
];

const SOCIALS = [
  { Icon: FaXTwitter, href: 'https://x.com/northstardevs', label: 'Twitter' },
  { Icon: FaInstagram, href: 'https://www.instagram.com/northstardevs/', label: 'Instagram' },
  { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/mohamed-ashfaq-jareed-20070401mh/', label: 'LinkedIn' },
  { Icon: FaGithub, href: 'https://github.com/northstardevs', label: 'GitHub' },
  { Icon: FaWhatsapp, href: 'https://wa.me/94768325949', label: 'WhatsApp' },
];

export default function Footer() {
  const linkBase = {
    color: 'rgba(253,246,238,0.75)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    display: 'block',
  };

  return (
    <footer style={{
      background: 'var(--orange)',
      borderRadius: '48px 48px 0 0',
      marginTop: '4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="noise-overlay" />

      <div className="section-container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '2.5rem' }}>

        {/* Grid — Brand | Nav | Legal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="font-display" style={{ fontSize: '1.6rem', color: 'rgba(253,246,238,1)', letterSpacing: '-0.02em' }}>
                NORTHSTAR<span style={{ opacity: 0.65 }}>DEVS</span>
              </span>
            </Link>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.975rem', color: 'rgba(253,246,238,0.78)', lineHeight: 1.75, maxWidth: '300px' }}>
              Elite creative engineering — Swiss-modern interfaces, performance-first React ecosystems, and brand identities that endure.
            </p>

            {/* Contact pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a href="mailto:northstardevs1@gmail.com" style={{ ...linkBase, fontSize: '0.9rem', color: 'rgba(253,246,238,0.85)' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(253,246,238,0.85)'}
              >
                northstardevs1@gmail.com
              </a>
              <a href="tel:+94768325949" style={{ ...linkBase, fontSize: '0.9rem', color: 'rgba(253,246,238,0.85)', fontFamily: 'var(--font-mono)' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(253,246,238,0.85)'}
              >
                +94 76 832 5949
              </a>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px',
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: 'rgba(253,246,238,0.9)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'rgba(23,23,23,0.7)', marginBottom: '1.25rem' }}>
              Pages
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to + label}>
                  <Link
                    to={to}
                    style={linkBase}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(253,246,238,0.75)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'rgba(23,23,23,0.7)', marginBottom: '1.25rem' }}>
              Legal
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {LEGAL.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={linkBase}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(253,246,238,0.75)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large wordmark + copyright */}
        <div style={{ borderTop: '1px solid rgba(23,23,23,0.2)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

          <motion.h2
            className="hover-gradient-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
              margin: 0,
              lineHeight: 1,
              color: 'rgba(253,246,238,0.7)',
              transition: 'color 0.3s ease'
            }}
          >
            NORTHSTARDEVS
          </motion.h2>
          <style>{`
            .hover-gradient-text:hover {
              color: transparent !important;
              background: linear-gradient(to right, #adff2f, #fe6c01, #adff2f);
              -webkit-background-clip: text;
              background-size: 200% auto;
              animation: shine 2s linear infinite;
            }
            @keyframes shine {
              to {
                background-position: 200% center;
              }
            }
          `}</style>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'rgba(253,246,238,0.5)', textAlign: 'center',
          }}>
            &copy; {new Date().getFullYear()} NorthStarDevs · Colombo, Sri Lanka · All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
