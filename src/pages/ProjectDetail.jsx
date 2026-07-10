import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import { ArrowLeftIcon, ArrowRightIcon, StarIcon, CodeIcon, ClockIcon, LinkIcon } from '../icons';
import PillButton from '../components/PillButton';
import { SiReact, SiVite, SiTailwindcss, SiFirebase, SiFigma, SiNodedotjs, SiVercel, SiTypescript, SiNextdotjs, SiOpenai } from 'react-icons/si';

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
  'OpenAI API': SiOpenai,
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

            <motion.h1 variants={fadeUpItem} className="font-display text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] mb-6">
              {project.name}
            </motion.h1>

            <motion.p variants={fadeUpItem} className="font-sans text-xl text-[var(--text-muted)] leading-relaxed max-w-3xl">
              {project.description}
            </motion.p>
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

        {/* Visual Showcase Placeholder */}
        <motion.div variants={fadeUpItem} className="bento-card-asym bg-[var(--bg-alt)] border border-[var(--border)] p-10 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
          <LinkIcon className="w-12 h-12 text-[var(--text-muted)] mb-6 opacity-30" />
          <h2 className="font-display text-2xl text-[var(--text-muted)] mb-3">Case Study Media Coming Soon</h2>
          <p className="font-sans text-[var(--text-muted)] max-w-md mx-auto opacity-70">
            Full visual breakdown, architectural diagrams, and performance metrics for {project.name} will be uploaded here shortly.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
