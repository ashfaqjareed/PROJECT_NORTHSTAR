import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  StarIcon, ArrowRightIcon, WhatsAppIcon,
  CodeIcon, BoltIcon, PaletteIcon, CloudIcon, ShieldIcon
} from '../icons';
import PillButton from '../components/PillButton';
import LogoMarquee from '../components/LogoMarquee';
import ServicePill from '../components/ServicePill';
import PricingPill from '../components/PricingPill';
import { TIERS } from '../data/pricing';

/* ─── SHARED COMPONENTS ─── */
const Section = ({ children, style = {}, className = '' }) => (
  <section className={`section-container ${className}`} style={{ paddingTop: '5rem', paddingBottom: '5rem', ...style }}>
    {children}
  </section>
);

const WaveDivider = ({ flip = false, color = 'var(--bg-alt)' }) => (
  <div style={{ overflow: 'hidden', lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', marginBottom: '-2px' }}>
    <svg viewBox="0 0 1200 64" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '64px' }}>
      <path className="wave-morph" d="M0,32 C150,64 350,0 600,32 C850,64 1050,0 1200,32 L1200,64 L0,64 Z" fill={color} />
    </svg>
  </div>
);

const BlobMorph = () => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
    <svg className="blob-morph" viewBox="-100 -100 200 200" style={{ width: '500px', height: '500px', opacity: 0.06 }}>
      <path fill="var(--orange)" />
    </svg>
  </div>
);

const CursorOrb = ({ containerRef }) => {
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
    <div ref={orbRef} className="cursor-orb" style={{ background: 'var(--orange)', left: '50%', top: '50%' }} />
  );
};

/* ─── ANIMATION VARIANTS ─── */
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

/* ─── MINI COMPONENTS ─── */
const ProcessStep = ({ num, title, desc }) => (
  <motion.div variants={fadeUpItem} style={{ display: 'flex', gap: '1.5rem' }}>
    <div style={{
      flexShrink: 0, width: 48, height: 48, borderRadius: '12px',
      background: 'var(--text)', padding: '2rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', color: 'var(--bg)',
      textTransform: 'uppercase', letterSpacing: '0.2em', whiteSpace: 'nowrap',
    }}>{num}
    </div>
    <div>
      <h3 className="font-display" style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  </motion.div>
);


/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const pricingRef = useRef(null);

  return (
    <div>
      {/* ── PANEL 1: HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 4rem' }}>
        <BlobMorph />
        <motion.div
          className="section-container" style={{ position: 'relative', zIndex: 1 }}
          variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        >
          <div style={{ maxWidth: '860px' }}>
            {/* Headline */}
            <motion.h1 variants={fadeUpItem} className="font-display" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              We build websites and<br /><span className="text-[var(--orange)]">web apps people remember.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '600px', marginBottom: '1rem' }}>
              NorthStarDevs is a Colombo-based software studio building custom websites, web apps, and digital experiences for businesses that want something better than a template.
            </motion.p>

            {/* Supporting line */}
            <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--orange)', letterSpacing: '0.05em', marginBottom: '2.5rem', fontWeight: 700 }}>
              Custom design. Clean code. Fast experiences. Built around your business.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpItem} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <PillButton as="link" to="/contact" variant="orange">
                Start a Project <ArrowRightIcon className="w-4 h-4 ml-2" />
              </PillButton>
              <PillButton as="link" to="/projects" variant="neutral">
                See Our Work
              </PillButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── PANEL 2: TECH MARQUEE ── */}
      <LogoMarquee />

      {/* ── PANEL 3: WHAT WE BUILD ── */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">What we do</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-10 max-w-2xl">
            What we build
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={fadeUpItem}>
              <ServicePill
                icon={<CodeIcon className="w-8 h-8" />}
                label="Custom Interfaces"
                description="We build reusable, maintainable interfaces instead of stitching together a template and calling it custom."
                accent="orange"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill
                icon={<BoltIcon className="w-8 h-8" />}
                label="Smooth Motion"
                description="Animations are designed to feel responsive without getting in the way of the experience."
                accent="lime"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill
                icon={<PaletteIcon className="w-8 h-8" />}
                label="Clean Visual Design"
                description="Strong typography, clear hierarchy and purposeful layouts. Nothing gets added just because it looks impressive."
                accent="orange"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill
                icon={<CloudIcon className="w-8 h-8" />}
                label="Web Applications"
                description="From forms and dashboards to accounts, databases and custom workflows — we build the functionality behind the interface."
                accent="lime"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill
                icon={<ShieldIcon className="w-8 h-8" />}
                label="Clear Scope & Timelines"
                description="You know what we're building, what it costs and when it's expected to be delivered before development begins."
                accent="orange"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill
                icon={<StarIcon className="w-8 h-8" />}
                label="Details That Matter"
                description="Small interactions, transitions and visual details that make the product feel finished without turning it into a showcase of animations."
                accent="lime"
                className="h-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </Section>

      <WaveDivider color="var(--bg-alt)" />

      {/* ── PANEL 4: PROCESS PREVIEW ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p variants={fadeUpItem} className="eyebrow mb-3">How it works</motion.p>
              <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-4">
                How we work with you
              </motion.h2>
              <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] text-lg mb-4">
                Four steps. You stay involved from the first conversation to launch.
              </motion.p>
              <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] mb-8">
                You know what's happening and when at every stage.
              </motion.p>
              <motion.div variants={fadeUpItem}>
                <PillButton as="link" to="/process" variant="neutral">
                  See Full Process <ArrowRightIcon className="w-4 h-4 ml-2" />
                </PillButton>
              </motion.div>
            </div>
            <div className="flex flex-col gap-8">
              <ProcessStep num="01" title="Discover" desc="We understand your business, audience, goals and requirements before we start designing." />
              <ProcessStep num="02" title="Design" desc="We turn the requirements into the structure, visual direction and key screens you'll actually see before development." />
              <ProcessStep num="03" title="Build" desc="We develop the approved design, share working previews and keep you updated throughout the build." />
              <ProcessStep num="04" title="Launch" desc="We test, deploy, hand over the project and help you get comfortable with what you've received." />
            </div>
          </div>
        </motion.div>
      </section>

      <WaveDivider flip color="var(--bg-alt)" />

      {/* ── PANEL 5: WHAT YOU GET ── */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Deliverables</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-10">
            What you actually get
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Custom Design', desc: 'A layout built around your brand, not a template with your logo dropped in.' },
              { title: 'Responsive Build', desc: 'Works properly on phones, tablets and desktops — tested before it goes live.' },
              { title: 'Clean Source Code', desc: 'Readable, organised code handed over at the end. No lock-in, no mystery.' },
              { title: 'Launch Support', desc: 'We stay available after launch to handle anything that needs attention.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUpItem} className="bg-[var(--bg-alt)] p-6 rounded-2xl border border-[var(--border)]">
                <div className="w-2 h-2 rounded-full bg-[var(--orange)] mb-4" />
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-[var(--text-muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ── PANEL 6: SELECTED WORK ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Portfolio</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-4">
            Selected Work
          </motion.h2>
          <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] mb-10">
            A few things we've built, designed and shipped.
          </motion.p>

          {/* Featured card */}
          <motion.div variants={fadeUpItem} className="bento-card-asym bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--orange)] p-8 md:p-12 relative overflow-hidden group transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="eyebrow text-[var(--orange)] mb-3 block">Web Application</span>
                <h3 className="font-display text-3xl md:text-4xl mb-4">
                  NorthStarDevs Studio Site
                </h3>
                <p className="font-sans text-[var(--text-muted)] leading-relaxed mb-6">
                  This site itself. Built with React 19, Vite, Tailwind v4 and Framer Motion. Custom dark mode, full responsive layout and a design system built from scratch in 7 days.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React 19', 'Vite', 'Tailwind v4', 'Framer Motion'].map(t => (
                    <span key={t} className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                      {t}
                    </span>
                  ))}
                </div>
                <Link to="/projects/northstar" className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--orange)] hover:opacity-80 transition-opacity">
                  View Case Study <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {/* Visual placeholder grid */}
              <div className="bg-[var(--bg-alt)] rounded-[16px] p-6 min-h-[280px] grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="rounded-md aspect-square transition-all duration-500 group-hover:scale-[1.02]" style={{
                    background: i % 5 === 0 ? 'var(--orange)' : i % 7 === 0 ? 'var(--lime)' : 'var(--border)',
                    opacity: 0.3 + (i % 4) * 0.15,
                  }} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-8 text-center">
            <PillButton as="link" to="/projects" variant="neutral">
              See All Projects <ArrowRightIcon className="w-4 h-4 ml-2" />
            </PillButton>
          </motion.div>
        </motion.div>
      </section>

      <WaveDivider color="var(--bg-alt)" />

      {/* ── PANEL 7: PRICING PREVIEW ── */}
      <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }} ref={pricingRef}>

        <motion.div className="section-container relative z-10" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Pricing</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-4">
            Straightforward pricing
          </motion.h2>
          <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] mb-12">
            Starting prices in LKR. Final cost depends on scope — a written quote is provided before we start.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-6">
            {TIERS.slice(0, 3).map((tier, i) => (
              <motion.div key={tier.slug} variants={fadeUpItem} className="flex">
                <PricingPill
                  slug={tier.slug}
                  tier={tier.name}
                  price={tier.lkr}
                  desc={tier.tagline}
                  features={tier.features}
                  accent={tier.accent}
                  accentHex={tier.accentHex}
                  featured={tier.featured}
                  badgeText={tier.badgeText}
                />
              </motion.div>
            ))}
          </div>

          {/* Full-width bottom rectangle — view all pricing */}
          <motion.div
            variants={fadeUpItem}
            className="mt-8 p-6 md:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-alt)] flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--orange)] mb-1">All Plans</p>
              <p className="font-display text-xl md:text-2xl text-[var(--text)] mb-1">Not sure which plan fits?</p>
              <p className="font-sans text-sm text-[var(--text-muted)]">
                We have 6 tiers plus a custom enterprise plan. Compare them side by side on the full pricing page.
              </p>
            </div>
            <Link
              to="/pricing"
              className="flex-shrink-0 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest font-bold py-3 px-7 rounded-full transition-opacity"
              style={{ background: 'var(--orange)', color: '#ffffff', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              See All Pricing <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>

        </motion.div>
      </section>


      <WaveDivider color="var(--bg-alt)" />

      {/* ── PANEL 8: WHY US ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container">
          <motion.div
            variants={fadeUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden"
          >
            {/* Header row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14 lg:border-r border-[var(--border)]">
                <motion.p variants={fadeUpItem} className="eyebrow mb-3">Why us</motion.p>
                <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-4">
                  Design and development under one roof.
                </motion.h2>
                <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] text-lg leading-relaxed">
                  Performance is part of the build, not an afterthought. We test loading behaviour, responsiveness and common device sizes before launch.
                </motion.p>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center gap-5">
                {[
                  { title: "You don't have to manage two teams.", desc: "We handle design and development together, so decisions don't get lost between a designer and a developer." },
                  { title: "Clear scope.", desc: "Before development starts, you know what we're building and what it will cost." },
                  { title: "You see the work.", desc: "Working previews keep you involved throughout the project." },
                  { title: "You own the result.", desc: "After final payment, you receive the agreed source code, assets and project files. No vendor lock-in." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUpItem} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--orange)] mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-display text-base mb-1">{item.title}</h3>
                      <p className="font-sans text-sm text-[var(--text-muted)]">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ── PANEL 10: FINAL CTA BAND ── */}
      <section className="pb-20 pt-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center p-16 md:p-24 rounded-[var(--radius-curve)] relative overflow-hidden"
            style={{ backgroundColor: 'var(--orange)', color: '#fff' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 mb-4">
                Ready to build?
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                Let's start your project.
              </h2>
              <p className="font-sans text-white/90 mb-10 max-w-lg mx-auto text-lg">
                Message us on WhatsApp and we'll get back to you personally — usually within the hour during working hours.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="https://wa.me/94768325949"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'var(--white-locked-10)', color: 'var(--white-locked)',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    textDecoration: 'none', padding: '1rem 2rem',
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5" /> WhatsApp Us
                </a>
                <PillButton as="link" to="/contact" variant="orange">
                  Send a Brief
                </PillButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
