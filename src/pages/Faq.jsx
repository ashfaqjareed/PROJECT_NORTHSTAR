import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '../icons';

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Starter websites usually take 5–7 working days. A multi-page business website takes 1–2 weeks. For larger web applications, we will give you a clear timeline before any work begins.'
  },
  {
    q: 'Do you write the content for my website?',
    a: 'We usually ask clients to provide the text for their website, as you know your business best. We can help organise it and make sure it looks great on the page. If you need a lot of copywriting from scratch, we can include that as an additional service.'
  },
  {
    q: 'How many times can I ask for changes?',
    a: 'It depends on your plan. Starter plans include 1 round of revisions, while Business and Online Store plans include 2 rounds. This happens during the design phase so we get everything looking right before development.'
  },
  {
    q: 'Who pays for the domain name and hosting?',
    a: 'Domain names and premium hosting are separate costs. We help you set everything up on platforms like Vercel (often free for simple sites) and can guide you through purchasing your domain. There are no hidden markup fees from us on hosting.'
  },
  {
    q: 'Who owns the website once it is finished?',
    a: 'You do. Once the final payment is made, we hand over all the source code, assets and project files to you. You are not locked into working with us.'
  },
  {
    q: 'Do you offer maintenance after launch?',
    a: 'Yes, we have care plans starting at LKR 10,000/month. This includes technical checks, minor content updates, bug fixes for things we built, and priority support. We also include a free 30-day bug fix period for most plans after launch.'
  },
  {
    q: 'How do payments work?',
    a: 'For most projects, we ask for 40% to start, 30% at a middle milestone, and the final 30% when the project is ready to hand over. For smaller projects, we might simplify this to two payments.'
  },
  {
    q: 'What if I want to add more features later?',
    a: 'That is completely fine. If you want to add something new that wasn\'t in the original scope, we will just give you a separate quote for that work before we proceed.'
  }
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="space-y-16 animate-in fade-in duration-700 max-w-3xl mx-auto">
      <section className="space-y-6 text-center">
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-[var(--text)]">
          Questions answered up front
        </h1>
        <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed">
          Everything you need to know about timelines, ownership, and how we work.
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
                  {isOpen ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
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
