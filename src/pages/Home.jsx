import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  StarIcon, ArrowRightIcon, WhatsAppIcon, PlusIcon, MinusIcon,
  CodeIcon, BoltIcon, PaletteIcon, CloudIcon, ShieldIcon
} from '../icons';
import PillButton from '../components/PillButton';
import LogoMarquee from '../components/LogoMarquee';
import ServicePill from '../components/ServicePill';
import PricingPill from '../components/PricingPill';

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

const AccordionItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 0', background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--text)', textAlign: 'left',
      }}>
        <span className="font-display" style={{ fontSize: '1rem' }}>{q}</span>
        {open ? <MinusIcon className="w-5 h-5 text-[var(--orange)]" /> : <PlusIcon className="w-5 h-5" />}
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, paddingBottom: '1.25rem' }}>{a}</p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   HOME PAGE (10 Panels)
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
            {/* Eyebrow */}
            <motion.div variants={fadeUpItem} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', border: '1px solid var(--border)', borderRadius: '999px', background: 'var(--bg-alt)' }}>
                <StarIcon className="w-3 h-3 text-[var(--orange)]" />
                <span className="eyebrow">Creative Engineering Studio — Colombo, Sri Lanka</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUpItem} className="font-display" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              We engineer<br />interfaces that<br /><span className="text-[var(--orange)]">demand attention.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '2.5rem' }}>
              High-contrast visual identities, scalable React portals, and performance-first client interfaces.
              Designed for precision. Engineered for speed.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpItem} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <PillButton as="link" to="/contact" variant="orange">
                Start a Project <ArrowRightIcon className="w-4 h-4 ml-2" />
              </PillButton>
              <PillButton as="link" to="/projects" variant="neutral">
                View Projects
              </PillButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── PANEL 2: TECH MARQUEE ── */}
      <LogoMarquee />

      {/* ── PANEL 3: SERVICE HIGHLIGHT PILLS ── */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Core Capabilities</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-10 max-w-2xl">
            What we deliver
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={fadeUpItem}>
              <ServicePill 
                icon={<CodeIcon className="w-8 h-8" />}
                label="Component-Driven UI"
                description="Strictly typed, modular React ecosystems. Every element reusable, rigorously tested, aligned to premium design tokens."
                accent="orange"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill 
                icon={<BoltIcon className="w-8 h-8" />}
                label="90 FPS Motion"
                description="GPU-composited transitions. Zero jank. Every animation on transform and opacity only."
                accent="lime"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill 
                icon={<PaletteIcon className="w-8 h-8" />}
                label="Swiss-Modern Design"
                description="High contrast. Pristine typography. Zero clutter. We build interfaces that age gracefully."
                accent="orange"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill 
                icon={<CloudIcon className="w-8 h-8" />}
                label="Serverless Backend"
                description="Edge-deployed Node environments backed by real-time Firestore for instant data sync."
                accent="lime"
                className="h-full"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <ServicePill 
                icon={<ShieldIcon className="w-8 h-8" />}
                label="Strict SLA Guarantee"
                description="Fixed timelines, defined revision cycles, and written retainer terms. No hidden clauses."
                accent="orange"
                className="h-full md:col-span-2 lg:col-span-2"
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
                A disciplined four-step process
              </motion.h2>
              <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] text-lg mb-8">
                No black-box production. Every engagement follows a documented sequence you can inspect at any stage.
              </motion.p>
              <motion.div variants={fadeUpItem}>
                <PillButton as="link" to="/process" variant="neutral">
                  See Full Process <ArrowRightIcon className="w-4 h-4 ml-2" />
                </PillButton>
              </motion.div>
            </div>
            <div className="flex flex-col gap-8">
              <ProcessStep num="01" title="Discovery" desc="We map your goals, audience, and technical constraints in a structured brief before any design work begins." />
              <ProcessStep num="02" title="Design" desc="High-fidelity mockups with your design system tokens defined up front. No surprises mid-build." />
              <ProcessStep num="03" title="Build" desc="Component-driven React build with continuous preview deploys. You can see the work live every day." />
              <ProcessStep num="04" title="Launch" desc="Production deploy plus handoff documentation — codebase walkthrough, CMS training, and SLA contract." />
            </div>
          </div>
        </motion.div>
      </section>

      <WaveDivider flip color="var(--bg-alt)" />

      {/* ── PANEL 5: FEATURED PROJECT ── */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Featured Work</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-10">
            What we build
          </motion.h2>

          {/* Asymmetric featured card */}
          <motion.div variants={fadeUpItem} className="bento-card-asym bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--orange)] p-8 md:p-12 relative overflow-hidden group transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="eyebrow text-[var(--orange)] mb-3 block">Web Application</span>
                <h3 className="font-display text-3xl md:text-4xl mb-4">
                  NorthStarDevs Platform
                </h3>
                <p className="font-sans text-[var(--text-muted)] leading-relaxed mb-6">
                  This site is our live case study. React 19 + Vite + Tailwind v4 + Firestore, full dark mode, and a Swiss-modern design system built from scratch in 7 days.
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

              {/* Visual placeholder */}
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
        </motion.div>
      </Section>

      {/* ── PANEL 6: PRICING PREVIEW ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }} ref={pricingRef}>
        <CursorOrb containerRef={pricingRef} />

        <motion.div className="section-container relative z-10" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Investment</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-4">
            Transparent pricing
          </motion.h2>
          <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] mb-12">
            Clear tiers. No hidden fees. USD rates — LKR equivalent available on request.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
            <motion.div variants={fadeUpItem}>
              <PricingPill 
                tier="Full Launch" 
                price="From $1,500" 
                desc="Complete web application with Firestore backend and brand system." 
                features={['Multi-page React app', 'Firestore backend', 'Dark/light mode', '4 revision rounds']}
                accent="orange"
                featured={true}
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <PricingPill 
                tier="Growth" 
                price="From $500" 
                desc="Precision landing page or brand asset. 5-day delivery." 
                features={['Single-page layout', 'Mobile-responsive', 'Performance optimised', '2 revision rounds']}
                accent="lime"
              />
            </motion.div>
            <motion.div variants={fadeUpItem}>
              <PricingPill 
                tier="Custom Sprints" 
                price="Let's talk" 
                desc="Ongoing engineering partnership — feature builds and SLA-backed support." 
                features={['Monthly scope', 'Priority support', 'Weekly check-ins', 'Documented SLA']}
                accent="lime"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <WaveDivider color="var(--bg-alt)" />

      {/* ── PANEL 7: WORKING WITH US (Guarantees) ── */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.p variants={fadeUpItem} className="eyebrow mb-3">Guarantees</motion.p>
            <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-4">
              What working with us looks like
            </motion.h2>
            <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] text-lg mb-8">
              We rely on strict, contractual guarantees that protect your investment and ensure delivery.
            </motion.p>
          </div>
          
          <div className="flex flex-col gap-6">
            {[
              { title: "Direct WhatsApp Line", desc: "No ticketing systems or account managers. You speak directly to the engineers building your product." },
              { title: "Fixed Price Before We Start", desc: "Scope is locked and priced before a single line of code is written. No surprise invoices." },
              { title: "You Own 100% of the Code", desc: "Upon final payment, the entire codebase, assets, and IP are transferred to you without vendor lock-in." }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUpItem} className="flex gap-4 p-6 border border-[var(--border)] rounded-2xl bg-[var(--bg)] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[var(--orange)] mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-display text-lg mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-[var(--text-muted)]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ── PANEL 8: WHY NORTHSTARDEVS ── */}
      <section className="py-20 bg-[var(--bg-alt)] border-y border-[var(--border)]">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.p variants={fadeUpItem} className="eyebrow mb-3">Why us</motion.p>
              <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-6">
                Built by engineers who design.
              </motion.h2>
              <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] text-lg leading-relaxed">
                Most studios hand design off to developers who re-interpret it. We own both ends of the stack.
                What you see in the mockup is what ships — pixel-identical, performance-verified, and accessible.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'No translation loss', desc: 'Design and engineering under one roof. Mockup fidelity guaranteed.' },
                { title: 'Written scope', desc: 'Every project has a defined scope document before work begins.' },
                { title: 'Performance default', desc: 'Lighthouse audited on every build. Core Web Vitals are deliverables.' },
                { title: 'Honest timelines', desc: 'We give you a realistic schedule and stick to it strictly.' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUpItem} className="bg-[var(--bg)] p-6 rounded-2xl border border-[var(--border)]">
                  <h3 className="font-display text-[0.95rem] mb-2">{item.title}</h3>
                  <p className="font-sans text-[0.85rem] text-[var(--text-muted)]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── PANEL 9: FAQ PREVIEW ── */}
      <Section>
        <motion.div className="max-w-3xl mx-auto" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3 text-center">Common Questions</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-4xl md:text-5xl mb-12 text-center">
            Answered up front
          </motion.h2>

          <motion.div variants={fadeUpItem}>
            <AccordionItem q="How long does a typical project take?" a="Landing pages: 5–7 business days. Full web applications: 3–5 weeks depending on scope. We define this in the written brief before any deposit is taken." />
            <AccordionItem q="What do you need from me to start?" a="A brief covering your goals, target audience, and any existing brand assets. We send you a structured intake form — usually takes 15 minutes to fill in." />
            <AccordionItem q="Do you offer ongoing support after launch?" a="Yes. Our Full Launch tier includes 30-day post-launch support. Custom Retainer clients get a dedicated monthly scope with priority response times defined in a written SLA." />
          </motion.div>

          <motion.div variants={fadeUpItem} className="mt-8 text-center">
            <Link to="/faq" className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--text)] hover:text-[var(--orange)] transition-colors">
              Read Full FAQ <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </Section>

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
            {/* Subtle glow behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 mb-4">
                Ready to build?
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                Ready to start?
              </h2>
              <p className="font-sans text-white/90 mb-10 max-w-lg mx-auto text-lg">
                Message us on WhatsApp for a response within the hour, or drop us an email. 
                We respond to every inquiry personally.
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
                  Contact Form
                </PillButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
