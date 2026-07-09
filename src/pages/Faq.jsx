import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What is your standard delivery timeline?',
    a: 'Speed MVPs are delivered in 7 days. Full Launches take up to 14 days. Custom sprints are assessed based on complexity.'
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Every project includes a 30-day bug-fix guarantee. Post-launch, we offer monthly retainers for continuous development and maintenance.'
  },
  {
    q: 'What stack do you use?',
    a: 'We strictly use React 18, Vite, and Tailwind CSS for the frontend. For backend needs, we utilize serverless environments (Node.js/Vercel) and Firestore.'
  },
  {
    q: 'Who owns the code?',
    a: 'You do. Upon final payment, 100% of the intellectual property, design files, and codebase are transferred to you.'
  },
  {
    q: 'Why no WordPress or Webflow?',
    a: 'We are software engineers, not template assemblers. We build bespoke React applications that offer superior performance, unlimited scalability, and total architectural control.'
  }
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <section className="space-y-6 text-center">
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-[var(--text)]">
          Intelligence Desk
        </h1>
        <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed">
          Frequently requested operational details and SLA parameters.
        </p>
      </section>

      <section className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className={`border border-[var(--border)] rounded-[var(--radius-card)] overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[var(--bg-alt)] shadow-[var(--shadow-sm)]' : 'bg-[var(--bg)]'}`}
            >
              <button 
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className={`font-display font-black text-xl tracking-tight transition-colors ${isOpen ? 'text-[var(--orange)]' : 'text-[var(--text)] hover:text-[var(--orange)]'}`}>
                  {faq.q}
                </h3>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[var(--orange)]/10 text-[var(--orange)]' : 'bg-[var(--bg-alt)] text-[var(--text-soft)]'}`}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-[var(--ease)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="p-6 pt-0 font-sans text-[var(--text-muted)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
