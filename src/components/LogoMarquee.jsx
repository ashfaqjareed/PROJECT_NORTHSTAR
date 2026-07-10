import React from 'react';
import { 
  SiReact, 
  SiVite, 
  SiTailwindcss, 
  SiFirebase, 
  SiFigma, 
  SiNodedotjs, 
  SiVercel, 
  SiTypescript 
} from 'react-icons/si';

const LOGOS = [
  { Icon: SiReact, name: 'React' },
  { Icon: SiVite, name: 'Vite' },
  { Icon: SiTailwindcss, name: 'Tailwind' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: SiFigma, name: 'Figma' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiVercel, name: 'Vercel' },
  { Icon: SiTypescript, name: 'TypeScript' },
];

export default function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[var(--bg)] border-y border-[var(--border)] py-8 relative">
      
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
          These are the technologies we use
        </span>
      </div>

      <div className="flex w-full">
        <div className="marquee-track">
          {/* Double the array for seamless infinite scroll */}
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((item, idx) => {
            const { Icon, name } = item;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center min-w-[140px] gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-default"
              >
                <Icon className="w-8 h-8 text-[var(--text)]" />
                <span className="font-sans text-[11px] font-medium text-[var(--text)]">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
