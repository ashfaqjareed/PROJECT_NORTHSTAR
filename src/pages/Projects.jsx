import React, { useState } from 'react';
import BentoCard from '../components/BentoCard';
import { ExternalLink, MessageCircle } from 'lucide-react';

const projects = [
  {
    id: 'fitforge',
    title: 'FitForge',
    category: 'Web App',
    description: 'High-performance fitness tracking ecosystem with real-time analytics.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 'northstar',
    title: 'NorthStarDevs Platform',
    category: 'Corporate Site',
    description: 'Our own elite web ecosystem built on React 18 and Vite.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 'bodyline',
    title: 'Bodyline CMS',
    category: 'Web App',
    description: 'Custom content management system engineered for high-volume publishing.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    link: '#'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web App', 'Corporate Site'];
  
  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <section className="space-y-6 max-w-3xl">
        <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight text-[var(--text)]">
          Case Studies
        </h1>
        <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed">
          A curated selection of our elite ecosystems in production.
        </p>
      </section>

      <div className="flex gap-4 border-b border-[var(--border)] pb-4 overflow-x-auto hide-scrollbar">
        {categories.map(c => (
          <button 
            key={c}
            onClick={() => setFilter(c)}
            className={`font-mono text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full transition-all ${filter === c ? 'bg-[var(--text)] text-[var(--bg)]' : 'bg-[var(--bg-alt)] text-[var(--text-soft)] hover:text-[var(--text)]'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <BentoCard key={project.id} accentColor={idx % 2 === 0 ? 'orange' : 'lime'} className="flex flex-col p-4 group">
            <div className="aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden mb-6 relative cursor-pointer border border-[var(--border)]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="px-2 space-y-3 flex-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--orange)] font-bold">{project.category}</span>
              <h3 className="font-display font-black text-xl tracking-tight text-[var(--text)]">{project.title}</h3>
              <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="px-2 pt-6 mt-auto">
              <a href={`https://wa.me/94768325949?text=I'm%20interested%20in%20a%20project%20similar%20to%20${project.title}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--bg-alt)] border border-[var(--border)] hover:border-[var(--whatsapp-brand)] text-[var(--text)] hover:text-[var(--whatsapp-brand)] rounded-xl font-mono text-[10px] uppercase tracking-widest font-bold transition-all shadow-[var(--shadow-sm)]">
                <MessageCircle className="w-4 h-4" /> Discuss Similar Project
              </a>
            </div>
          </BentoCard>
        ))}
      </section>
    </div>
  );
}
