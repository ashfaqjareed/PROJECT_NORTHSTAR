import React from 'react';

export default function Privacy() {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <section className="space-y-6">
        <h1 className="font-display font-black text-4xl tracking-tight text-[var(--text)]">
          Privacy Policy
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-soft)] font-bold">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      <section className="prose prose-neutral dark:prose-invert max-w-none font-sans text-[var(--text-muted)] leading-relaxed space-y-8">
        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">1. Data Collection</h3>
          <p>We collect minimal data required to provide our engineering services. This includes contact information provided via WhatsApp or Email, and technical requirements necessary for scoping your project.</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">2. Cookies and Tracking</h3>
          <p>This website operates without third-party tracking scripts or invasive analytics. We use local storage strictly for maintaining your UI theme preference (dark/light mode).</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">3. Data Sharing</h3>
          <p>We do not sell, rent, or trade your personal information or intellectual property. Project details are kept strictly confidential unless explicitly approved for our Case Studies.</p>
        </div>

        <div>
          <h3 className="font-display font-bold text-xl text-[var(--text)] mb-4">4. Contact</h3>
          <p>For any privacy concerns, contact the engineering lead directly at northstardevs1@gmail.com.</p>
        </div>
      </section>
    </div>
  );
}
