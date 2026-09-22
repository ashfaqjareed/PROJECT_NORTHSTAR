// src/pages/Process.jsx — Redesigned: hero + 4 premium step cards
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { ArrowRightIcon } from '../icons';

/* ─── Shared fade-up animation ─── */
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Step number badge ─── */
function StepBadge({ num }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: 'var(--orange)', borderRadius: '999px',
      padding: '0.3rem 1rem',
      marginBottom: '1.5rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.14em',
        color: 'var(--white-locked)',
      }}>
        Step {num}
      </span>
    </div>
  );
}

/* ─── Bullet check mark ─── */
function Bullet({ children }) {
  return (
    <li style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.85rem',
      fontFamily: 'var(--font-sans)', fontSize: '0.92rem',
      color: 'var(--text-muted)', lineHeight: 1.65,
    }}>
      <span style={{
        flexShrink: 0, marginTop: '3px',
        width: 20, height: 20, borderRadius: '50%',
        background: 'var(--orange)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        fontWeight: 900, color: 'var(--white-locked)',
      }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

/* ─── Step Card ─── */
function StepCard({ num, eyebrow, title, description, bullets, alt = false }) {
  return (
    <section style={{ background: alt ? 'var(--bg-alt)' : 'var(--bg)', padding: '5rem 0' }}>
      <div className="section-container">
        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Step badge */}
          <motion.div variants={fadeUpItem}>
            <StepBadge num={num} />
          </motion.div>

          {/* Main heading + sub-heading row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem 3rem',
            alignItems: 'end',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2rem',
          }}>
            <motion.div variants={fadeUpItem}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--orange)', marginBottom: '0.5rem',
              }}>{eyebrow}</p>
              <h2 className="font-display" style={{
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>{title}</h2>
            </motion.div>

            <motion.p variants={fadeUpItem} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              margin: 0,
            }}>
              {description}
            </motion.p>
          </div>

          {/* Bullet points container */}
          <motion.div
            variants={fadeUpItem}
            style={{
              background: alt ? 'var(--bg)' : 'var(--bg-alt)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--border)',
              padding: '2.5rem',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--text-muted)', marginBottom: '1.5rem',
            }}>
              Deliverables at this stage
            </p>
            <ul style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}>
              {bullets.map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Process() {
  useScrollFadeUp();

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{ padding: '6rem 0 5rem' }}>
        <div className="section-container">
          <motion.div
            variants={fadeUpContainer}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUpItem} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.14em',
              color: 'var(--orange)', marginBottom: '1rem',
            }}>
              How we work
            </motion.p>

            <motion.h1 variants={fadeUpItem} className="font-display" style={{
              fontSize: 'clamp(2.75rem, 7vw, 5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              maxWidth: '720px',
            }}>
              A disciplined process,<br />documented at every stage.
            </motion.h1>

            <motion.p variants={fadeUpItem} style={{
              fontFamily: 'var(--font-sans)', fontSize: '1.1rem',
              color: 'var(--text-muted)', lineHeight: 1.75,
              maxWidth: '560px', marginBottom: '2.5rem',
            }}>
              Every engagement follows four sequential stages. No black-box production — you have full visibility into the work from day one.
            </motion.p>

            {/* Step index pills */}
            <motion.div variants={fadeUpItem} style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.65rem',
            }}>
              {[
                { num: '01', label: 'Discovery' },
                { num: '02', label: 'Design' },
                { num: '03', label: 'Build' },
                { num: '04', label: 'Launch & Handoff' },
              ].map(s => (
                <span key={s.num} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '999px', padding: '0.35rem 0.9rem',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600,
                  color: 'var(--text-muted)',
                }}>
                  <span style={{ color: 'var(--orange)', fontWeight: 800 }}>{s.num}</span>
                  {s.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STEP 1: DISCOVERY ── */}
      <StepCard
        num="01"
        eyebrow="Kickoff"
        title="Discovery"
        description="Before we design or code anything, we map your goals, audience, and constraints. We send you a structured intake form covering brand, functionality, timeline, and budget. Once complete, we produce a written scope document that both parties sign before any deposit is requested."
        bullets={[
          'Structured intake form covering all project dimensions',
          'Written scope document with a full deliverable list',
          'Project timeline broken down into milestones',
          'First payment invoice issued (50% deposit)',
          'Signed agreement before any work begins',
          'Dedicated project point-of-contact assigned',
        ]}
        alt={false}
      />

      {/* ── STEP 2: DESIGN ── */}
      <StepCard
        num="02"
        eyebrow="Design"
        title="Design"
        description="High-fidelity mockups with your design system tokens — colour palette, typography scale, spacing — defined up front. You review the mockup in Figma with comment access before any code is written. We don't begin building until the design is approved."
        bullets={[
          'Figma mockup covering all key pages and screens',
          'Design token documentation (colours, type, spacing)',
          'Fully responsive layouts for mobile and desktop',
          'Client comment access for direct feedback in Figma',
          'Formal design approval checkpoint before build starts',
          'Component inventory prepared for engineering handoff',
        ]}
        alt
      />

      {/* ── STEP 3: BUILD ── */}
      <StepCard
        num="03"
        eyebrow="Engineering"
        title="Build"
        description="Component-driven React build with continuous preview deploys on Vercel. You can see the work live every day — no waiting for a formal presentation. Accessibility, performance, and dark mode are built in from the first component, not added at the end."
        bullets={[
          'Live Vercel preview URL shared from day one',
          'Weekly async progress updates via email or WhatsApp',
          'Component-level code reviews and clean git history',
          'Lighthouse audit report for performance and accessibility',
          'Dark mode and responsive layout built-in from the start',
          'End-to-end testing on target device sizes before QA',
        ]}
        alt={false}
      />

      {/* ── STEP 4: LAUNCH & HANDOFF ── */}
      <StepCard
        num="04"
        eyebrow="Go-Live"
        title="Launch & Handoff"
        description="Production deployment to your domain with full DNS configuration, SSL, and environment variable setup. After launch, we run a handoff session covering the codebase structure, any CMS or Firestore configuration, and the post-launch support terms. Everything is documented in writing."
        bullets={[
          'Production deployment with full domain and DNS config',
          'SSL certificate and environment variable setup',
          'Codebase walkthrough document for your team',
          'Firestore or CMS training session (if applicable)',
          '30-day post-launch support window (Full Launch tier)',
          'Final payment invoice issued (50% balance)',
        ]}
        alt
      />

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'space-between', alignItems: 'center',
              gap: '2rem', padding: '3.5rem',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--border)',
              background: 'var(--bg-alt)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Subtle glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '30%',
              transform: 'translate(-50%,-50%)',
              width: '300px', height: '300px',
              background: 'var(--orange)',
              borderRadius: '50%', filter: 'blur(100px)',
              opacity: 0.06, pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--orange)', marginBottom: '0.5rem',
              }}>
                Ready to start?
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', margin: 0 }}>
                Begin with a brief.
              </h2>
            </div>

            <Link
              to="/contact"
              className="btn-liquid"
              style={{
                position: 'relative', zIndex: 1,
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--orange)', color: 'var(--white-locked)',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                textDecoration: 'none', padding: '0.875rem 2rem', flexShrink: 0,
              }}
            >
              Contact Us <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
