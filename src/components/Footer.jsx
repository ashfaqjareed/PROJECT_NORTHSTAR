// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon, MailIcon } from '../icons';

const SITEMAP = [
  { to: '/services',     label: 'Services' },
  { to: '/projects',     label: 'Projects' },
  { to: '/pricing',      label: 'Pricing' },
  { to: '/about',        label: 'About' },
  { to: '/process',      label: 'Process' },
  { to: '/contact',      label: 'Contact' },
  { to: '/testimonials', label: 'Testimonials' },
];

const LEGAL = [
  { to: '/faq',     label: 'FAQ' },
  { to: '/support', label: 'Support SLA' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog',    label: 'Blog' },
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

      <div className="section-container" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem', paddingBottom: '4rem' }}>

        {/* Three-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
        }}>

          {/* Col 1: Brand + contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
              maxWidth: '280px',
            }}>
              Elite creative engineering — Swiss-modern interfaces, performance-first React ecosystems, brand identities that endure.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="mailto:northstardevs1@gmail.com"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  color: 'var(--footer-text-locked)', textDecoration: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <MailIcon className="w-4 h-4" />
                northstardevs1@gmail.com
              </a>
              <a
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  color: 'var(--footer-text-locked)', textDecoration: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <WhatsAppIcon className="w-4 h-4" />
                +94 76 832 5949
              </a>
            </div>
          </div>

          {/* Col 2: Sitemap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: 'var(--footer-charcoal-locked)',
            }}>
              Pages
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

          {/* Col 3: Legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: 'var(--footer-charcoal-locked)',
            }}>
              Legal & Info
            </span>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {LEGAL.map(({ to, label }) => (
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

        {/* Bottom bar */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--footer-text-locked-15)',
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

          <Link
            to="/contact"
            style={{
              background: 'var(--footer-charcoal-locked)',
              color: 'var(--footer-text-locked)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '0.6rem 1.25rem',
              borderRadius: '999px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </footer>
  );
}
