// src/pages/Projects.jsx — 2 live cards + under-development locked grid + 2027 coming-soon banner
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, WhatsAppIcon } from '../icons';
import { PROJECTS } from '../data/projects';
import PillButton from '../components/PillButton';

/* ─── Animation ─── */
const fadeUpContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Data split ─── */
const liveProjects = PROJECTS.filter(p => !p.underDevelopment);
const devProjects  = PROJECTS.filter(p => p.underDevelopment);

/* ─── Palette for "screenshots" ─── */
const PALETTES = [
  ['#0f1b2d', '#183352', '#1e4080'],
  ['#1a0a00', '#3d1600', '#6b2800'],
  ['#001a12', '#003d28', '#006644'],
];

/* ─── Live Project Card ─── */
function LiveCard({ project, index }) {
  const pal = PALETTES[index % PALETTES.length];

  return (
    <motion.div
      variants={fadeUpItem}
      style={{
        borderRadius: '28px',
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero image / preview area */}
      <div style={{
        position: 'relative',
        height: '240px',
        background: `linear-gradient(135deg, ${pal[0]} 0%, ${pal[1]} 50%, ${pal[2]} 100%)`,
        overflow: 'hidden',
      }}>
        {/* Decorative grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Fake browser frame */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%',
          transform: 'translateX(-50%) translateY(20px)',
          width: '85%', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '12px 12px 0 0',
          backdropFilter: 'blur(8px)',
          padding: '8px 12px',
        }}>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '6px' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <span key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.12)', borderRadius: '3px', marginBottom: '5px' }} />
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', width: '70%' }} />
        </div>

        {/* Live badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          borderRadius: '999px', padding: '5px 12px',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#22c55e',
            animation: 'livePulse 1.5s ease infinite',
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: '#fff',
          }}>Live</span>
        </div>

        {/* Year badge */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          borderRadius: '999px', padding: '5px 12px',
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          fontWeight: 700, color: 'rgba(255,255,255,0.7)',
        }}>{project.year}</div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Type tag */}
        <span style={{
          display: 'inline-block', marginBottom: '0.85rem',
          fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          background: 'var(--orange)', color: 'var(--white-locked)',
          padding: '4px 12px', borderRadius: '999px',
          alignSelf: 'flex-start',
        }}>{project.type}</span>

        {/* Title */}
        <h3 className="font-display" style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
          marginBottom: '0.65rem',
          letterSpacing: '-0.01em',
        }}>{project.name}</h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
          color: 'var(--text-muted)', lineHeight: 1.7,
          marginBottom: '1.5rem', flex: 1,
        }}>{project.description}</p>

        {/* Tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
          marginBottom: '1.5rem',
        }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '4px 10px', borderRadius: '8px',
              background: 'var(--bg-alt)', color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem', borderRadius: '999px',
            background: 'var(--text)', color: 'var(--bg)',
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            textDecoration: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Visit Live Site <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Under Development Locked Card ─── */
function LockedCard({ project }) {
  return (
    <motion.div
      variants={fadeUpItem}
      style={{
        borderRadius: '20px',
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: 0.7,
      }}
    >
      {/* Diagonal stripe overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.025) 12px, rgba(0,0,0,0.025) 24px)',
        pointerEvents: 'none',
      }} />

      {/* Lock badge */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: '999px', padding: '4px 10px',
      }}>
        <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
          <rect x="1" y="4.5" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2" style={{ color: 'var(--text-muted)' }} />
          <path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" style={{ color: 'var(--text-muted)' }} />
        </svg>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--text-muted)',
        }}>In Progress</span>
      </div>

      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        color: 'var(--orange)', marginBottom: '0.5rem',
      }}>{project.type}</p>

      <h4 className="font-display" style={{
        fontSize: '1.1rem', marginBottom: '0.5rem', letterSpacing: '-0.01em',
        paddingRight: '60px',
      }}>{project.name}</h4>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: '0.82rem',
        color: 'var(--text-muted)', lineHeight: 1.6,
        marginBottom: '1rem',
      }}>{project.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '3px 8px', borderRadius: '6px',
            background: 'var(--bg-alt)', color: 'var(--text-muted)',
            border: '1px solid var(--border)',
          }}>{t}</span>
        ))}
      </div>

      <div style={{
        marginTop: '1rem', paddingTop: '0.85rem',
        borderTop: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: '9px',
        color: 'var(--text-muted)', textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Est. Launch · {project.year}
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function Projects() {
  return (
    <div>
      <style>{`
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ padding: '6rem 0 4rem' }}>
        <div className="section-container">
          <motion.div variants={fadeUpContainer} initial="hidden" animate="show">
            <motion.p variants={fadeUpItem} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.14em',
              color: 'var(--orange)', marginBottom: '1rem',
            }}>Portfolio</motion.p>

            <motion.h1 variants={fadeUpItem} className="font-display" style={{
              fontSize: 'clamp(2.75rem, 7vw, 5rem)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
              marginBottom: '1.25rem', maxWidth: '680px',
            }}>
              Selected Work.
            </motion.h1>

            <motion.p variants={fadeUpItem} style={{
              fontFamily: 'var(--font-sans)', fontSize: '1.05rem',
              color: 'var(--text-muted)', lineHeight: 1.75,
              maxWidth: '520px',
            }}>
              Live platforms we've designed and shipped. More projects are actively in development and launching through 2027.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE PROJECTS ── */}
      <section style={{ paddingBottom: '5rem' }}>
        <div className="section-container">
          <motion.div
            variants={fadeUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUpItem} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              marginBottom: '2.5rem',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#22c55e',
                animation: 'livePulse 1.5s ease infinite',
                display: 'inline-block',
              }} />
              <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 0 }}>
                Live & Deployed
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                background: 'rgba(34,197,94,0.12)', color: '#22c55e',
                border: '1px solid rgba(34,197,94,0.3)',
                padding: '3px 10px', borderRadius: '999px',
              }}>{liveProjects.length} sites</span>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
            }}>
              {liveProjects.map((p, i) => (
                <LiveCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── UNDER DEVELOPMENT ── */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container">
          <motion.div
            variants={fadeUpContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUpItem} style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '0.65rem',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="var(--text-muted)" strokeWidth="1.5" />
                  <path d="M8 4v4l2.5 2.5" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 0 }}>
                  Under Development
                </h2>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                  background: 'var(--bg)', color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  padding: '3px 10px', borderRadius: '999px',
                }}>{devProjects.length} projects</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.92rem',
                color: 'var(--text-muted)', lineHeight: 1.7,
                maxWidth: '520px',
              }}>
                These projects are actively being built. They are closed to the public until their estimated launch date.
              </p>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              {devProjects.map(p => (
                <LockedCard key={p.slug} project={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMING SOON BY 2027 ── */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: '32px',
              border: '1px solid var(--border)',
              background: 'var(--bg-alt)',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* Glowing orb */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px', height: '400px',
              background: 'var(--orange)',
              borderRadius: '50%', filter: 'blur(120px)',
              opacity: 0.06, pointerEvents: 'none',
            }} />

            {/* Animated ticker */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(254,108,1,0.1)',
              border: '1px solid rgba(254,108,1,0.25)',
              borderRadius: '999px', padding: '0.35rem 1rem',
              marginBottom: '1.75rem',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--orange)', display: 'inline-block',
                animation: 'livePulse 1.5s ease infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.14em',
                color: 'var(--orange)',
              }}>More Projects — Launching by 2027</span>
            </div>

            <h2 className="font-display" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em',
              marginBottom: '1rem',
              position: 'relative', zIndex: 1,
            }}>
              The pipeline is full.
            </h2>

            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '1rem',
              color: 'var(--text-muted)', lineHeight: 1.75,
              maxWidth: '520px', margin: '0 auto 2.5rem',
              position: 'relative', zIndex: 1,
            }}>
              We have several client and internal projects in active development — from SaaS platforms to local business tools. All set to launch by end of 2027.
            </p>

            {/* Stats row */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: '1rem', marginBottom: '2.5rem',
              position: 'relative', zIndex: 1,
            }}>
              {[
                { value: devProjects.length + '+', label: 'In Development' },
                { value: '2027', label: 'Target Launch' },
                { value: '2', label: 'Live Now' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '1rem 1.5rem',
                  minWidth: '120px',
                }}>
                  <p className="font-display" style={{ fontSize: '2rem', margin: 0, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: 'var(--text-muted)', margin: 0,
                  }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
              justifyContent: 'center', position: 'relative', zIndex: 1,
            }}>
              <a
                href="https://wa.me/94768325949"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#25D366', color: '#fff',
                  borderRadius: '999px', padding: '0.8rem 1.75rem',
                  fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)'; }}
              >
                <WhatsAppIcon className="w-4 h-4" /> Follow Our Progress
              </a>
              <PillButton as="link" to="/contact" variant="orange">
                Start Your Project <ArrowRightIcon className="w-4 h-4" />
              </PillButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ paddingBottom: '5rem' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'center', padding: 'clamp(3rem, 6vw, 5rem)',
              borderRadius: '32px',
              background: 'var(--orange)', color: '#fff',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px', height: '300px',
              background: '#fff', borderRadius: '50%',
              filter: 'blur(100px)', opacity: 0.15, pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.7)', marginBottom: '0.75rem',
              }}>Like what you see?</p>
              <h2 className="font-display" style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '2rem', color: '#fff',
              }}>
                Let's build your next platform.
              </h2>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <PillButton as="a" href="https://wa.me/94768325949" target="_blank" rel="noopener noreferrer" variant="neutral" style={{ background: '#fff', color: 'var(--orange)' }}>
                  <WhatsAppIcon className="w-4 h-4 mr-2" /> WhatsApp Us
                </PillButton>
                <PillButton as="link" to="/contact" variant="neutral" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  Start a Project
                </PillButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
