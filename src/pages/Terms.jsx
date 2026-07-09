import React from 'react';

export default function Terms() {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <section className="space-y-6">
        <h1 className="font-display font-black text-4xl tracking-tight text-[var(--text)]">
          Terms of Service
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-soft)] font-bold">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      <section className="prose prose-neutral dark:prose-invert max-w-none font-sans text-[var(--text-muted)] leading-relaxed space-y-8">
        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">1. Engineering Services</h3>
          <p>NorthStarDevs provides custom web development, frontend engineering, and design services. All deliverables are subject to the specific Statement of Work (SOW) agreed upon via WhatsApp or Email.</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">2. Intellectual Property Transfer</h3>
          <p>Upon receipt of final payment, full ownership of the codebase and design assets is transferred to the client. NorthStarDevs retains the right to display the work in our portfolio unless a Non-Disclosure Agreement (NDA) is signed.</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">3. Service Level Agreement (SLA)</h3>
          <p>Our 30-day bug-fix guarantee covers critical functional defects in the code we deliver. It does not cover issues arising from third-party API changes, server outages, or modifications made by other developers.</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">4. Payments & Retainers</h3>
          <p>Development sprints require a 50% upfront deposit. Final delivery of source code and deployment credentials occurs upon clearance of the remaining 50% balance.</p>
        </div>
      </section>
    </div>
  );
}
