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
   Services data — prices in LKR
   ==================================================== */
const SERVICES = [
  {
    id: 'web',
    icon: CodeIcon,
    eyebrow: 'Web Applications',
    title: 'Web Application Development',
    desc: 'From forms and dashboards to accounts, databases and custom workflows — we build the functionality behind the interface. We build full React web applications connected to a Firebase/Firestore backend. If you need user logins, a database, an admin panel, or multiple pages that actually talk to each other, this is the service for you.',
    priceRange: 'LKR 200,000+',
    timeline: '3–5 weeks',
    features: [
      'React 18+ with Vite build pipeline',
      'Tailwind CSS styling',
      'Firestore / API integration',
      'Dark/light mode support',
      'Performance tested',
      'Deployment setup',
      'Revision scope defined per project',
      'Project handover',
    ],
    tableRows: [
      { feature: 'Custom Page Structure', value: 'Yes' },
      { feature: 'Authentication',       value: 'Where required' },
      { feature: 'Database Integration', value: 'Included' },
      { feature: 'Dashboard',            value: 'Where required' },
      { feature: 'Custom Workflows',     value: 'Included' },
      { feature: 'API / Integration',    value: 'Included' },
      { feature: 'Responsive UI',        value: 'Yes' },
      { feature: 'Performance Testing',  value: 'Included' },
    ],
    accent: 'orange',
  },
  {
    id: 'landing',
    icon: BoltIcon,
    eyebrow: 'Business Websites',
    title: 'Business Websites & Landing Pages',
    desc: 'We build reusable, maintainable interfaces instead of stitching together a template and calling it custom. A clean, fast website to get your business online and looking professional. Mobile-friendly, loads fast, built to your brief.',
    priceRange: 'LKR 45,000 – LKR 95,000+',
    timeline: '1–2 weeks',
    features: [
      'Custom responsive design',
      'Mobile + desktop layout',
      'Contact / WhatsApp integration',
      'Basic SEO structure',
      'Performance optimisation',
    ],
    tableRows: [
      { feature: 'Number of Pages',      value: '1 to 6 pages' },
      { feature: 'Custom UI Design',     value: 'Yes' },
      { feature: 'Mobile Responsive',    value: 'Yes' },
      { feature: 'Contact Forms',        value: 'Included' },
      { feature: 'Basic SEO',            value: 'Included' },
      { feature: 'Analytics',            value: 'Google Analytics' },
      { feature: 'Revision Rounds',      value: '1 to 2 rounds' },
      { feature: 'Post-Launch Support',  value: 'Up to 30 days' },
    ],
    accent: 'lime',
  },
  {
    id: 'store',
    icon: PaletteIcon,
    eyebrow: 'E-Commerce',
    title: 'Online Store',
    desc: 'We build online stores with product catalogues, categories, shopping carts, and checkouts. We handle the payment gateway integration and order management so you can focus on selling.',
    priceRange: 'LKR 150,000+',
    timeline: '3–5 weeks',
    features: [
      'Product catalogue & categories',
      'Shopping cart & checkout',
      'Payment gateway integration',
      'Order management',
      'Responsive storefront',
    ],
    tableRows: [
      { feature: 'Product Catalogue',    value: 'Included' },
      { feature: 'Shopping Cart',        value: 'Included' },
      { feature: 'Checkout Process',     value: 'Included' },
      { feature: 'Payment Gateway',      value: 'Integration included' },
      { feature: 'Order Management',     value: 'Included' },
      { feature: 'WhatsApp Integration', value: 'Included' },
      { feature: 'Basic SEO',            value: 'Included' },
      { feature: 'Analytics',            value: 'Included' },
    ],
    accent: 'orange',
  },
  {
    id: 'social',
    icon: StarIcon,
    eyebrow: 'Content & Strategy',
    title: 'Social Suits',
    desc: 'Social media management and content creation. We build social media campaigns that align with your brand identity.',
    priceRange: 'Custom Quote',
    timeline: 'Monthly',
    isComingSoon: true,
    features: [
      'Platform management',
      'Post designs & copywriting',
      'Content calendar',
      'Monthly reporting',
    ],
    accent: 'lime',
  },
  {
    id: 'ai',
    icon: BoltIcon,
    eyebrow: 'Automation',
    title: 'AI Solutions',
    desc: 'Automation and chat interfaces integrated directly into your workflows to streamline operations.',
    priceRange: 'Custom Quote',
    timeline: '2–4 weeks',
    isComingSoon: true,
    features: [
      'Custom Integration',
      'Customer Support Chatbots',
      'Automated Workflow Scripts',
      'Data Extraction',
    ],
    accent: 'orange',
  },
];

const TIERS = [
  { name: 'Starter', col: 1 },
  { name: 'Business', col: 2 },
  { name: 'Custom Platform', col: 3 },
];

const COMPARISON = [
  { feature: 'Custom Design',  tiers: [true,  true, true] },
  { feature: 'Responsive Build', tiers: [true,  true, true] },
  { feature: 'Clean Source Code',tiers: [true,  true, true] },
  { feature: 'Contact Forms',    tiers: [false, true, true] },
  { feature: 'Web App Features', tiers: [false, false, true] },
  { feature: 'Post-Launch SLA',  tiers: [false, '30d', 'Custom'] },
  { feature: 'Revisions',        tiers: ['1',   '2',  'Custom'] },
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
            Every service module listed with an honest starting price and timeline in <strong>Sri Lankan Rupees (LKR)</strong>. No "contact for quote" on the basics.
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

      {/* Panels 2–5: Service modules */}
      {SERVICES.map((svc, idx) => {
        const Icon = svc.icon;
        const isAlt = idx % 2 === 1;
        return (
          <Section key={svc.id} alt={isAlt} style={{ position: 'relative', overflow: 'hidden', opacity: svc.isComingSoon ? 0.6 : 1 }}>
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
                    {svc.isComingSoon && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--border)] text-[var(--text-muted)] rounded">
                        Coming 2027
                      </span>
                    )}
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
                  {!svc.isComingSoon && (
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
                  )}
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
