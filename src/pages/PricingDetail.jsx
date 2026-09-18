import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TIERS } from '../data/pricing';
import { ArrowLeftIcon, CheckIcon, ClockIcon, WhatsAppIcon } from '../icons';
import PillButton from '../components/PillButton';

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function PricingDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tier = TIERS.find(t => t.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!tier) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl mb-4">Tier Not Found</h1>
        <p className="font-sans text-[var(--text-muted)] mb-8">The pricing tier you are looking for does not exist.</p>
        <PillButton as="button" onClick={() => navigate('/pricing')} variant="neutral">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Pricing
        </PillButton>
      </div>
    );
  }

  const accentColor = tier.accent === 'orange' ? 'var(--orange)' : 'var(--lime)';
  const isCustom = tier.lkr === "Let's talk";

  return (
    <div className="pb-24 pt-12">
      <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" animate="show">
        {/* Back Link */}
        <motion.div variants={fadeUpItem} className="mb-12">
          <Link to="/pricing" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Pricing
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-7">
            <motion.div variants={fadeUpItem} className="flex flex-wrap gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full" style={{ background: accentColor, color: 'var(--white-locked)' }}>
                {tier.name}
              </span>
            </motion.div>

            {/* LKR Primary Price */}
            <motion.div variants={fadeUpItem} className="mb-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-[4rem] leading-[1.1]" style={{ color: accentColor }}>
                {tier.lkr}
                {!isCustom && (
                  <span className="font-mono text-[14px] font-bold uppercase tracking-widest ml-3 align-middle opacity-70">LKR</span>
                )}
              </h1>
            </motion.div>

            <motion.h2 variants={fadeUpItem} className="font-sans text-2xl font-medium mb-6">
              {tier.tagline}
            </motion.h2>

            <motion.div variants={fadeUpItem}>
              <h3 className="font-display text-xl mb-3">Overview</h3>
              <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
                {tier.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUpItem} className="mb-8">
              <h3 className="font-display text-xl mb-4">What's Included</h3>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-[1rem]">
                    <CheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: accentColor }} />
                    <span className="text-[var(--text)]">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Detailed breakdown table */}
            {tier.tableRows && (
              <motion.div variants={fadeUpItem} className="mb-8">
                <h3 className="font-display text-xl mb-4">Full Breakdown</h3>
                <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left px-3 py-2 border-b-2 border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                          Feature
                        </th>
                        <th className="text-left px-3 py-2 border-b-2 border-[var(--border)] font-mono text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>
                          {tier.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tier.tableRows.map((row, i) => (
                        <tr key={row.feature} className="border-b border-[var(--border)]" style={{ background: i % 2 ? 'var(--bg-alt)' : 'transparent' }}>
                          <td className="px-3 py-2 font-sans text-[0.85rem] font-medium text-[var(--text-muted)]">
                            {row.feature}
                          </td>
                          <td className="px-3 py-2 font-sans text-[0.85rem] font-semibold text-[var(--text)]">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar / Meta Stats */}
          <motion.div variants={fadeUpItem} className="lg:col-span-5 bg-[var(--bg-alt)] border border-[var(--border)] rounded-[24px] p-8">
            <div className="flex flex-col gap-8">
              {/* LKR Price display */}
              <div>
                <p className="eyebrow mb-3 text-[var(--text-muted)]">Price (LKR)</p>
                <p className="font-display text-3xl" style={{ color: accentColor }}>{tier.lkr}</p>
              </div>

              {/* Timeline */}
              <div>
                <p className="eyebrow mb-3 text-[var(--text-muted)]">Estimated Timeline</p>
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-6 h-6 text-[var(--text)]" />
                  <span className="font-sans text-xl font-medium">{tier.timeline}</span>
                </div>
                <p className="font-sans text-sm text-[var(--text-muted)] mt-2">
                  Delivery time may vary based on response times and revision requests.
                </p>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[var(--border)]">
                <PillButton as="a" href="https://wa.me/94768325949" target="_blank" rel="noopener noreferrer" variant={tier.accent === 'orange' ? 'orange' : 'neutral'} style={{ width: '100%', justifyContent: 'center' }}>
                  <WhatsAppIcon className="w-5 h-5 mr-2" /> Start this project
                </PillButton>
              </div>

              {/* Terms Slip */}
              <div className="pt-6 border-t border-[var(--border)]">
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-[16px] p-5">
                  <p className="font-mono text-[10px] uppercase font-bold tracking-widest mb-3">Terms &amp; Conditions</p>
                  <ul className="font-sans text-[0.8rem] text-[var(--text-muted)] leading-relaxed list-disc pl-4 flex flex-col gap-2">
                    <li>50% upfront deposit is required to commence work.</li>
                    <li>Revisions beyond the listed amount will be billed at an hourly rate.</li>
                    <li>Hosting and domain costs are not included unless explicitly stated.</li>
                    <li>Final hand-off occurs after the remaining 50% balance is cleared.</li>
                    <li>LKR rate locked at time of proposal — not affected by exchange fluctuations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
