// src/pages/Pricing.jsx — 6 panels
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { CheckIcon, ArrowRightIcon, PlusIcon, MinusIcon } from '../icons';

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 0', background: 'none', border: 'none',
          cursor: 'pointer', color: 'var(--text)', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span className="font-display" style={{ fontSize: '1rem' }}>{q}</span>
        {open
          ? <MinusIcon className="w-5 h-5" style={{ flexShrink: 0, color: 'var(--orange)' }} />
          : <PlusIcon  className="w-5 h-5" style={{ flexShrink: 0 }} />}
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: '1.25rem' }}>{a}</p>
      </div>
    </div>
  );
}

const TIERS = [
  {
    name: 'Speed MVP',
    tagline: 'Get to market fast.',
    usd: '$500',
    lkr: 'LKR 155,000',
    timeline: '5–7 business days',
    revision: '2 rounds',
    features: [
      'Landing page or brand asset',
      'Mobile-first responsive layout',
      'Performance-optimised build',
      'Basic on-page SEO meta',
      'Vercel deployment',
      '2 revision rounds',
    ],
    notIncluded: ['Multi-page routing', 'Firestore backend', 'Custom brand system', 'Post-launch SLA'],
    featured: false,
    accent: 'lime',
  },
  {
    name: 'Full Launch',
    tagline: 'The complete product.',
    usd: '$1,500',
    lkr: 'LKR 465,000',
    timeline: '3–5 weeks',
    revision: '4 rounds',
    features: [
      'Multi-page React application',
      'Tailwind CSS design system',
      'Firestore backend integration',
      'Dark/light mode',
      'Contact form (Firestore-backed)',
      'Lighthouse 90+ audit',
      'Domain + Vercel deploy',
      '4 revision rounds',
      '30-day post-launch support',
    ],
    notIncluded: [],
    featured: true,
    accent: 'orange',
  },
  {
    name: 'Custom Retainer',
    tagline: 'Ongoing partnership.',
    usd: 'Custom',
    lkr: 'Scoped monthly',
    timeline: 'Monthly scope',
    revision: 'Unlimited',
    features: [
      'Monthly feature build scope',
      'Priority support response',
      'Written SLA with response times',
      'Weekly async check-in',
      'Unlimited revisions in scope',
      'Architecture consultation',
    ],
    notIncluded: [],
    featured: false,
    accent: 'lime',
  },
];

const COMPARISON_ROWS = [
  { label: 'Landing page',          vals: [true,  true,  true]  },
  { label: 'Multi-page app',        vals: [false, true,  true]  },
  { label: 'Firestore backend',     vals: [false, true,  true]  },
  { label: 'Brand identity kit',    vals: [false, true,  true]  },
  { label: 'Dark/light mode',       vals: [false, true,  true]  },
  { label: 'SEO meta',              vals: [true,  true,  true]  },
  { label: 'Revisions',             vals: ['2',   '4',   '∞']   },
  { label: 'Post-launch support',   vals: [false, '30d', 'SLA'] },
  { label: 'Architecture consult',  vals: [false, false, true]  },
];

const FAQS = [
  {
    q: 'Do you require a deposit?',
    a: '50% upfront, 50% on delivery. For retainer clients, the full monthly amount is invoiced at the start of each billing period.',
  },
  {
    q: 'What currency do you invoice in?',
    a: 'USD for international clients. LKR equivalent rates are available for Sri Lankan clients — we quote both in the proposal.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bank transfer (local and international), PayPal, and Wise. We send a formal invoice for every payment.',
  },
  {
    q: 'What happens if the project runs over scope?',
    a: 'We flag scope changes before acting on them. If the additional work requires a separate cost, we quote it and get your sign-off before proceeding. No surprise invoices.',
  },
];

export default function Pricing() {
  useScrollFadeUp();

  return (
    <div>
      {/* Panel 1 */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Investment</p>
          <h1 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem', maxWidth: '640px' }}>
            Transparent pricing.<br />No surprises.
          </h1>
          <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px' }}>
            Every tier listed with a real price range, timeline, and what's included — so you can scope a project before you even contact us.
          </p>
        </div>
      </section>

      {/* Panel 2: Three tier cards */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className="fade-up"
                data-delay={i * 80}
                style={{
                  background: 'var(--bg)',
                  border: `1px solid ${tier.featured ? 'var(--orange)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-card)',
                  padding: '2rem',
                  display: 'flex', flexDirection: 'column',
                  ...(tier.featured ? { boxShadow: '0 0 0 1px var(--orange)' } : {}),
                }}
              >
                {tier.featured && (
                  <span style={{
                    background: 'var(--orange)', color: 'var(--white-locked)',
                    fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    padding: '0.25rem 0.75rem', borderRadius: '999px',
                    display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start',
                  }}>
                    Recommended
                  </span>
                )}

                <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>{tier.name}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{tier.tagline}</p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="font-display" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>{tier.usd}</span>
                  {tier.usd !== 'Custom' && <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>USD</span>}
                  <br />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{tier.lkr}</span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>Timeline</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>{tier.timeline}</p>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>Revisions</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>{tier.revision}</p>
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                      <CheckIcon className="w-4 h-4" style={{ color: 'var(--orange)', flexShrink: 0, marginTop: '2px' }} />
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', opacity: 0.35 }}>
                      <span style={{ width: 16, height: 16, flexShrink: 0 }}>–</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={tier.featured ? 'btn-liquid' : ''}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: tier.featured ? 'var(--orange)' : 'var(--bg-alt)',
                    color: tier.featured ? 'var(--white-locked)' : 'var(--text)',
                    border: `1px solid ${tier.featured ? 'var(--orange)' : 'var(--border)'}`,
                    borderRadius: tier.featured ? undefined : '999px',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    textDecoration: 'none', padding: '0.75rem',
                  }}
                >
                  {tier.usd === 'Custom' ? 'Get a Quote' : 'Start This Tier'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Panel 3: Comparison table */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Side by side</p>
          <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem' }}>
            What's in each tier
          </h2>
          <div className="fade-up" data-delay="120" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Feature</th>
                  {TIERS.map(t => (
                    <th key={t.name} style={{ padding: '1rem', borderBottom: '2px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', color: t.featured ? 'var(--orange)' : 'var(--text)' }}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid var(--border)', background: i % 2 ? 'var(--bg-alt)' : 'transparent' }}>
                    <td style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} style={{ padding: '0.875rem 1rem', textAlign: 'center' }}>
                        {v === true ? <CheckIcon className="w-4 h-4" style={{ color: 'var(--orange)', margin: '0 auto' }} />
                          : v === false ? <span style={{ color: 'var(--border)' }}>—</span>
                          : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>{v}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Panel 4: FAQ */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Pricing FAQ</p>
          <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>
            Payment & terms
          </h2>
          <div className="fade-up" data-delay="120">
            {FAQS.map(faq => <AccordionItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* Panel 5: Currency note */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-container" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>Currency note</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              USD pricing is the baseline. LKR equivalent quoted at the prevailing rate on the day of invoicing. All rates are approximate — final cost is confirmed in the project proposal.
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
            Colombo-based · Remote-friendly
          </p>
        </div>
      </section>

      {/* Panel 6: CTA */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <div className="fade-up" style={{
            textAlign: 'center', padding: '4rem 2rem',
            borderRadius: 'var(--radius-curve)',
            background: 'var(--text)', color: 'var(--white-locked)',
          }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'var(--white-locked-10)' }}>Scoped and ready?</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem', color: 'var(--white-locked)' }}>
              Let's write up a brief.
            </h2>
            <Link
              to="/contact"
              className="btn-liquid"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--orange)', color: 'var(--white-locked)',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                textDecoration: 'none', padding: '0.875rem 2rem', marginTop: '1rem',
              }}
            >
              Contact Us <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
