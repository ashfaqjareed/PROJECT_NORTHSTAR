import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, StarIcon, CheckIcon, WhatsAppIcon } from '../icons';
import { PROJECTS } from '../data/projects';
import PillButton from '../components/PillButton';

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// Palette of colors used as placeholder "screenshots" for each slide
const SLIDE_PALETTES = [
  ['#1a1a2e', '#16213e', '#0f3460'],
  ['#0d0d0d', '#1a1a1a', '#2d2d2d'],
  ['#fe6b00', '#ff8c00', '#ffa500'],
  ['#adff2f', '#7cfc00', '#32cd32'],
  ['#1e3a5f', '#2d5986', '#3d7ab5'],
  ['#2d0036', '#4a0050', '#6b0075'],
];

// Mini carousel shown inside each project card
function ProjectCarousel({ project, index }) {
  const palette = SLIDE_PALETTES[index % SLIDE_PALETTES.length];
  const slides = [
    { label: 'Preview', color: palette[0] },
    { label: 'UI Detail', color: palette[1] },
    { label: 'Mobile View', color: palette[2] },
  ];
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance on card hover
  useEffect(() => {
    if (!isHovered) return;
    const t = setInterval(() => {
      setActive(a => (a + 1) % slides.length);
    }, 1400);
    return () => clearInterval(t);
  }, [isHovered, slides.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActive(0); }}
      style={{
        position: 'relative',
        height: '160px',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '1.25rem',
        cursor: 'pointer',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', inset: 0,
            background: slides[active].color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '0.5rem',
          }}
        >
          {/* Fake UI skeleton inside the slide */}
          <div style={{ opacity: 0.2, width: '70%' }}>
            <div style={{ height: '10px', borderRadius: '6px', background: '#fff', marginBottom: '8px' }} />
            <div style={{ height: '7px', borderRadius: '6px', background: '#fff', marginBottom: '6px', width: '80%' }} />
            <div style={{ height: '7px', borderRadius: '6px', background: '#fff', width: '60%' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.5)',
          }}>
            {slides[active].label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Slide dots */}
      <div style={{
        position: 'absolute', bottom: '10px', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '5px', zIndex: 10,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActive(i); }}
            style={{
              width: i === active ? '18px' : '6px',
              height: '6px',
              borderRadius: '999px',
              border: 'none',
              background: i === active ? '#fff' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, background 0.2s ease',
            }}
          />
        ))}
      </div>

      {/* Live badge overlay */}
      <div style={{
        position: 'absolute', top: '10px', right: '10px',
        display: 'flex', alignItems: 'center', gap: '5px',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        borderRadius: '999px',
        padding: '4px 10px',
        zIndex: 10,
      }}>
        <span style={{
          display: 'inline-block',
          width: '6px', height: '6px', borderRadius: '50%',
          background: project.status === 'Live' ? '#22c55e' :
            project.status === 'Maintenance' ? '#eab308' : '#ef4444',
          animation: project.status === 'Live' ? 'livePulse 1.5s ease infinite' : 'none',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#fff',
        }}>
          {project.status}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = PROJECTS.filter(p => filter === 'All' ? true : p.type === filter);
  const featuredProject = PROJECTS.find(p => p.slug === 'northstar');

  return (
    <div>
      <style>{`
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
      `}</style>

      {/* Panel 1: Header + Filter Tags */}
      <section className="pt-24 pb-12">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" animate="show">
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Portfolio</motion.p>
          <motion.h1 variants={fadeUpItem} className="font-display text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-8">
            Things we've built.
          </motion.h1>
          
          <motion.div variants={fadeUpItem} className="flex gap-3 flex-wrap">
            {['All', 'Client Project', 'Personal Build'].map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`filter-tag ${filter === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Panel 2: Full Grid — each card has its own internal slideshow */}
      <section className="pb-24">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-3xl mb-8"
          >
            All Projects — {filteredProjects.length} builds
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="group relative bg-[var(--bg)] border border-[var(--border)] p-6 flex flex-col hover:border-[var(--orange)] transition-all duration-300 rounded-[28px] overflow-hidden"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  {/* ── Internal Slideshow ── */}
                  <ProjectCarousel project={project} index={i} />

                  {/* Type badge */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      project.type === 'Client Project'
                        ? 'bg-[var(--orange)] text-white'
                        : 'border border-[var(--border)] text-[var(--text-muted)]'
                    }`}>
                      {project.type}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-[var(--orange)] transition-colors">
                    <Link to={`/projects/${project.slug}`} className="before:absolute before:inset-0 z-10">
                      {project.name}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[var(--text-muted)] text-[0.875rem] leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Links row */}
                  <div className="flex flex-col gap-1.5 mb-5 relative z-20">
                    {project.liveUrl && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider w-14 flex-shrink-0">URL</span>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--orange)] truncate font-semibold text-[var(--text)] text-sm transition-colors"
                        >
                          {project.liveUrl.replace('https://', '')}
                        </a>
                      </div>
                    )}
                    {project.github && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider w-14 flex-shrink-0">GitHub</span>
                        <a
                          href={`https://github.com/${project.github.owner}/${project.github.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--orange)] truncate font-semibold text-[var(--text)] text-sm transition-colors"
                        >
                          {project.github.owner}/{project.github.repo}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                        {project.stars || 0} Stars
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[var(--border)]">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--bg-alt)] text-[var(--text-muted)] rounded-md">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--bg-alt)] text-[var(--text-muted)] rounded-md">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </motion.div>
              )) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center border border-dashed border-[var(--border)] rounded-[32px]"
                >
                  <CodeIcon className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    More builds landing soon
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Panel 3: Featured deep-dive card */}
      <section className="py-24 bg-[var(--bg-alt)] border-y border-[var(--border)]">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUpItem} className="eyebrow mb-3">Featured Case Study</motion.p>
          <motion.h2 variants={fadeUpItem} className="font-display text-3xl md:text-4xl mb-12">
            Engineering our own platform
          </motion.h2>

          {featuredProject && (
            <motion.div variants={fadeUpItem} className="bento-card-asym bg-[var(--bg)] border border-[var(--orange)] p-8 md:p-12 shadow-[0_0_0_1px_var(--orange)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-3xl mb-4">{featuredProject.name}</h3>
                  <p className="font-sans text-[var(--text-muted)] text-[1.05rem] leading-relaxed mb-6">
                    {featuredProject.description}
                  </p>
                  <ul className="flex flex-col gap-3 mb-8">
                    {['Zero layout shift (CLS: 0)', 'Dark mode pre-hydration', 'Framer Motion layout animations', 'Firestore ready'].map(f => (
                      <li key={f} className="flex items-center gap-3 font-sans text-[0.95rem]">
                        <CheckIcon className="w-4 h-4 text-[var(--orange)] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <PillButton as="link" to={`/projects/${featuredProject.slug}`} variant="orange">
                    Read the Case Study <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </PillButton>
                </div>
                <div className="bg-[var(--bg-alt)] rounded-[24px] p-8 min-h-[320px] relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }} />
                  <div className="relative z-10 font-mono text-sm text-[var(--text-muted)] leading-loose">
                    <span className="text-[var(--orange)]">import</span> React <span className="text-[var(--orange)]">from</span> 'react';<br/>
                    <span className="text-[var(--orange)]">import</span> {'{ motion }'} <span className="text-[var(--orange)]">from</span> 'framer-motion';<br/>
                    <br/>
                    <span className="text-[var(--lime)]">// Swiss-modern aesthetics</span><br/>
                    <span className="text-[var(--lime)]">// GPU-accelerated motion</span><br/>
                    <span className="text-[var(--lime)]">// Component-driven architecture</span><br/>
                  </div>
                  <div className="relative z-10 flex gap-4 mt-8 flex-wrap">
                    {featuredProject.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] font-bold uppercase tracking-widest bg-[var(--text)] text-[var(--bg)] px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Panel 4: CTA band */}
      <section className="pb-24 pt-12">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div 
            variants={fadeUpItem} 
            className="text-center p-16 md:p-24 rounded-[var(--radius-curve)]"
            style={{ backgroundColor: 'var(--orange)', color: '#fff' }}
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70 mb-3">Like what you see?</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-white">
              Let's build your next platform.
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <PillButton as="a" href="https://wa.me/94768325949" target="_blank" rel="noopener noreferrer" variant="neutral" style={{ background: '#fff', color: 'var(--orange)' }}>
                <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp Us
              </PillButton>
              <PillButton as="link" to="/contact" variant="neutral" style={{ background: 'var(--white-locked-10)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
                Start a Project
              </PillButton>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
