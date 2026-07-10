import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, ArrowRightIcon, PlusIcon, MinusIcon, WhatsAppIcon } from '../icons';
import PricingPill from '../components/PricingPill';
import PillButton from '../components/PillButton';

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

const TIERS = [
  {
    name: 'Budget',
    tagline: 'Simple presence.',
    usd: 'From $200',
    timeline: '3–5 days',
    features: ['Single landing page', 'Template based', 'Mobile responsive', '1 revision'],
    accent: 'lime',
    featured: false,
  },
  {
    name: 'Starter',
    tagline: 'Custom design.',
    usd: 'From $350',
    timeline: '5–7 days',
    features: ['Single landing page', 'Custom UI/UX', 'Form integration', '2 revisions'],
    accent: 'lime',
    featured: false,
  },
  {
    name: 'Growth',
    tagline: 'Get to market fast.',
    usd: 'From $500',
    timeline: '5–7 days',
    features: ['Multi-section layout', 'Performance optimized', 'Basic SEO', '2 revisions'],
    accent: 'orange',
    featured: false,
  },
  {
    name: 'Full Launch',
    tagline: 'The complete product.',
    usd: 'From $1,500',
    timeline: '3–5 weeks',
    features: ['Multi-page React app', 'Firestore backend', 'Dark/light mode', '4 revisions'],
    accent: 'orange',
    featured: true,
  },
  {
    name: 'Premium',
    tagline: 'Advanced requirements.',
    usd: 'From $3,000',
    timeline: '6–8 weeks',
    features: ['Complex architecture', 'Multiple integrations', 'Custom animations', 'Unlimited (in scope)'],
    accent: 'orange',
    featured: false,
  },
  {
    name: 'Custom Sprints',
    tagline: 'Ongoing partnership.',
    usd: 'Let\'s talk',
    timeline: 'Monthly scope',
    features: ['Feature builds', 'Priority support', 'Written SLA', 'Architecture consult'],
    accent: 'lime',
    featured: false,
  },
];

const COMPARISON_ROWS = [
  { label: 'Landing page',          vals: [true,  true,  true,  true,  true,  true]  },
  { label: 'Custom UI/UX',          vals: [false, true,  true,  true,  true,  true]  },
  { label: 'Multi-page app',        vals: [false, false, false, true,  true,  true]  },
  { label: 'Firestore backend',     vals: [false, false, false, true,  true,  true]  },
  { label: 'Advanced Integrations', vals: [false, false, false, false, true,  true]  },
  { label: 'Dark/light mode',       vals: [false, false, false, true,  true,  true]  },
  { label: 'Post-launch support',   vals: [false, false, false, '30d', '60d', 'SLA'] },
];

const FAQS = [
  { q: 'Do you require a deposit?', a: '50% upfront, 50% on delivery. For retainer clients, the full monthly amount is invoiced at the start of each billing period.' },
  { q: 'What currency do you invoice in?', a: 'USD for international clients. LKR equivalent rates are available for Sri Lankan clients — we quote both in the proposal.' },
  { q: 'What payment methods do you accept?', a: 'Bank transfer (local and international), PayPal, and Wise. We send a formal invoice for every payment.' },
  { q: 'What happens if the project runs over scope?', a: 'We flag scope changes before acting on them. If the additional work requires a separate cost, we quote it and get your sign-off before proceeding. No surprise invoices.' },
];

export default function Pricing() {
  return (
    <div>
      {/* Panel 1 */}
      <section className="py-20">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Investment</motion.p>
          <motion.h1 variants={fadeUpItem} className="font-display text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-5 max-w-3xl">
            Transparent pricing.<br />No surprises.
          </motion.h1>
          <motion.p variants={fadeUpItem} className="font-sans text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
            Every tier listed with a real price range, timeline, and what's included — so you can scope a project before you even contact us.
          </motion.p>
        </motion.div>
      </section>

      {/* Panel 2: Six tier cards */}
      <section className="bg-[var(--bg-alt)] py-20">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div key={tier.name} variants={fadeUpItem}>
                <PricingPill 
                  tier={tier.name}
                  price={tier.usd}
                  desc={tier.tagline}
                  features={[...tier.features, `Timeline: ${tier.timeline}`]}
                  accent={tier.accent}
                  featured={tier.featured}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Panel 3: Comparison table */}
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

      {/* Panel 4: FAQ */}
      <section className="bg-[var(--bg-alt)] py-20">
        <motion.div className="section-container max-w-3xl" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Pricing FAQ</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-3xl md:text-4xl mb-8">
            Payment & terms
          </motion.h2>
          <motion.div variants={fadeUpItem}>
            {FAQS.map(faq => <AccordionItem key={faq.q} q={faq.q} a={faq.a} />)}
          </motion.div>
        </motion.div>
      </section>

      {/* Panel 5: Currency note */}
      <section className="py-12 border-y border-[var(--border)]">
        <motion.div className="section-container flex flex-wrap gap-8 items-center justify-between" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUpItem}>
            <p className="eyebrow mb-1">Currency note</p>
            <p className="font-sans text-[0.9rem] text-[var(--text-muted)] max-w-3xl">
              USD pricing is the baseline. LKR equivalent quoted at the prevailing rate on the day of invoicing. All rates are approximate — final cost is confirmed in the project proposal.
            </p>
          </motion.div>
          <motion.p variants={fadeUpItem} className="font-mono text-[11px] text-[var(--text-muted)] flex-shrink-0">
            Colombo-based · Remote-friendly
          </motion.p>
        </motion.div>
      </section>

      {/* Panel 6: CTA */}
      <section className="py-20">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUpItem} className="text-center p-16 md:p-24 rounded-[var(--radius-curve)] bg-[var(--text)] text-[var(--bg)]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">Scoped and ready?</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-white">
              Let's write up a brief.
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <PillButton as="a" href="https://wa.me/94768325949" target="_blank" rel="noopener noreferrer" variant="orange">
                <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp Us
              </PillButton>
              <PillButton as="link" to="/contact" variant="neutral" style={{ background: 'var(--white-locked-10)', color: 'var(--white-locked)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Contact Form
              </PillButton>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
