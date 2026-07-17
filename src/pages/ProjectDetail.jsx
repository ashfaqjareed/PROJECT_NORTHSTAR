import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon, CodeIcon, ClockIcon, LinkIcon } from '../icons';
import PillButton from '../components/PillButton';
import { SiReact, SiVite, SiTailwindcss, SiFirebase, SiFigma, SiNodedotjs, SiVercel, SiTypescript, SiNextdotjs, SiOpenaigym } from 'react-icons/si';

const ICONS = {
  'React': SiReact,
  'React 19': SiReact,
  'Vite': SiVite,
  'Tailwind CSS': SiTailwindcss,
  'Tailwind v4': SiTailwindcss,
  'Firebase': SiFirebase,
  'Figma': SiFigma,
  'Node.js': SiNodedotjs,
  'Vercel': SiVercel,
  'TypeScript': SiTypescript,
  'Next.js': SiNextdotjs,
  'OpenAI API': SiOpenaigym,
};

const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.slug === slug);
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (project?.github) {
      setLoading(true);
      fetch(`https://api.github.com/repos/${project.github.owner}/${project.github.repo}`)
        .then(res => res.json())
        .then(data => {
          if (!data.message) {
            setGithubData({
              stars: data.stargazers_count,
              createdAt: new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              url: data.html_url
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl mb-4">Project Not Found</h1>
        <p className="font-sans text-[var(--text-muted)] mb-8">The case study you are looking for does not exist or has been removed.</p>
        <PillButton as="button" onClick={() => navigate('/projects')} variant="neutral">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Projects
        </PillButton>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-12">
      <motion.div className="section-container" variants={fadeUpContainer} initial="hidden" animate="show">
        {/* Back Link */}
        <motion.div variants={fadeUpItem} className="mb-12">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Portfolio
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          <div className="lg:col-span-8">
            <motion.div variants={fadeUpItem} className="flex flex-wrap gap-3 mb-6">
              <span className={`font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${project.type === 'Client Project' ? 'bg-[var(--orange)] text-[var(--white-locked)]' : 'border border-[var(--border)] text-[var(--text-muted)]'}`}>
                {project.type}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2 px-2">
                <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-[var(--lime)]' : project.status === 'In Development' ? 'bg-[var(--orange)]' : 'bg-[var(--text-muted)]'}`} />
                {project.status}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUpItem} className="font-display text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] mb-4">
              {project.name}
            </motion.h1>

            {/* Visual Stars */}
            <motion.div variants={fadeUpItem} className="flex gap-1 mb-8">
              {[1, 2, 3, 4, 5].map(star => (
                <StarIcon key={star} className="w-5 h-5 text-[var(--orange)]" />
              ))}
            </motion.div>

            <motion.div variants={fadeUpItem}>
              <h2 className="font-display text-2xl mb-4">Overview</h2>
              <p className="font-sans text-lg text-[var(--text-muted)] leading-relaxed max-w-3xl">
                {project.fullDescription || project.description}
              </p>
            </motion.div>
          </div>

          {/* Sidebar / Meta Stats */}
          <motion.div variants={fadeUpItem} className="lg:col-span-4 bg-[var(--bg-alt)] border border-[var(--border)] rounded-[24px] p-8">
            <div className="flex flex-col gap-6">
              <div>
                <p className="eyebrow mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => {
                    const Icon = ICONS[tag] || CodeIcon;
                    return (
                      <span key={tag} className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-md text-[var(--text)]">
                        <Icon className="w-3 h-3" /> {tag}
                      </span>
                    )
                  })}
                </div>
              </div>

              {project.github && !loading && githubData && (
                <div className="pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                  <div>
                    <p className="eyebrow mb-2">GitHub Stars</p>
                    <p className="font-mono text-lg font-bold flex items-center gap-2">
                      <StarIcon className="w-5 h-5 text-[var(--orange)]" /> {githubData.stars}
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Created</p>
                    <p className="font-mono text-lg font-bold flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-[var(--text-muted)]" /> {githubData.createdAt}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div variants={fadeUpItem} className="flex flex-wrap gap-4 pt-8 border-t border-[var(--border)] mb-20">
          {project.liveUrl && (
            <PillButton as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="orange">
              Visit Live Site <ArrowRightIcon className="w-4 h-4 ml-2" />
            </PillButton>
          )}
          {project.github && githubData?.url && (
            <PillButton as="a" href={githubData.url} target="_blank" rel="noopener noreferrer" variant="neutral">
              <CodeIcon className="w-4 h-4 mr-2" /> View Source on GitHub
            </PillButton>
          )}
        </motion.div>

        {/* Visual Showcase Slides */}
        <motion.div variants={fadeUpItem} className="mb-20">
          <h2 className="font-display text-3xl mb-8">Project Slides</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x" style={{ scrollbarWidth: 'none' }}>
            {project.images && project.images.length > 0 ? (
               project.images.map((imgUrl, index) => (
                <div 
                  key={index} 
                  className="snap-center shrink-0 w-[85vw] md:w-[600px] h-[400px] rounded-[24px] bg-[var(--bg-alt)] border border-[var(--border)] relative overflow-hidden group"
                >
                  <img src={imgUrl} alt={`${project.name} slide ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))
            ) : (
              [1, 2, 3].map(slide => (
                <div 
                  key={slide} 
                  className="snap-center shrink-0 w-[85vw] md:w-[600px] h-[400px] rounded-[24px] bg-[var(--bg-alt)] border border-[var(--border)] flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(173,255,47,0.03)] to-[rgba(254,108,1,0.03)]" />
                  <div className="z-10 text-center">
                    <LinkIcon className="w-10 h-10 text-[var(--text-muted)] mb-4 mx-auto opacity-30 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[var(--text-muted)] mb-2">Slide {slide}</p>
                    <p className="font-sans text-sm text-[var(--text-muted)] max-w-[250px] mx-auto opacity-70">
                      High-resolution imagery or architectural diagrams for {project.name}.
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
