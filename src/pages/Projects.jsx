import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, StarIcon, CheckIcon, WhatsAppIcon } from '../icons';
import { PROJECTS } from '../data/projects';
import PillButton from '../components/PillButton';

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Projects() {
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = PROJECTS.filter(p => filter === 'All' ? true : p.type === filter);
  const featuredProject = PROJECTS.find(p => p.slug === 'northstar');

  return (
    <div>
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

      {/* Panel 2: Case study slider */}
      <section className="pb-24">
        <div className="section-container relative">
          {/* Horizontal scroll container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative min-w-[320px] md:min-w-[400px] snap-center bg-[var(--bg)] border border-[var(--border)] p-8 md:p-10 flex flex-col hover:border-[var(--orange)] transition-all duration-300 rounded-[32px] overflow-hidden"
                  style={{ flex: '0 0 auto' }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${project.type === 'Client Project' ? 'bg-[var(--orange)] text-[var(--white-locked)]' : 'border border-[var(--border)] text-[var(--text-muted)]'}`}>
                      {project.type}
                    </span>
                    
                    {/* Live Pulse Status */}
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                      <span className="relative flex h-3 w-3">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          project.status === 'Live' ? 'bg-green-500' :
                          project.status === 'Maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${
                          project.status === 'Live' ? 'bg-green-500' :
                          project.status === 'Maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                      </span>
                      {project.status}
                    </div>
                  </div>
                  
                  <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-[var(--orange)] transition-colors">
                    <Link to={`/projects/${project.slug}`} className="before:absolute before:inset-0 z-10">
                      {project.name}
                    </Link>
                  </h3>
                  
                  <p className="font-sans text-[var(--text-muted)] text-[0.95rem] leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Expanded info on hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden mb-4 relative z-20">
                    <div className="flex flex-col gap-2 text-sm text-[var(--text)] font-sans">
                      {project.liveUrl && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[var(--text-muted)]">URL:</span>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--orange)] truncate">
                            {project.liveUrl.replace('https://', '')}
                          </a>
                        </div>
                      )}
                      {project.github && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[var(--text-muted)]">GitHub:</span>
                          <a href={`https://github.com/${project.github.owner}/${project.github.repo}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--orange)] truncate">
                            {project.github.owner}/{project.github.repo}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <StarIcon className="w-4 h-4 text-yellow-500" />
                        <span className="font-mono text-xs font-bold">{project.stars || 0} Stars</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[var(--border)]">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--bg-alt)] text-[var(--text-muted)] rounded-md">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--bg-alt)] text-[var(--text-muted)] rounded-md">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              )) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full py-20 text-center border border-dashed border-[var(--border)] rounded-[32px]"
                >
                  <CodeIcon className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    More builds landing soon
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Fading edges for carousel */}
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
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
                  {/* Decorative grid */}
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
                  <div className="relative z-10 flex gap-4 mt-8">
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

      {/* Panel 4: Process teaser */}
      <section className="py-24">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="text-center max-w-2xl mx-auto">
            <motion.p variants={fadeUpItem} className="eyebrow mb-3">How we do it</motion.p>
            <motion.h2 variants={fadeUpItem} className="font-display text-3xl md:text-4xl mb-6">
              Every build follows a strict sequence.
            </motion.h2>
            <motion.p variants={fadeUpItem} className="font-sans text-[var(--text-muted)] text-[1.05rem] leading-relaxed mb-8">
              We don't invent new workflows for every project. We rely on a battle-tested four-step process that guarantees timeline accuracy and eliminates scope creep.
            </motion.p>
            <motion.div variants={fadeUpItem}>
              <PillButton as="link" to="/process" variant="neutral">
                Explore Our Process <ArrowRightIcon className="w-4 h-4 ml-2" />
              </PillButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Panel 5: CTA band */}
      <section className="pb-24 pt-12">
        <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUpItem} className="text-center p-16 md:p-24 rounded-[var(--radius-curve)] bg-[var(--text)] text-[var(--bg)]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50 mb-3">Like what you see?</p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 text-white">
              Let's build your next platform.
            </h2>
            <div className="flex gap-4 justify-center flex-wrap">
              <PillButton as="a" href="https://wa.me/94768325949" target="_blank" rel="noopener noreferrer" variant="orange">
                <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp Us
              </PillButton>
              <PillButton as="link" to="/contact" variant="neutral" style={{ background: 'var(--white-locked-10)', color: 'var(--white-locked)', borderColor: 'rgba(255,255,255,0.2)' }}>
                Start a Project
              </PillButton>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
