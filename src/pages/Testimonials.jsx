import React from 'react';
import BentoCard from '../components/BentoCard';
import { ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Testimonials() {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <section className="space-y-6 text-center">
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-[var(--text)]">
          Client Guarantees
        </h1>
        <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
          We don't rely on fabricated reviews. We rely on strict, contractual guarantees that protect your investment and guarantee delivery.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard accentColor="lime" className="text-center">
          <div className="mx-auto w-12 h-12 bg-[var(--lime)]/10 rounded-full flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-[var(--lime)]" />
          </div>
          <h3 className="font-display font-black text-xl mb-3 text-[var(--text)]">Speed Guarantee</h3>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            If we miss a sprint deadline by more than 48 hours without prior mutual agreement, you receive a 15% discount on that sprint.
          </p>
        </BentoCard>

        <BentoCard accentColor="orange" className="text-center">
          <div className="mx-auto w-12 h-12 bg-[var(--orange)]/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-[var(--orange)]" />
          </div>
          <h3 className="font-display font-black text-xl mb-3 text-[var(--text)]">Quality SLA</h3>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            Every product ships with a 30-day bug-fix guarantee. Any critical UI or functional defects are resolved at zero cost.
          </p>
        </BentoCard>

        <BentoCard accentColor="lime" className="text-center">
          <div className="mx-auto w-12 h-12 bg-[var(--lime)]/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-[var(--lime)]" />
          </div>
          <h3 className="font-display font-black text-xl mb-3 text-[var(--text)]">IP Transfer</h3>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            Upon final payment, 100% of the codebase, design files, and intellectual property are transferred to you. No vendor lock-in.
          </p>
        </BentoCard>
      </section>
    </div>
  );
}
