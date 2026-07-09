import React from 'react';
import BentoCard from '../components/BentoCard';
import { ShieldAlert, Clock, Bug } from 'lucide-react';

export default function Support() {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <section className="space-y-6">
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-[var(--text)]">
          Support SLA
        </h1>
        <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed">
          Our Service Level Agreement outlines the parameters of our post-deployment coverage. We take technical debt seriously.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard accentColor="orange">
          <Bug className="w-8 h-8 text-[var(--orange)] mb-4" />
          <h3 className="font-display font-bold text-lg text-[var(--text)] mb-2">Defect Resolution</h3>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            Critical functional defects reported within 30 days of deployment are triaged immediately and resolved at zero cost.
          </p>
        </BentoCard>
        
        <BentoCard accentColor="lime">
          <Clock className="w-8 h-8 text-[var(--lime)] mb-4" />
          <h3 className="font-display font-bold text-lg text-[var(--text)] mb-2">Response Time</h3>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            Active clients receive WhatsApp priority access. Standard response time is under 15 minutes during operating hours (GMT+5:30).
          </p>
        </BentoCard>
        
        <BentoCard accentColor="orange">
          <ShieldAlert className="w-8 h-8 text-[var(--orange)] mb-4" />
          <h3 className="font-display font-bold text-lg text-[var(--text)] mb-2">Exclusions</h3>
          <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
            Feature requests, design alterations, or third-party API changes post-launch fall outside the SLA and require a sprint retainer.
          </p>
        </BentoCard>
      </div>
    </div>
  );
}
