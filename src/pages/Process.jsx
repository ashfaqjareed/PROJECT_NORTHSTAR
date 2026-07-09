// src/pages/Process.jsx — 6 panels
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { ArrowRightIcon } from '../icons';

function Step({ num, title, eyebrow, desc, deliverables, alt = false }) {
  return (
    <section style={{ background: alt ? 'var(--bg-alt)' : 'var(--bg)', padding: '5rem 0' }}>
      <div className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.5rem', color: 'var(--orange)' }}>Step {num}</p>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>{eyebrow}</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1.25rem' }}>
              {title}
            </h2>
            <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {desc}
            </p>
          </div>
          <div className="fade-up bento-card" data-delay="120">
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Deliverables at this stage</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {deliverables.map(d => (
                <li key={d} style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'var(--orange)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px',
                    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--white-locked)',
                  }}>✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Process() {
  useScrollFadeUp();

  return (
    <div>
      {/* Panel 1: Header */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>How we work</p>
          <h1 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem', maxWidth: '680px' }}>
            A disciplined process,<br />documented at every stage.
          </h1>
          <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px' }}>
            Every engagement follows four sequential stages. No black-box production — you have visibility into the work from day one.
          </p>
        </div>
      </section>

      {/* Steps 1–4 */}
      <Step
        num="01"
        eyebrow="Kickoff"
        title="Discovery"
        desc="Before we design or code anything, we map your goals, audience, and constraints. We send you a structured intake form covering brand, functionality, timeline, and budget. Once complete, we produce a written scope document that both parties sign before any deposit is requested."
        deliverables={[
          'Completed intake form',
          'Written scope document with deliverable list',
          'Timeline with milestones',
          'First payment invoice (50%)',
        ]}
        alt={false}
      />

      <Step
        num="02"
        eyebrow="Design"
        title="Design"
        desc="High-fidelity mockups with your design system tokens — colour palette, typography scale, spacing — defined up front. You review the mockup in Figma with comment access before any code is written. We don't begin building until the design is approved."
        deliverables={[
          'Figma mockup (all key pages / screens)',
          'Design token documentation',
          'Responsive layouts (mobile + desktop)',
          'Client approval checkpoint',
        ]}
        alt
      />

      <Step
        num="03"
        eyebrow="Engineering"
        title="Build"
        desc="Component-driven React build with continuous preview deploys on Vercel. You can see the work live every day — no waiting for a formal presentation. Accessibility, performance, and dark mode are built in from the first component, not added at the end."
        deliverables={[
          'Live Vercel preview URL from day 1',
          'Weekly async progress updates',
          'Component-level code reviews',
          'Lighthouse audit report',
        ]}
        alt={false}
      />

      <Step
        num="04"
        eyebrow="Go-Live"
        title="Launch & Handoff"
        desc="Production deployment to your domain with full DNS configuration, SSL, and environment variable setup. After launch, we run a handoff session covering the codebase structure, any CMS or Firestore configuration, and the post-launch support terms. Everything is documented in writing."
        deliverables={[
          'Production deployment + domain config',
          'Codebase walkthrough document',
          'Firestore / CMS training (if applicable)',
          '30-day support window (Full Launch tier)',
          'Final payment invoice (50%)',
        ]}
        alt
      />

      {/* Panel 6: CTA */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <div className="fade-up" style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
            gap: '2rem', padding: '3rem',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border)',
            background: 'var(--bg-alt)',
          }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Ready to start?</p>
              <h2 className="font-display" style={{ fontSize: '2rem' }}>Begin with a brief.</h2>
            </div>
            <Link
              to="/contact"
              className="btn-liquid"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--orange)', color: 'var(--white-locked)',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                textDecoration: 'none', padding: '0.875rem 2rem', flexShrink: 0,
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
