import React from 'react';
import BentoCard from '../components/BentoCard';
import { Lock } from 'lucide-react';

export default function Careers() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-700">
      <BentoCard accentColor="orange" className="max-w-xl w-full py-12 px-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-[var(--bg-alt)] border border-[var(--border)] rounded-full flex items-center justify-center mb-6 shadow-[var(--shadow-sm)]">
          <Lock className="w-6 h-6 text-[var(--orange)]" />
        </div>
        
        <h1 className="font-display font-black text-3xl tracking-tight text-[var(--text)] mb-4">
          At Max Capacity
        </h1>
        
        <p className="font-sans text-[var(--text-muted)] leading-relaxed max-w-md">
          NorthStarDevs is not currently expanding the engineering team. We operate as a tight-knit, high-velocity unit and maintain a strict headcount to preserve architectural consistency.
        </p>
        
        <div className="mt-8 pt-6 border-t border-[var(--border)] w-full">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-soft)] font-bold">
            Check back Q4 2026
          </span>
        </div>
      </BentoCard>
    </div>
  );
}
