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
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
                      Message us — respond within 24h
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
                      +94 76 832 5949 — 5–15 min chat
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
   Services data — prices in LKR
   ==================================================== */
const SERVICES = [
  {
    id: 'web',
    icon: CodeIcon,
    eyebrow: 'Full-Stack Development',
    title: 'Web Application Development',
    desc: 'We build full React web applications connected to a Firebase/Firestore backend. If you need user logins, a database, an admin panel, or multiple pages that actually talk to each other — this is the service for you. Built properly from the start, not patched together.',
    priceRange: 'Rs. 480,000 – Rs. 1,920,000',
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
    tableRows: [
      { feature: 'Number of Pages',      value: 'Up to 8' },
      { feature: 'Custom UI/UX',         value: 'Yes — Fully Custom' },
      { feature: 'Mobile Responsive',    value: 'Yes' },
      { feature: 'Firestore Backend',    value: 'Included' },
      { feature: 'Dark / Light Mode',    value: 'Included' },
      { feature: 'Form Integration',     value: 'Firestore / Email' },
      { feature: 'SEO Optimisation',     value: 'Full meta + OG tags' },
      { feature: 'Vercel Deployment',    value: 'Included' },
      { feature: 'Revision Rounds',      value: '4 rounds' },
      { feature: 'Post-Launch Support',  value: '30 days included' },
      { feature: 'Lighthouse Score',     value: '90+ guaranteed' },
    ],
    accent: 'orange',
  },
  {
    id: 'landing',
    icon: BoltIcon,
    eyebrow: 'Conversion-First',
    title: 'Landing Pages',
    desc: 'A clean, fast landing page to get your business online and looking professional. Great for new businesses, product launches, or anyone who just needs a solid web presence without going overboard. Mobile-friendly, loads fast, built to your brief.',
    priceRange: 'Rs. 160,000 – Rs. 384,000',
    timeline: '5–7 business days',
    features: [
      'Single-page layout with full scroll story',
      'Form integration (Formspree / Firestore)',
      'Structured data / SEO meta',
      'Mobile-first responsive layout',
      '2 revision rounds',
    ],
    tableRows: [
      { feature: 'Number of Pages',      value: '1–2 pages' },
      { feature: 'Custom UI/UX',         value: 'Yes — Custom layout' },
      { feature: 'Mobile Responsive',    value: 'Yes' },
      { feature: 'Form Integration',     value: 'Formspree / Firestore' },
      { feature: 'SEO Optimisation',     value: 'Structured data + meta' },
      { feature: 'Firestore Backend',    value: 'Not included' },
      { feature: 'Vercel Deployment',    value: 'Included' },
      { feature: 'Revision Rounds',      value: '2 rounds' },
      { feature: 'Post-Launch Support',  value: '7 days email support' },
    ],
    accent: 'lime',
  },
  {
    id: 'brand',
    icon: PaletteIcon,
    eyebrow: 'Brand Identity',
    title: 'Logo & Brand Identity',
    desc: 'We design logos and brand identities that actually hold up — in print, on screen, at any size. You get the logo, a colour palette, font choices, and a document explaining how to use it all so it stays consistent.',
    priceRange: 'Rs. 64,000 – Rs. 256,000',
    timeline: '3–5 business days',
    features: [
      'Primary logo mark + wordmark',
      'Colour palette + typography specification',
      'SVG, PNG, and PDF deliverables',
      'Usage guidelines document',
      '2 concept directions, 2 revision rounds',
    ],
    tableRows: [
      { feature: 'Logo Mark',             value: 'Primary + wordmark' },
      { feature: 'Colour Palette',        value: 'Full token documentation' },
      { feature: 'Typography Spec',       value: 'Included' },
      { feature: 'File Formats',          value: 'SVG, PNG, PDF' },
      { feature: 'Favicon Version',       value: 'Included' },
      { feature: 'Usage Guidelines',      value: 'Document included' },
      { feature: 'Concept Directions',    value: '2 concepts' },
      { feature: 'Revision Rounds',       value: '2 rounds' },
    ],
    accent: 'lime',
  },
  {
    id: 'graphics',
    icon: StarIcon,
    eyebrow: 'Visual Assets',
    title: 'Graphic Banners & Posters',
    desc: 'Social media banners, event posters, promotional flyers — designed to the right dimensions for the right platform. We handle the sizing and export properly so nothing looks stretched or blurry.',
    priceRange: 'Rs. 32,000 – Rs. 128,000',
    timeline: '2–3 business days',
    features: [
      'Platform-spec dimensions (IG, LinkedIn, etc.)',
      'Print-ready 300 DPI export',
      'Source file handoff (Figma / AI)',
      '2 revision rounds',
    ],
    tableRows: [
      { feature: 'Platform Specs',        value: 'IG, LinkedIn, FB, etc.' },
      { feature: 'Print-Ready Export',    value: '300 DPI included' },
      { feature: 'Source File Handoff',   value: 'Figma / AI' },
      { feature: 'Number of Designs',     value: 'Per-quote (min 1)' },
      { feature: 'Revision Rounds',       value: '2 rounds' },
      { feature: 'Delivery Format',       value: 'PNG, JPG, PDF' },
    ],
    accent: 'orange',
  },
  {
    id: 'social',
    icon: StarIcon,
    eyebrow: 'Content & Strategy',
    title: 'Social Suits',
    desc: 'End-to-end social media management and content creation. We build tailored social media campaigns that align with your brand identity and drive engagement.',
    priceRange: 'Rs. 45,000 – Rs. 150,000 /mo',
    timeline: 'Monthly',
    features: [
      'Platform management (IG, FB, LinkedIn)',
      'Custom post designs & copywriting',
      'Content calendar & scheduling',
      'Monthly analytics reporting',
    ],
    tableRows: [
      { feature: 'Platforms Managed',     value: 'Up to 3 platforms' },
      { feature: 'Post Frequency',        value: '3-5 posts / week' },
      { feature: 'Custom Graphics',       value: 'Included' },
      { feature: 'Copywriting',           value: 'Included' },
      { feature: 'Community Management',  value: 'Included' },
      { feature: 'Analytics Report',      value: 'Monthly' },
    ],
    accent: 'orange',
  },
  {
    id: 'ai',
    icon: BoltIcon,
    eyebrow: 'Automation',
    title: 'AI Solutions',
    desc: 'Intelligent automation and AI chat interfaces integrated directly into your workflows or website to streamline operations and enhance user experience.',
    priceRange: 'Rs. 100,000 – Rs. 400,000',
    timeline: '2–4 weeks',
    features: [
      'Custom LLM Integration',
      'Customer Support Chatbots',
      'Automated Workflow Scripts',
      'Data Extraction & Formatting',
    ],
    tableRows: [
      { feature: 'AI Integration',        value: 'Custom LLM / OpenAI API' },
      { feature: 'Chatbot UI',            value: 'Included' },
      { feature: 'Workflow Automation',   value: 'Tailored scripts' },
      { feature: 'Training Data Setup',   value: 'Included' },
      { feature: 'Post-Launch Support',   value: '14 days included' },
    ],
    accent: 'lime',
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
            What we build,<br />and how much it costs.
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Every service module listed with an honest price range and timeline in <strong>Sri Lankan Rupees (LKR)</strong>. No "contact for quote" on the basics.
          </motion.p>
          <motion.div variants={fadeUpItem} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--orange)', color: 'var(--white-locked)',
            borderRadius: '999px', padding: '0.4rem 1rem',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              All prices in LKR · Approx. 1 USD = Rs. 320
            </span>
          </motion.div>
        </motion.div>
      </Section>

      {/* Panels 2–5: Service modules */}
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

                  <motion.p variants={fadeUpItem} className="eyebrow" style={{ marginBottom: '0.5rem' }}>{svc.eyebrow}</motion.p>
                  <motion.h2 variants={fadeUpItem} className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1rem' }}>
                    {svc.title}
                  </motion.h2>
                  <motion.p variants={fadeUpItem} style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                    {svc.desc}
                  </motion.p>

                  <motion.div variants={fadeUpItem} style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <p className="eyebrow" style={{ marginBottom: '0.25rem' }}>Price range (LKR)</p>
                      <p className="font-display" style={{ fontSize: '1.2rem', color: 'var(--orange)' }}>{svc.priceRange}</p>
                      {svc.priceNote && (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {svc.priceNote}
                        </p>
                      )}
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
                      Let's Talk <ArrowRightIcon className="w-4 h-4" />
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

      {/* Panel 6: Comparison table */}
      <Section alt>
        <motion.div variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow" style={{ marginBottom: '0.75rem' }}>At a glance</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem' }}>
            Tier comparison
          </motion.h2>

          <motion.div variants={fadeUpItem} style={{ overflowX: 'auto', background: 'var(--bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1.5rem', borderBottom: '2px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                    Feature
                  </th>
                  {TIERS.map(t => (
                    <th key={t.name} style={{ padding: '1.5rem', borderBottom: '2px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', textAlign: 'center' }}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg-alt)' }}>
                    <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 500 }}>{row.feature}</td>
                    {row.tiers.map((val, j) => (
                      <td key={j} style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                        {val === true
                          ? <CheckIcon className="w-5 h-5" style={{ color: 'var(--orange)', margin: '0 auto' }} />
                          : val === false
                            ? <span style={{ color: 'var(--border)', fontSize: '1.25rem' }}>–</span>
                            : <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>{val}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </Section>

      {/* Panel 7: CTA */}
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
              Have a <strong>5–15 minute call</strong> or drop us a WhatsApp message with your brief — we'll respond with a ballpark scope within 24 hours.
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
