// src/pages/Home.jsx  — 9 panels, full shape/motion system
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import {
  StarIcon, CodeIcon, BoltIcon, PaletteIcon, CloudIcon, ShieldIcon,
  ArrowRightIcon, CheckIcon, WhatsAppIcon, PlusIcon, MinusIcon,
} from '../icons';

/* ─── SHARED SECTION WRAPPER ─── */
function Section({ children, style = {}, className = '' }) {
  return (
    <section className={`section-container ${className}`} style={{ paddingTop: '5rem', paddingBottom: '5rem', ...style }}>
      {children}
    </section>
  );
}

/* ─── WAVE DIVIDER ─── */
function WaveDivider({ flip = false, color = 'var(--bg-alt)' }) {
  return (
    <div style={{ overflow: 'hidden', lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', marginBottom: '-2px' }}>
      <svg viewBox="0 0 1200 64" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '64px' }}>
        <path
          className="wave-morph"
          d="M0,32 C150,64 350,0 600,32 C850,64 1050,0 1200,32 L1200,64 L0,64 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/* ─── BLOB MORPH ─── */
function BlobMorph() {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      <svg className="blob-morph" viewBox="-100 -100 200 200" style={{ width: '500px', height: '500px', opacity: 0.06 }}>
        <path fill="var(--orange)" />
      </svg>
    </div>
  );
}

/* ─── ORBIT DOTS around an icon ─── */
function OrbitDots({ icon: Icon, color = 'var(--orange)', size = 80 }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon style={{ width: 32, height: 32, color }} />

      {/* Orbit ring 1 */}
      <div className="orbit-ring" style={{
        position: 'absolute', width: '100%', height: '100%', inset: 0,
      }}>
        <div className="orbit-child" style={{
          position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
          width: 8, height: 8, borderRadius: '50%', background: color, opacity: 0.6,
        }} />
      </div>

      {/* Orbit ring 2 */}
      <div className="orbit-ring-2" style={{
        position: 'absolute', width: '130%', height: '130%',
        top: '-15%', left: '-15%',
      }}>
        <div className="orbit-child-2" style={{
          position: 'absolute', top: '-3px', left: '50%', transform: 'translateX(-50%)',
          width: 6, height: 6, borderRadius: '50%', background: color, opacity: 0.35,
        }} />
      </div>
    </div>
  );
}

/* ─── MARQUEE STRIP ─── */
const TECH_TAGS = [
  'React 19', 'Vite', 'Tailwind CSS', 'TypeScript', 'Firestore', 'Node.js',
  'Vercel Edge', 'Figma', 'Web Apps', 'Brand Identity', 'Landing Pages', 'Graphic Design',
  'React 19', 'Vite', 'Tailwind CSS', 'TypeScript', 'Firestore', 'Node.js',
  'Vercel Edge', 'Figma', 'Web Apps', 'Brand Identity', 'Landing Pages', 'Graphic Design',
];

function MarqueeStrip() {
  return (
    <div style={{ overflow: 'hidden', padding: '1.25rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="marquee-track">
        {TECH_TAGS.map((tag, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0 2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: i % 3 === 0 ? 'var(--orange)' : 'var(--lime)',
              flexShrink: 0,
            }} />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── BENTO CARD ─── */
function BentoCard({ children, accent = 'orange', asym = false, className = '', style = {} }) {
  const cls = `bento-card accent-${accent} ${asym ? 'bento-card-asym' : ''} ${className}`;
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}

/* ─── CURSOR ORB ─── */
function CursorOrb({ containerRef }) {
  const orbRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleMove = useCallback((e) => {
    if (!containerRef.current || !orbRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      if (orbRef.current) {
        orbRef.current.style.left = `${x}px`;
        orbRef.current.style.top = `${y}px`;
      }
    });
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMove);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [containerRef, handleMove]);

  return (
    <div
      ref={orbRef}
      className="cursor-orb"
      style={{ background: 'var(--orange)', left: '50%', top: '50%' }}
    />
  );
}

/* ─── LIVE COUNTER ─── */
function LiveCounter({ target, duration = 1800, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="font-display" style={{ fontSize: '2.5rem', color: 'var(--orange)' }}>
      {val}{suffix}
    </span>
  );
}

/* ─── PROCESS STEP ─── */
function ProcessStep({ num, title, desc, delay }) {
  return (
    <div className="fade-up" data-delay={delay} style={{ display: 'flex', gap: '1.5rem' }}>
      <div style={{
        flexShrink: 0, width: 48, height: 48, borderRadius: '12px',
        background: 'var(--text)', padding: '2rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--white-locked)',
        textTransform: 'uppercase', letterSpacing: '0.2em', whiteSpace: 'nowrap', position: 'relative', zIndex: 10,
      }}>{num}
      </div>
      <div>
        <h3 className="font-display" style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{title}</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─── ACCORDION ─── */
function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 0',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span className="font-display" style={{ fontSize: '1rem' }}>{q}</span>
        {open ? <MinusIcon className="w-5 h-5" style={{ flexShrink: 0, color: 'var(--orange)' }} />
               : <PlusIcon  className="w-5 h-5" style={{ flexShrink: 0 }} />}
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
          color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: '1.25rem',
        }}>{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
export default function Home() {
  useScrollFadeUp();
  const pricingRef = useRef(null);
  const heroRef = useRef(null);

  return (
    <div>

      {/* ── PANEL 1: HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 4rem' }}>
        <BlobMorph />
        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px' }}>
            {/* Eyebrow */}
            <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.35rem 0.9rem',
                border: '1px solid var(--border)',
                borderRadius: '999px',
                background: 'var(--bg-alt)',
              }}>
                <StarIcon className="w-3 h-3" style={{ color: 'var(--orange)' }} />
                <span className="eyebrow">Creative Engineering Studio — Colombo, Sri Lanka</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-display fade-up"
              data-delay="60"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
                color: 'var(--text)',
              }}
            >
              We engineer<br />
              interfaces that<br />
              <span style={{ color: 'var(--orange)' }}>demand attention.</span>
            </h1>

            {/* Subhead */}
            <p
              className="fade-up"
              data-delay="120"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '2.5rem',
              }}
            >
              High-contrast visual identities, scalable React portals, and performance-first client interfaces.
              Designed for precision. Engineered for speed.
            </p>

            {/* CTAs */}
            <div className="fade-up" data-delay="180" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                  className="btn-liquid"
                  style={{
                    background: 'var(--orange)', color: 'var(--white-locked)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  textDecoration: 'none', padding: '0.875rem 2rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                }}
              >
                Start a Project <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-alt)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700,
                  textDecoration: 'none', padding: '0.875rem 2rem',
                  borderRadius: '999px',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 2: TRUST MARQUEE ── */}
      <MarqueeStrip />

      {/* ── PANEL 3: BENTO HIGHLIGHTS (6-col) ── */}
      <Section>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Core Capabilities</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem', maxWidth: '480px' }}>
          What we deliver
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'auto',
          gap: '1rem',
        }}>
          {/* Span 4 — Component-driven UI */}
          <div className="fade-up" data-delay="60" style={{ gridColumn: 'span 4' }}>
            <BentoCard accent="orange" style={{ minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <OrbitDots icon={CodeIcon} color="var(--orange)" />
              </div>
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Architecture</span>
                <h3 className="font-display" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Component-Driven UI</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Strictly typed, modular React ecosystems. Every element reusable, rigorously tested, aligned to premium design tokens.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Span 2 — Performance */}
          <div className="fade-up" data-delay="120" style={{ gridColumn: 'span 2' }}>
            <BentoCard accent="lime" asym style={{ minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <OrbitDots icon={BoltIcon} color="var(--lime)" />
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Velocity</span>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>90 FPS Motion</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  GPU-composited transitions. Zero jank. Every animation on <code>transform</code> and <code>opacity</code> only.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Span 2 — Design */}
          <div className="fade-up" data-delay="180" style={{ gridColumn: 'span 2' }}>
            <BentoCard accent="lime" style={{ minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <OrbitDots icon={PaletteIcon} color="var(--lime)" />
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Aesthetics</span>
                <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Swiss-Modern</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  High contrast. Pristine typography. Zero clutter.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Span 2 — Backend */}
          <div className="fade-up" data-delay="240" style={{ gridColumn: 'span 2' }}>
            <BentoCard accent="orange" asym style={{ minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <OrbitDots icon={CloudIcon} color="var(--orange)" />
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Backend</span>
                <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Serverless API</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Edge-deployed Node environments backed by real-time Firestore.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* Span 2 — SLA */}
          <div className="fade-up" data-delay="300" style={{ gridColumn: 'span 2' }}>
            <BentoCard accent="lime" style={{ minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <OrbitDots icon={ShieldIcon} color="var(--lime)" />
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem' }}>Guarantee</span>
                <h3 className="font-display" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Strict SLA</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Fixed timelines, defined revision cycles, and written retainer terms.
                </p>
              </div>
            </BentoCard>
          </div>
        </div>
      </Section>

      {/* ── WAVE DIVIDER ── */}
      <WaveDivider color="var(--bg-alt)" />

      {/* ── PANEL 4: PROCESS PREVIEW ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>How it works</p>
              <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
                A disciplined four-step process
              </h2>
              <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                No black-box production. Every engagement follows a documented sequence you can inspect at any stage.
              </p>
              <div className="fade-up" data-delay="180">
                <Link
                  to="/process"
                  className="btn-liquid"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'var(--text)', color: 'var(--bg)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700,
                    textDecoration: 'none', padding: '0.75rem 1.5rem',
                  }}
                >
                  See Full Process <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <ProcessStep num="01" title="Discovery" desc="We map your goals, audience, and technical constraints in a structured brief before any design work begins." delay="60" />
              <ProcessStep num="02" title="Design" desc="High-fidelity mockups with your design system tokens defined up front. No surprises mid-build." delay="120" />
              <ProcessStep num="03" title="Build" desc="Component-driven React build with continuous preview deploys. You can see the work live every day." delay="180" />
              <ProcessStep num="04" title="Launch & Handoff" desc="Production deploy plus handoff documentation — codebase walkthrough, CMS training, and SLA contract." delay="240" />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider flip color="var(--bg-alt)" />

      {/* ── PANEL 5: FEATURED PROJECT ── */}
      <Section>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Featured Work</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem' }}>
          What we build
        </h2>

        {/* Asymmetric featured card */}
        <div className="fade-up bento-card bento-card-asym accent-orange" data-delay="120" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem',
          padding: '3rem', alignItems: 'center', overflow: 'hidden',
          position: 'relative',
        }}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--orange)' }}>Web Application</span>
            <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              NorthStarDevs<br />Platform Itself
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This site is our live case study. React 19 + Vite + Tailwind v4 + Firestore,
              14 routes, full dark mode, and a Swiss-modern design system built from scratch in 7 days.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['React 19', 'Vite', 'Tailwind v4', 'Firestore'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '0.25rem 0.75rem', borderRadius: '999px',
                  border: '1px solid var(--border)', color: 'var(--text-muted)',
                }}>{t}</span>
              ))}
            </div>
            <Link to="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--orange)', textDecoration: 'none',
            }}>
              View all projects <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Visual placeholder — grid of squares */}
          <div style={{
            background: 'var(--bg-alt)', borderRadius: '16px',
            padding: '2rem', minHeight: '220px',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem',
          }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{
                background: i % 5 === 0 ? 'var(--orange)' : i % 7 === 0 ? 'var(--lime)' : 'var(--border)',
                borderRadius: '6px', aspectRatio: '1',
                opacity: 0.3 + (i % 4) * 0.15,
              }} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── PANEL 6: PRICING PREVIEW ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }} ref={pricingRef}>
        <CursorOrb containerRef={pricingRef} />

        <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Investment</p>
          <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>
            Transparent pricing
          </h2>
          <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', marginBottom: '3rem' }}>
            Three tiers. No hidden fees. USD rates — LKR equivalent available on request.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {[
              {
                tier: 'Speed MVP', price: 'From $500', desc: 'Precision landing page or brand asset. 5-day delivery. Up to 2 revision rounds.',
                features: ['Single-page layout', 'Mobile-responsive', 'Performance optimised', '2 revisions'],
                accent: 'lime',
              },
              {
                tier: 'Full Launch', price: 'From $1,500', desc: 'Complete web application with multi-page routing, Firestore backend, and full brand system.',
                features: ['Multi-page React app', 'Firestore backend', 'Brand identity kit', 'Dark/light mode', '4 revisions', '30-day support'],
                accent: 'orange', featured: true,
              },
              {
                tier: 'Custom Retainer', price: 'Let\'s talk', desc: 'Ongoing engineering partnership — feature builds, SLA-backed support, and monthly reviews.',
                features: ['Monthly scope', 'Priority support', 'Weekly check-ins', 'Documented SLA'],
                accent: 'lime',
              },
            ].map((plan, i) => (
              <div
                key={plan.tier}
                className={`fade-up bento-card accent-${plan.accent}`}
                data-delay={i * 80}
                style={{
                  display: 'flex', flexDirection: 'column',
                  ...(plan.featured ? {
                    borderColor: 'var(--orange)',
                    boxShadow: '0 0 0 1px var(--orange)',
                  } : {}),
                }}
              >
                {plan.featured && (
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{
                      background: 'var(--orange)', color: 'var(--white-locked)',
                      fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      padding: '0.25rem 0.75rem', borderRadius: '999px',
                    }}>Most Popular</span>
                  </div>
                )}

                <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{plan.tier}</p>
                <div className="font-display" style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: `var(--brand-${plan.accent === 'orange' ? 'orange' : 'text'})` }}>
                  <LiveCounter
                    target={plan.price === "From $500" ? 500 : plan.price === "From $1,500" ? 1500 : 0}
                    suffix={plan.price === "From $500" ? "" : plan.price === "From $1,500" ? "" : ""}
                  />
                  {plan.price === "Let's talk"
                    ? <span className="font-display" style={{ fontSize: '1.75rem' }}>Let's talk</span>
                    : <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: 400 }}> USD</span>}
                </div>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {plan.desc}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
                      <CheckIcon className="w-4 h-4" style={{ color: 'var(--orange)', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/pricing"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    background: plan.featured ? 'var(--orange)' : 'var(--bg-alt)',
                    color: plan.featured ? 'var(--white-locked)' : 'var(--text)',
                    border: `1px solid ${plan.featured ? 'var(--orange)' : 'var(--border)'}`,
                    borderRadius: '999px',
                    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    textDecoration: 'none', padding: '0.75rem',
                    transition: 'opacity 0.2s',
                  }}
                >
                  See Full Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--bg-alt)" />

      {/* ── PANEL 7: WHY NORTHSTARDEVS ── */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Why us</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1.25rem' }}>
              Built by engineers who design, and designers who code.
            </h2>
            <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Most studios hand design off to developers who re-interpret it. We own both ends of the stack.
              What you see in the mockup is what ships — pixel-identical, performance-verified, and accessible.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { title: 'No translation loss', desc: 'Design and engineering under one roof. Mockup fidelity guaranteed.' },
              { title: 'Written scope, always', desc: 'Every project has a defined scope document before work begins. No scope creep.' },
              { title: 'Performance by default', desc: 'Lighthouse audited on every build. We treat Core Web Vitals as a deliverable.' },
              { title: 'Honest timelines', desc: 'We give you a realistic schedule and stick to it — or communicate proactively if anything changes.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="fade-up bento-card"
                data-delay={i * 80}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem 1.5rem' }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'var(--orange)',
                  marginTop: '0.35rem', flexShrink: 0,
                }} />
                <div>
                  <p className="font-display" style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.title}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PANEL 8: FAQ PREVIEW ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem', textAlign: 'center' }}>Common Questions</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem', textAlign: 'center' }}>
              Answered up front
            </h2>

            <div className="fade-up" data-delay="120">
              <AccordionItem
                q="How long does a typical project take?"
                a="Landing pages: 5–7 business days. Full web applications: 3–5 weeks depending on scope. We define this in the written brief before any deposit is taken."
              />
              <AccordionItem
                q="What do you need from me to start?"
                a="A brief covering your goals, target audience, and any existing brand assets. We send you a structured intake form — usually takes 15 minutes to fill in."
              />
              <AccordionItem
                q="Do you offer ongoing support after launch?"
                a="Yes. Our Full Launch tier includes 30-day post-launch support. Custom Retainer clients get a dedicated monthly scope with priority response times defined in a written SLA."
              />
            </div>

            <div className="fade-up" data-delay="300" style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link to="/faq" style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                color: 'var(--text)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              }}>
                Full FAQ <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL 9: FINAL CTA ── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="section-container">
          <div
            className="fade-up bento-card"
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              borderRadius: 'var(--radius-curve)',
              background: 'var(--text)',
              color: 'var(--bg)',
              border: 'none',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.5)', marginBottom: '1rem',
            }}>
              Ready to build?
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', color: 'var(--white-locked)' }}>
              Ready to start?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(255,255,255,0.65)', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              Message us on WhatsApp for a response within the hour, or drop us an email.
              We respond to every inquiry personally — no automated responses.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'var(--white-locked-10)', color: 'var(--white-locked)',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  textDecoration: 'none', padding: '0.875rem 2rem',
                }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'var(--white-locked-10)', color: 'var(--white-locked)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  textDecoration: 'none', padding: '0.875rem 2rem',
                  borderRadius: '999px',
                }}
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
