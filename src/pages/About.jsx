// src/pages/About.jsx — 6 panels
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { ShieldIcon, CodeIcon, BoltIcon, PaletteIcon, ArrowRightIcon } from '../icons';

function Section({ children, alt = false, style = {} }) {
  return (
    <section style={{ background: alt ? 'var(--bg-alt)' : 'var(--bg)', padding: '5rem 0', ...style }}>
      <div className="section-container">{children}</div>
    </section>
  );
}

export default function About() {
  useScrollFadeUp();

  return (
    <div>
      {/* Panel 1: Header */}
      <Section>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Who we are</p>
        <h1 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem', maxWidth: '640px' }}>
          About NorthStarDevs.
        </h1>
        <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px' }}>
          A small, focused creative engineering studio based in Colombo. We specialise in high-performance React ecosystems and Swiss-modern visual identities.
        </p>
      </Section>

      {/* Panel 2: Origin story */}
      <Section alt>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Origin</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1.25rem' }}>
              Built by students. Run like a firm.
            </h2>
          </div>
          <div className="fade-up" data-delay="120" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              NorthStarDevs started as a side project between two engineering students who kept noticing the same problem: most web studios over-promise on aesthetics and under-deliver on performance. The client gets a beautiful Figma file and a slow, template-based build.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We decided to own both ends — design and engineering under one roof, with no handoff translation loss. Every component is built by the same person who designed it. What you see in the mockup is exactly what ships.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We're early in our client history and honest about that. No fabricated testimonials, no inflated project counts. What we have is a clear process, documented standards, and a portfolio of real work — including this site, which is our live case study.
            </p>
          </div>
        </div>
      </Section>

      {/* Panel 3: Engineering philosophy */}
      <Section>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Philosophy</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem', maxWidth: '520px' }}>
          How we think about building things
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            {
              icon: CodeIcon, title: 'Code is the design',
              desc: 'Design tokens, spacing scales, and typography systems are defined in code — not handed off as a PDF. The browser is the final design surface and we treat it that way.',
            },
            {
              icon: BoltIcon, title: 'Performance is a deliverable',
              desc: 'Lighthouse scores aren\'t a checkbox. Core Web Vitals are scoped into every project. We audit before handoff and document the results.',
            },
            {
              icon: ShieldIcon, title: 'Written scope, always',
              desc: 'Every project begins with a brief that defines deliverables, revision rounds, and timeline. Scope creep doesn\'t happen accidentally — it happens when things aren\'t written down.',
            },
            {
              icon: PaletteIcon, title: 'Restraint over noise',
              desc: 'Swiss-modern design isn\'t a trend — it\'s a discipline. We add elements only when they serve the communication. The result is interfaces that age well and load fast.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="fade-up bento-card" data-delay={i * 80} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display" style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Panel 4: Values */}
      <Section alt>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Values</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem' }}>
          What we stand behind
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            { num: '01', title: 'Directness', desc: 'We tell you what we actually think about your brief — including when a scope is too broad for the budget.' },
            { num: '02', title: 'Precision',  desc: 'We don\'t ship until it\'s right. Pixel fidelity, performance scores, and accessibility are non-negotiable checkpoints.' },
            { num: '03', title: 'Transparency', desc: 'No black-box production. Staging deploys are live every week so you can see progress without a formal presentation.' },
          ].map((v, i) => (
            <div
              key={v.title}
              className="fade-up"
              data-delay={i * 80}
              style={{ padding: '2rem', background: 'var(--bg)', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
            >
              <p className="eyebrow" style={{ marginBottom: '0.5rem', color: 'var(--orange)' }}>{v.num}</p>
              <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Panel 5: What we don't do */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Scope limits</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              What we don't do
            </h2>
            <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Specificity builds trust. Knowing what a studio won't take on tells you more than a list of everything they claim to do.
            </p>
          </div>
          <div className="fade-up" data-delay="120" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'WordPress or template-based builds',
              'Social media management',
              'Paid advertising / SEO campaigns',
              'Mobile apps (iOS / Android native)',
              'Projects without a written brief',
              'Spec work (free design samples)',
            ].map(item => (
              <div key={item} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'center',
                padding: '0.875rem 1rem',
                border: '1px solid var(--border)', borderRadius: '8px',
                fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border)', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Panel 6: CTA */}
      <Section alt>
        <div className="fade-up" style={{
          textAlign: 'center', padding: '3rem 2rem',
          borderRadius: 'var(--radius-curve)',
          border: '1px solid var(--border)', background: 'var(--bg)',
        }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Want to work with us?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
            Send us a brief on WhatsApp or email — we respond within the day.
          </p>
          <Link to="/contact" className="btn-liquid" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--orange)', color: 'var(--white-locked)',
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            textDecoration: 'none', padding: '0.875rem 2rem',
          }}>
            Contact Us <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
