// src/pages/Services.jsx — 7 panels
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { CodeIcon, BoltIcon, PaletteIcon, StarIcon, ArrowRightIcon, CheckIcon } from '../icons';

function Section({ children, alt = false, style = {} }) {
  return (
    <section style={{ background: alt ? 'var(--bg-alt)' : 'var(--bg)', padding: '5rem 0', ...style }}>
      <div className="section-container">{children}</div>
    </section>
  );
}

const SERVICES = [
  {
    id: 'web',
    icon: CodeIcon,
    eyebrow: 'Full-Stack Engineering',
    title: 'Web Application Development',
    desc: 'Bespoke React ecosystems connected to serverless architectures. We architect for scale from day one — modular components, typed data contracts, edge-deployed APIs, and Firestore persistence.',
    priceRange: '$1,500 – $6,000 USD',
    timeline: '3–5 weeks',
    features: [
      'React 18+ with Vite build pipeline',
      'Tailwind CSS design system',
      'Firestore / REST API integration',
      'Dark/light mode with zero FOUC',
      'Lighthouse 90+ on all Core Web Vitals',
      'Vercel deployment + domain setup',
      '4 revision rounds',
      '30-day post-launch support',
    ],
    accent: 'orange',
  },
  {
    id: 'landing',
    icon: BoltIcon,
    eyebrow: 'Conversion-First',
    title: 'Landing Pages',
    desc: 'Precision-crafted marketing surfaces optimised for a single goal — whether that\'s leads, sign-ups, or sales. 90 FPS animations, above-the-fold hero that loads in under 2 seconds.',
    priceRange: '$500 – $1,200 USD',
    timeline: '5–7 business days',
    features: [
      'Single-page layout with full scroll story',
      'Form integration (Formspree / Firestore)',
      'Structured data / SEO meta',
      'Mobile-first responsive layout',
      '2 revision rounds',
    ],
    accent: 'lime',
  },
  {
    id: 'brand',
    icon: PaletteIcon,
    eyebrow: 'Brand Identity',
    title: 'Logo & Brand Identity',
    desc: 'Swiss-modern insignia design built for every context — from 16×16 favicon to billboard. Delivered as vector SVG with complete usage guidelines and colour token documentation.',
    priceRange: '$200 – $800 USD',
    timeline: '3–5 business days',
    features: [
      'Primary logo mark + wordmark',
      'Colour palette + typography specification',
      'SVG, PNG, and PDF deliverables',
      'Usage guidelines document',
      '2 concept directions, 2 revision rounds',
    ],
    accent: 'lime',
  },
  {
    id: 'graphics',
    icon: StarIcon,
    eyebrow: 'Visual Assets',
    title: 'Graphic Banners & Posters',
    desc: 'High-contrast promotional materials for social media, advertising, and internal communications. Each asset is designed to the platform\'s exact spec — no resizing artifacts.',
    priceRange: '$100 – $400 USD',
    timeline: '2–3 business days',
    features: [
      'Platform-spec dimensions (IG, LinkedIn, etc.)',
      'Print-ready 300 DPI export',
      'Source file handoff (Figma / AI)',
      '2 revision rounds',
    ],
    accent: 'orange',
  },
];

const TIERS = [
  { name: 'Speed MVP', col: 1 },
  { name: 'Full Launch', col: 2 },
  { name: 'Custom Retainer', col: 3 },
];

const COMPARISON = [
  { feature: 'Web App',        tiers: [false, true, true] },
  { feature: 'Landing Page',   tiers: [true,  true, true] },
  { feature: 'Brand Identity', tiers: [false, true, true] },
  { feature: 'Graphic Assets', tiers: [true,  true, true] },
  { feature: 'Firestore Back', tiers: [false, true, true] },
  { feature: 'Dark Mode',      tiers: [true,  true, true] },
  { feature: 'Post-Launch SLA',tiers: [false, '30d', 'Custom'] },
  { feature: 'Revisions',      tiers: ['2',   '4',  'Unlimited'] },
];

export default function Services() {
  useScrollFadeUp();

  return (
    <div>
      {/* Panel 1: Header */}
      <Section>
        <div style={{ maxWidth: '700px' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Service Modules</p>
          <h1 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem' }}>
            What we build,<br />and how much it costs.
          </h1>
          <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Every service module listed with an honest price range and timeline. No "contact for quote" on the basics.
          </p>
        </div>
      </Section>

      {/* Panels 2–5: Service modules */}
      {SERVICES.map((svc, idx) => {
        const Icon = svc.icon;
        const isAlt = idx % 2 === 1;
        return (
          <Section key={svc.id} alt={isAlt}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div className={idx % 2 === 1 ? '' : ''} style={{ order: idx % 2 === 1 ? 1 : 0 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '14px',
                  border: `1px solid var(--border)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: `var(--${svc.accent === 'orange' ? 'orange' : 'lime'})`,
                }}>
                  <Icon className="w-7 h-7" />
                </div>

                <p className="eyebrow fade-up" style={{ marginBottom: '0.5rem' }}>{svc.eyebrow}</p>
                <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
                  {svc.title}
                </h2>
                <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {svc.desc}
                </p>

                <div className="fade-up" data-delay="180" style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>Price range</p>
                    <p className="font-display" style={{ fontSize: '1rem', color: 'var(--orange)' }}>{svc.priceRange}</p>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>Typical timeline</p>
                    <p className="font-display" style={{ fontSize: '1rem' }}>{svc.timeline}</p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="btn-liquid fade-up"
                  data-delay="240"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'var(--text)', color: 'var(--bg)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    textDecoration: 'none', padding: '0.75rem 1.5rem',
                  }}
                >
                  Discuss This Service <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              <div className="fade-up" data-delay="120" style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-card)',
                padding: '2rem',
                order: idx % 2 === 1 ? 0 : 1,
              }}>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>What's included</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {svc.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
                      <CheckIcon className="w-4 h-4" style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '2px' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        );
      })}

      {/* Panel 6: Comparison table */}
      <Section alt>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>At a glance</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem' }}>
          Tier comparison
        </h2>

        <div className="fade-up" data-delay="120" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                  Feature
                </th>
                {TIERS.map(t => (
                  <th key={t.name} style={{ padding: '1rem', borderBottom: '2px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', textAlign: 'center' }}>
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-alt)' }}>
                  <td style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>{row.feature}</td>
                  {row.tiers.map((val, j) => (
                    <td key={j} style={{ padding: '0.875rem 1rem', textAlign: 'center' }}>
                      {val === true
                        ? <CheckIcon className="w-4 h-4" style={{ color: 'var(--orange)', margin: '0 auto' }} />
                        : val === false
                          ? <span style={{ color: 'var(--border)', fontSize: '1.25rem' }}>–</span>
                          : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>{val}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Panel 7: CTA */}
      <Section>
        <div className="fade-up" style={{
          textAlign: 'center', padding: '4rem 2rem',
          borderRadius: 'var(--radius-curve)',
          border: '1px solid var(--border)',
          background: 'var(--bg-alt)',
        }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Ready to scope a project?</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Start a conversation.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Drop us a message on WhatsApp with your brief — we'll respond with a ballpark scope within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/94768325949"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid"
              style={{
                background: 'var(--orange)', color: 'var(--white-locked)',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                textDecoration: 'none', padding: '0.875rem 2rem',
                display: 'inline-flex', alignItems: 'center',
              }}
            >
              WhatsApp Us
            </a>
            <Link
              to="/pricing"
              style={{
                border: '1px solid var(--border)', background: 'var(--bg)',
                color: 'var(--text)',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                textDecoration: 'none', padding: '0.875rem 2rem',
                borderRadius: '999px',
              }}
            >
              Full Pricing
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
