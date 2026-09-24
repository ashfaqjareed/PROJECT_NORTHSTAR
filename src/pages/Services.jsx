import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeIcon, BoltIcon, PaletteIcon, StarIcon, ArrowRightIcon, CheckIcon, WhatsAppIcon } from '../icons';
import PillButton from '../components/PillButton';

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

function Section({ children, alt = false, style = {} }) {
  return (
    <section style={{ background: alt ? 'var(--bg-alt)' : 'var(--bg)', padding: '5rem 0', ...style }}>
      <div className="section-container">{children}</div>
    </section>
  );
}

/* ====================================================
   Let's Talk / Contact Modal
   ==================================================== */
function ContactModal({ open, onClose, serviceName }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 32 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 201,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: '460px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '28px',
                padding: '2.5rem',
                boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: '1.25rem', right: '1.25rem',
                  background: 'var(--bg-alt)', border: '1px solid var(--border)',
                  borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.1rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-alt)'}
              >
                ✕
              </button>

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: '12px',
                background: 'var(--bg-alt)', border: '1px solid var(--border)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-2">
                {serviceName}
              </p>
              <h2 className="font-display text-2xl md:text-3xl mb-2" style={{ lineHeight: 1.2 }}>
                Let's talk about your project
              </h2>
              <p className="font-sans text-[0.9rem] text-[var(--text-muted)] leading-relaxed mb-6">
                Have a <strong>5–15 minute call</strong> with us and ask anything about your project, pricing, or timeline. We're happy to answer before you commit.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/94768325949"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '1rem 1.25rem', borderRadius: '16px',
                    background: 'var(--whatsapp-bg)',
                    border: '1px solid var(--whatsapp-border)',
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: '#25d366', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <WhatsAppIcon className="w-5 h-5" style={{ color: 'white' }} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--whatsapp-brand)', marginBottom: '2px' }}>
                      WhatsApp
                    </p>
                    <p className="font-sans text-[0.85rem]" style={{ color: 'var(--text)' }}>
                      Message us: respond within 24h
                    </p>
                  </div>
                </a>

                {/* Phone Call */}
                <a
                  href="tel:+94768325949"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '1rem 1.25rem', borderRadius: '16px',
                    background: 'var(--bg-alt)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'var(--orange)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--orange)] mb-[2px]">
                      Direct Call
                    </p>
                    <p className="font-sans text-[0.85rem] text-[var(--text)]">
                      +94 76 832 5949 (5 to 15 min chat)
                    </p>
                  </div>
                </a>
              </div>

              <p className="font-sans text-[0.78rem] text-[var(--text-muted)] text-center mt-5">
                No commitment required. Just a friendly conversation.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ====================================================
   Services data
   ==================================================== */
const SERVICES = [
  {
    id: 'fullstack',
    icon: CodeIcon,
    eyebrow: 'Web Applications',
    title: 'Full-Stack Development',
    desc: 'When a website alone isn\'t enough — we build complete React applications powered by a Firebase/Firestore backend. User logins, databases, admin panels, custom dashboards, multi-page flows that talk to each other. If you need real functionality behind your interface, this is where we do it.',
    priceRange: 'LKR 80,000 - 150,000+',
    timeline: '5–7 weeks',
    features: [
      'React 18+ with Vite build pipeline',
      'Firebase / Firestore backend integration',
      'User authentication & roles',
      'Admin panel & dashboard (where required)',
      'Dark / light mode support',
      'Performance tested & optimised',
      'Full deployment setup',
      'Source code handover',
    ],
    tableRows: [
      { feature: 'Framework', value: 'React 18+ / Vite' },
      { feature: 'Backend', value: 'Firebase / Firestore' },
      { feature: 'Authentication', value: 'Included where required' },
      { feature: 'Database Integration', value: 'Included' },
      { feature: 'Admin Panel', value: 'Where required' },
      { feature: 'Custom Workflows', value: 'Included' },
      { feature: 'Responsive UI', value: 'Yes' },
      { feature: 'Performance Testing', value: 'Included' },
    ],
    accent: 'orange',
  },
  {
    id: 'business',
    icon: BoltIcon,
    eyebrow: 'Business Websites',
    title: 'Business Website',
    desc: 'A clean, professional multi-page website that actually represents your business properly. Not a template with your logo slapped on — everything is designed and built from scratch. Services listed, contact working, mobile-friendly, and fast.',
    priceRange: 'LKR 65,000',
    timeline: '1–2 weeks',
    features: [
      'Up to 6 custom-designed pages',
      'Mobile + desktop responsive layout',
      'Contact form & WhatsApp integration',
      'Basic on-page SEO structure',
      'Google Analytics setup',
      'Performance optimisation',
      '1–2 revision rounds',
      'Up to 30 days post-launch support',
    ],
    tableRows: [
      { feature: 'Number of Pages', value: '1 to 6 pages' },
      { feature: 'Custom UI Design', value: 'Yes' },
      { feature: 'Mobile Responsive', value: 'Yes' },
      { feature: 'Contact Forms', value: 'Included' },
      { feature: 'WhatsApp Integration', value: 'Included' },
      { feature: 'Basic SEO', value: 'Included' },
      { feature: 'Analytics', value: 'Google Analytics' },
      { feature: 'Post-Launch Support', value: 'Up to 30 days' },
    ],
    accent: 'lime',
  },
  {
    id: 'social-design',
    icon: PaletteIcon,
    eyebrow: 'Social Media Design',
    title: 'Social Media Design',
    desc: 'Consistent, on-brand visuals for your social media pages. Feed posts, story templates, highlight covers, profile artwork — all designed to look cohesive across Instagram, Facebook, or LinkedIn. We build you a set of templates you can actually use going forward.',
    priceRange: 'LKR 20,000+',
    timeline: '1 Week',
    features: [
      'Feed post templates (Instagram / Facebook)',
      'Story template designs',
      'Highlight cover icons',
      'Profile picture & banner artwork',
      'Brand-consistent colour palette applied',
      'Editable files delivered (Canva / Figma)',
      '2 revision rounds',
    ],
    tableRows: [
      { feature: 'Feed Post Templates', value: 'Included' },
      { feature: 'Story Templates', value: 'Included' },
      { feature: 'Highlight Covers', value: 'Included' },
      { feature: 'Profile / Banner Art', value: 'Included' },
      { feature: 'Brand Consistency', value: 'Applied throughout' },
      { feature: 'File Format', value: 'PNG + editable source' },
      { feature: 'Revision Rounds', value: '2 rounds' },
    ],
    accent: 'orange',
  },
  {
    id: 'posters',
    icon: StarIcon,
    eyebrow: 'Print & Digital Graphics',
    title: 'Posters & Banners',
    desc: 'Event posters, promotional banners, sale announcements, digital ad creatives — designed to stop people scrolling. We handle the layout, typography, and visual hierarchy so whatever you\'re promoting looks like it was put together by someone who actually knows what they\'re doing.',
    priceRange: 'LKR 7,000 - 10,000',
    timeline: '5-7 Days',
    features: [
      'Event & promotional poster design',
      'Digital banner ads (web / social)',
      'Print-ready file export (high resolution)',
      'Multiple size variants (on request)',
      'Custom typography & layout',
      '2 revision rounds',
    ],
    tableRows: [
      { feature: 'Poster / Banner Design', value: 'Included' },
      { feature: 'Print-Ready Export', value: 'High-res PDF / PNG' },
      { feature: 'Digital Export', value: 'Web & social sizes' },
      { feature: 'Multiple Size Variants', value: 'On request' },
      { feature: 'Custom Typography', value: 'Included' },
      { feature: 'Revision Rounds', value: '2 rounds' },
    ],
    accent: 'lime',
  },
  {
    id: 'redesign',
    icon: BoltIcon,
    eyebrow: 'Website Redesign',
    title: 'Website Redesign',
    desc: 'Your existing website looks outdated, loads slowly, or just doesn\'t represent what you do anymore. We take what you have, audit what\'s worth keeping, and rebuild it into something modern and functional. Same brand, fresh execution — without starting from zero on content.',
    priceRange: 'LKR 55,000 – LKR 150,000+',
    timeline: '1–3 weeks',
    features: [
      'Full design and UX audit of existing site',
      'Modern, clean rebuild from scratch',
      'Content migration from old site',
      'Mobile & performance improvements',
      'SEO structure preserved or improved',
      'Redirect setup where needed',
      '2 revision rounds',
    ],
    tableRows: [
      { feature: 'Design Audit', value: 'Included' },
      { feature: 'Full Rebuild', value: 'Yes — from scratch' },
      { feature: 'Content Migration', value: 'Included' },
      { feature: 'Mobile Optimisation', value: 'Included' },
      { feature: 'SEO Preservation', value: 'Included' },
      { feature: 'Redirect Setup', value: 'Where required' },
      { feature: 'Revision Rounds', value: '2 rounds' },
      { feature: 'Post-Launch Support', value: 'Up to 30 days' },
    ],
    accent: 'orange',
  },
  {
    id: 'landing',
    icon: CodeIcon,
    eyebrow: 'Conversion Pages',
    title: 'Landing Pages',
    desc: 'A focused, single-purpose page built to convert visitors into leads or customers. No navigation clutter, no distractions — just a clear message, a strong visual hierarchy, and a call-to-action that actually works. Ideal for product launches, ad campaigns, or lead generation.',
    priceRange: 'LKR 15,000',
    timeline: '1 Week',
    features: [
      'Single-purpose conversion layout',
      'Hero, features, CTA, and social proof sections',
      'Contact form / WhatsApp integration',
      'Mobile-first responsive design',
      'Performance & speed optimised',
      'Basic SEO & meta setup',
      '2 revision rounds',
    ],
    tableRows: [
      { feature: 'Page Type', value: 'Single-purpose landing' },
      { feature: 'Sections Included', value: 'Hero, Features, CTA, Proof' },
      { feature: 'Form / WhatsApp', value: 'Included' },
      { feature: 'Mobile Responsive', value: 'Yes' },
      { feature: 'Performance Score', value: '90+ target' },
      { feature: 'SEO Meta Setup', value: 'Included' },
      { feature: 'Revision Rounds', value: '2 rounds' },
    ],
    accent: 'lime',
  },
  {
    id: 'single-page',
    icon: PaletteIcon,
    eyebrow: 'Single Page Website',
    title: 'Single Page Website',
    desc: 'Everything on one well-structured page — about, services, contact, the works. Smooth scroll navigation, clean layout, no page reloads. The right choice when you need a strong online presence without the complexity of a multi-page site. Simple to maintain, easy to share.',
    priceRange: 'LKR 15,000',
    timeline: '1 Week',
    features: [
      'Full single-page layout with smooth scroll',
      'Multiple sections: hero, about, services, contact',
      'Mobile-first responsive design',
      'WhatsApp / contact integration',
      'Basic SEO & meta tags',
      'Fast load times',
      '1–2 revision rounds',
    ],
    tableRows: [
      { feature: 'Page Structure', value: 'Single page, multi-section' },
      { feature: 'Smooth Scroll Nav', value: 'Included' },
      { feature: 'Mobile Responsive', value: 'Yes' },
      { feature: 'WhatsApp Integration', value: 'Included' },
      { feature: 'Basic SEO', value: 'Included' },
      { feature: 'Load Time', value: 'Optimised' },
      { feature: 'Revision Rounds', value: '1 to 2 rounds' },
    ],
    accent: 'orange',
  },
];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeService, setActiveService] = useState('');

  const openModal = (serviceName) => {
    setActiveService(serviceName);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Contact / Let's Talk Modal */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} serviceName={activeService} />

      {/* Panel 1: Header */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ maxWidth: '700px' }}>
          <motion.p variants={fadeUpItem} className="eyebrow" style={{ marginBottom: '0.75rem' }}>Service Modules</motion.p>
          <motion.h1 variants={fadeUpItem} className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem' }}>
            What we build,<br />and what it costs.
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Seven service areas, each with honest starting prices and timelines in <strong>Sri Lankan Rupees (LKR)</strong>. No "contact for quote" on the basics.
          </motion.p>
          <motion.div variants={fadeUpItem} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--orange)', color: 'var(--white-locked)',
            borderRadius: '999px', padding: '0.4rem 1rem',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              All starting prices in LKR
            </span>
          </motion.div>
        </motion.div>
      </Section>

      {/* Service module panels */}
      {SERVICES.map((svc, idx) => {
        const Icon = svc.icon;
        const isAlt = idx % 2 === 1;
        return (
          <Section key={svc.id} alt={isAlt} style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background shape */}
            <div className="absolute w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none" style={{
              background: svc.accent === 'orange' ? 'var(--orange)' : 'var(--lime)',
              top: '50%',
              left: isAlt ? '-10%' : '110%',
              transform: 'translate(-50%, -50%)'
            }} />

            <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                <div className={idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                  <motion.div variants={fadeUpItem} style={{
                    width: 64, height: 64, borderRadius: '16px',
                    border: `1px solid var(--border)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '2rem',
                    color: `var(--${svc.accent === 'orange' ? 'orange' : 'lime'})`,
                    background: 'var(--bg)'
                  }}>
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  <motion.div variants={fadeUpItem} className="flex items-center gap-3 mb-2">
                    <p className="eyebrow m-0">{svc.eyebrow}</p>
                  </motion.div>

                  <motion.h2 variants={fadeUpItem} className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1rem' }}>
                    {svc.title}
                  </motion.h2>
                  <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    {svc.desc}
                  </motion.p>

                  <motion.div variants={fadeUpItem} style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>Price range</p>
                      <p className="font-display" style={{ fontSize: '1.2rem', color: 'var(--orange)' }}>{svc.priceRange}</p>
                    </div>
                    <div>
                      <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>Typical timeline</p>
                      <p className="font-display" style={{ fontSize: '1.25rem' }}>{svc.timeline}</p>
                    </div>
                  </motion.div>

                  {/* Let's Talk CTA Button */}
                  <motion.div variants={fadeUpItem}>
                    <button
                      onClick={() => openModal(svc.title)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        padding: '0.875rem 2rem', borderRadius: '999px',
                        background: svc.accent === 'orange' ? 'var(--orange)' : 'var(--bg-alt)',
                        color: svc.accent === 'orange' ? 'var(--white-locked)' : 'var(--text)',
                        border: svc.accent === 'orange' ? 'none' : '1px solid var(--border)',
                        cursor: 'pointer', transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Want a Free Mockup? <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>

                {/* Right panel: What's included + feature table */}
                <motion.div variants={fadeUpItem} className={idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'} style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ padding: '2rem 2rem 1.25rem' }}>
                    <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>What's included</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {svc.features.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
                          <CheckIcon className="w-5 h-5" style={{ color: `var(--${svc.accent})`, flexShrink: 0, marginTop: '2px' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Feature breakdown table */}
                  {svc.tableRows && (
                    <div style={{ borderTop: '1px solid var(--border)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left', padding: '0.875rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
                              Feature
                            </th>
                            <th style={{ textAlign: 'left', padding: '0.875rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', borderBottom: '1px solid var(--border)', fontWeight: 700, color: `var(--${svc.accent})` }}>
                              Included
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {svc.tableRows.map((row, i) => (
                            <tr key={row.feature} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
                              <td style={{ padding: '0.7rem 2rem', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                                {row.feature}
                              </td>
                              <td style={{ padding: '0.7rem 2rem', fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600 }}>
                                {row.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </Section>
        );
      })}

      {/* CTA Panel */}
      <Section>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUpItem} style={{
            textAlign: 'center', padding: '5rem 2rem',
            borderRadius: 'var(--radius-curve)',
            border: '1px solid var(--border)',
            background: 'var(--bg-alt)',
          }}>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Ready to scope a project?</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              Start a conversation.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              Have a <strong>5 to 15 minute call</strong> or drop us a WhatsApp message with your brief. We will respond with a ballpark scope within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => openModal('General Enquiry')}
                style={{
                  background: 'var(--orange)', color: 'var(--white-locked)',
                  border: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '0.875rem 2rem', borderRadius: '999px',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Let's Talk
              </button>
              <PillButton as="link" to="/pricing" variant="neutral">
                Full Pricing
              </PillButton>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
