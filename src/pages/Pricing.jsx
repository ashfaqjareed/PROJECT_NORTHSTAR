import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, ArrowRightIcon, PlusIcon, MinusIcon, WhatsAppIcon } from '../icons';
import PricingPill from '../components/PricingPill';
import PillButton from '../components/PillButton';
import { TIERS } from '../data/pricing';

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 bg-transparent border-none cursor-pointer text-left text-[var(--text)] transition-colors hover:text-[var(--orange)]"
        aria-expanded={open}
      >
        <span className="font-display text-base">{q}</span>
        {open ? <MinusIcon className="w-5 h-5 text-[var(--orange)] flex-shrink-0" /> : <PlusIcon className="w-5 h-5 flex-shrink-0" />}
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <p className="font-sans text-[0.9rem] text-[var(--text-muted)] leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
}

/* ---------- Tier Dropdown + Breakdown Table ---------- */
const TIER_TYPES = TIERS.map(t => ({ slug: t.slug, name: t.name, tagline: t.tagline }));

function TierBreakdownSection() {
  const [selectedSlug, setSelectedSlug] = useState(TIERS[0].slug);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tier = TIERS.find(t => t.slug === selectedSlug);
  const accentColor = tier.accent === 'orange' ? 'var(--orange)' : 'var(--lime)';
  const isCustom = tier.lkr === "Let's talk";

  return (
    <section className="py-20 border-y border-[var(--border)]">
      <motion.div
        className="section-container"
        variants={fadeUpContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.p variants={fadeUpItem} className="eyebrow mb-3">What's included</motion.p>
        <motion.h2 variants={fadeUpItem} className="font-display text-3xl md:text-4xl mb-2">
          Detailed breakdown per tier
        </motion.h2>
        <motion.p variants={fadeUpItem} className="font-sans text-[0.95rem] text-[var(--text-muted)] mb-8 max-w-xl">
          Select a package below to see exactly what is offered: zero guesswork.
        </motion.p>

        {/* Dropdown selector */}
        <motion.div variants={fadeUpItem} className="relative mb-10" style={{ maxWidth: '360px' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl font-mono text-[11px] uppercase tracking-widest font-bold transition-all mx-auto"
            style={{
              background: 'var(--bg)',
              border: `1px solid ${accentColor}`,
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            <span>{tier.name}: {tier.tagline}</span>
            <motion.span
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-flex' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 w-full z-30 list-none p-2 m-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                }}
              >
                {TIER_TYPES.map(t => {
                  const isActive = t.slug === selectedSlug;
                  const tData = TIERS.find(x => x.slug === t.slug);
                  const tAccent = tData.accent === 'orange' ? 'var(--orange)' : 'var(--lime)';
                  return (
                    <li key={t.slug}>
                      <button
                        onClick={() => { setSelectedSlug(t.slug); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 rounded-xl font-sans text-[0.875rem] transition-colors"
                        style={{
                          background: isActive ? tAccent + '22' : 'transparent',
                          color: isActive ? tAccent : 'var(--text)',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: isActive ? 600 : 400,
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-alt)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span className="font-semibold">{t.name}</span>
                        <span className="ml-2 text-[var(--text-muted)] text-[0.8rem]">: {t.tagline}</span>
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Price badge for selected tier */}
        <motion.div
          key={selectedSlug + '-price'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          variants={fadeUpItem}
          className="flex flex-wrap gap-4 items-center justify-center mb-8"
        >
          <div className="rounded-2xl px-6 py-4" style={{ background: 'var(--bg)', border: `1px solid ${accentColor}`, boxShadow: `0 0 0 1px ${accentColor}22` }}>
            <p className="font-mono text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: accentColor }}>
              Price (LKR)
            </p>
            <p className="font-display text-2xl" style={{ color: accentColor }}>
              {tier.lkr}
            </p>
          </div>
          <div className="rounded-2xl px-6 py-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <p className="font-mono text-[9px] uppercase tracking-widest font-bold mb-1 text-[var(--text-muted)]">
              Timeline
            </p>
            <p className="font-display text-2xl text-[var(--text)]">
              {tier.timeline}
            </p>
          </div>
        </motion.div>

        {/* Feature breakdown table */}
        <motion.div
          key={selectedSlug + '-table'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          variants={fadeUpItem}
          className="overflow-x-auto bg-[var(--bg)] border border-[var(--border)] rounded-2xl"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-5 border-b-2 border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Feature
                </th>
                <th className="text-left p-5 border-b-2 border-[var(--border)] font-mono text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>
                  {tier.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {tier.tableRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className="border-b border-[var(--border)]"
                  style={{ background: i % 2 ? 'var(--bg-alt)' : 'transparent' }}
                >
                  <td className="p-4 font-sans text-[0.875rem] font-medium text-[var(--text-muted)]">
                    {row.feature}
                  </td>
                  <td className="p-4 font-sans text-[0.875rem] font-semibold text-[var(--text)]">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeUpItem} className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link
            to={`/pricing/${tier.slug}`}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-6 rounded-full transition-opacity"
            style={{
              background: accentColor,
              color: 'var(--white-locked)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Full Details <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Comparison table (four tiers) ---------- */
const COMPARISON_ROWS = [
  { label: 'Landing page / Web presence', vals: [true,  true,  true,  true]  },
  { label: 'Custom UI/UX Design',         vals: [true,  true,  true,  true]  },
  { label: 'Multi-page architecture',     vals: [false, true,  true,  true]  },
  { label: 'E-commerce (Cart & Checkout)',vals: [false, false, true,  true]  },
  { label: 'Database & Backend API',      vals: [false, false, false, true]  },
  { label: 'WhatsApp / Contact Forms',    vals: [true,  true,  true,  true]  },
  { label: 'Post-launch support',         vals: ['Std', '30d', '30d', 'SLA'] },
];

const FAQS = [
  { q: 'Do you require a deposit?', a: 'We ask for a 50% upfront deposit before starting the project. The remaining 50% must be completed when the project is fully delivered.' },
  { q: 'What currency do you invoice in?', a: 'LKR for Sri Lankan clients. We quote in rupees as standard. The exact rate is confirmed in the project proposal at the day of invoicing.' },
  { q: 'What payment methods do you accept?', a: 'Bank transfer, PayPal, and Wise. We send a formal invoice for every payment.' },
  { q: 'What happens if the project runs over scope?', a: 'We flag scope changes before acting on them. If the additional work requires a separate cost, we quote it and get your sign-off before proceeding. No surprise invoices.' },
];

export default function Pricing() {
  return (
    <div>
      {/* Panel 1 */}
      <section className="py-20 bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Investment</motion.p>
          <motion.h1 variants={fadeUpItem} className="font-display text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-5 max-w-3xl text-[var(--text)]">
            Straightforward pricing.
          </motion.h1>
          <motion.p variants={fadeUpItem} className="font-sans text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
            Starting prices in LKR. No hidden fees or surprise markup. The final cost depends on the exact scope of your project, which we will put in writing before you agree to anything.
          </motion.p>
          <motion.div variants={fadeUpItem} className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: 'var(--orange)', color: 'var(--white-locked)' }}>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">All prices shown in LKR</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Panel 2: Six tier cards */}
      <section className="bg-[var(--bg-alt)] py-20">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIERS.filter(t => t.slug !== 'custom-sprints').map((tier, i) => (
              <motion.div key={tier.name} variants={fadeUpItem}>
                <PricingPill 
                  slug={tier.slug}
                  tier={tier.name}
                  price={tier.lkr}
                  desc={tier.tagline}
                  features={[...tier.features, `Timeline: ${tier.timeline}`]}
                  accent={tier.accent}
                  featured={tier.featured}
                />
              </motion.div>
            ))}
          </div>

          {/* Enlarged Custom Plan */}
          {TIERS.find(t => t.slug === 'custom-sprints') && (() => {
            const customPlan = TIERS.find(t => t.slug === 'custom-sprints');
            return (
              <motion.div variants={fadeUpItem} className="mt-12">
                <div style={{
                  padding: '3rem', borderRadius: '32px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)', pointerEvents: 'none' }} />
                  
                  <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center relative z-10">
                    <div className="max-w-xl">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--orange)] font-bold mb-3">Enterprise / Retainer</p>
                      <h3 className="font-display text-4xl mb-3 text-[var(--text)]">{customPlan.name}</h3>
                      <p className="font-sans text-[1rem] text-[var(--text-muted)] leading-relaxed mb-6">
                        {customPlan.description}
                      </p>
                      <ul className="flex flex-col gap-3 list-none p-0 m-0 mb-6">
                        {customPlan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 font-sans text-[0.95rem]">
                            <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--orange)]" />
                            <span className="text-[var(--text)]">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex-shrink-0 w-full md:w-auto p-8 rounded-2xl text-center" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                      <p className="font-mono text-[10px] uppercase tracking-widest font-bold mb-3 text-[var(--text-muted)]">Starts At</p>
                      <p className="font-display text-4xl text-[var(--orange)] mb-6">{customPlan.lkr}</p>
                      <Link
                        to={`/pricing/${customPlan.slug}`}
                        className="inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-widest font-bold py-4 px-8 rounded-full transition-opacity w-full"
                        style={{
                          background: 'var(--orange)',
                          color: 'var(--white-locked)',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        View Details <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </motion.div>
      </section>

      {/* Panel 3: Per-tier breakdown (dropdown) */}
      <TierBreakdownSection />

      {/* Panel 4: Comparison table */}
      <section className="py-20 border-y border-[var(--border)]">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Side by side</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-3xl md:text-4xl mb-10">
            What's in each tier
          </motion.h2>
          
          <motion.div variants={fadeUpItem} className="overflow-x-auto bg-[var(--bg)] border border-[var(--border)] rounded-2xl">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b-2 border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Feature</th>
                  {TIERS.map(t => (
                    <th key={t.name} className={`p-4 border-b-2 border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-center ${t.featured ? 'text-[var(--orange)]' : 'text-[var(--text)]'}`}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} className="border-b border-[var(--border)]" style={{ background: i % 2 ? 'var(--bg-alt)' : 'transparent' }}>
                    <td className="p-4 font-sans text-[0.875rem] font-medium">{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="p-4 text-center">
                        {v === true ? <CheckIcon className="w-5 h-5 text-[var(--orange)] mx-auto" />
                          : v === false ? <span className="text-[var(--border)]">—</span>
                          : <span className="font-mono text-[11px] font-bold">{v}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>

      {/* Panel 5: FAQ */}
      <section className="bg-[var(--bg-alt)] py-20">
        <motion.div className="section-container max-w-3xl" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Pricing FAQ</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-3xl md:text-4xl mb-8">
            Payment &amp; terms
          </motion.h2>
          <motion.div variants={fadeUpItem}>
            {FAQS.map(faq => <AccordionItem key={faq.q} q={faq.q} a={faq.a} />)}
          </motion.div>
        </motion.div>
      </section>

      {/* Panel 6: Currency note */}
      <section className="py-12 border-y border-[var(--border)]">
        <motion.div className="section-container flex flex-wrap gap-8 items-center justify-between" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUpItem}>
            <p className="eyebrow mb-1">Currency note</p>
            <p className="font-sans text-[0.9rem] text-[var(--text-muted)] max-w-3xl">
              All prices are quoted in <strong>Sri Lankan Rupees (LKR)</strong> as standard. 
            </p>
          </motion.div>
          <motion.p variants={fadeUpItem} className="font-mono text-[11px] text-[var(--text-muted)] flex-shrink-0">
            Colombo-based · Remote-friendly
          </motion.p>
        </motion.div>
      </section>

      {/* Panel 7: CTA */}
      <section className="py-20">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUpItem} className="text-center p-16 md:p-24 rounded-[var(--radius-curve)]" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Scoped and ready?</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-[var(--text)]">
              Let's write up a brief.
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <PillButton as="a" href="https://wa.me/94768325949" target="_blank" rel="noopener noreferrer" variant="orange">
                <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp Us
              </PillButton>
              <PillButton as="link" to="/contact" variant="neutral" style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}>
                Contact Form
              </PillButton>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
