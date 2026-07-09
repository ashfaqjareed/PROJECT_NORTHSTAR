import React from 'react';
import { TerminalSquare } from 'lucide-react';

export default function Blog() {
  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <section className="space-y-6">
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-[var(--text)]">
          Engineering Logs
        </h1>
        <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed">
          Technical dispatches on React architecture, rendering performance, and edge deployment.
        </p>
      </section>

      <div className="border border-[var(--border)] border-dashed rounded-[var(--radius-card)] p-16 flex flex-col items-center text-center">
        <TerminalSquare className="w-12 h-12 text-[var(--text-soft)] mb-6 opacity-50" />
        <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">No Logs Found</h3>
        <p className="font-sans text-[var(--text-muted)] max-w-sm">
          We are currently busy shipping production code. Technical logs will be published here in the near future.
        </p>
      </div>
    </div>
  );
}
