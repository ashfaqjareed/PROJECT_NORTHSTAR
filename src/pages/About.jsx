// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { ShieldIcon, CodeIcon, BoltIcon, PaletteIcon, ArrowRightIcon, StarIcon } from '../icons';

function Section({ children, alt = false, style = {} }) {
  return (
    <section style={{ background: alt ? 'var(--bg-alt)' : 'var(--bg)', padding: '5rem 0', ...style }}>
      <div className="section-container">{children}</div>
    </section>
  );
}

/* ── Inline SVG icons for social links ── */
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function About() {
  useScrollFadeUp();

  return (
    <div>
      {/* Panel 1: Header */}
      <Section>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Who we are</p>
        <h1 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem', maxWidth: '640px' }}>
          About NorthStarDevs.
        </h1>
        <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '560px' }}>
          A small team with a hands-on approach. NorthStarDevs is a Colombo-based software studio focused on websites, web applications and digital experiences.
        </p>
      </Section>

      {/* Panel 2: Founder Profile */}
      <Section alt>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: circular photo */}
          <div className="fade-up flex flex-col items-center md:mx-auto" data-delay="60">
            <div style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--orange)',
              boxShadow: '0 0 0 6px var(--bg-alt), 0 0 0 8px var(--border)',
              marginBottom: '2rem',
              flexShrink: 0,
              background: 'var(--bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src="/profile.jpg" alt="Ashfaq Jareed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.linkedin.com/in/ashfaqjareed"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.1rem', borderRadius: '999px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: 'var(--text)', textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0077b5'; e.currentTarget.style.color = '#0077b5'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                aria-label="Connect on LinkedIn"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="https://www.instagram.com/ashfaqjareed"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.1rem', borderRadius: '999px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: 'var(--text)', textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#e1306c'; e.currentTarget.style.color = '#e1306c'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                aria-label="Follow on Instagram"
              >
                <InstagramIcon /> Instagram
              </a>
              <a
                href="http://ashfaqjareed.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.1rem', borderRadius: '999px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: 'var(--text)', textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--orange)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                aria-label="View personal portfolio"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Portfolio
              </a>
            </div>
          </div>

          {/* Right: bio */}
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.5rem', color: 'var(--orange)' }}>Founder</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '0.5rem' }}>
              Mohamed Ashfaq Jareed
            </h2>
            <p className="font-mono fade-up" data-delay="80" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Founder &amp; Lead Developer · NorthStarDevs
            </p>
            <div className="fade-up" data-delay="120" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                I'm a full-stack web developer and designer based in Colombo, Sri Lanka. I started NorthStarDevs because I saw too many small businesses paying too much for websites that weren't built properly — and too many developers taking on work they couldn't deliver honestly.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Everything I build — from a single-page website to a full-stack application — is built by me, personally. No outsourcing, no handoffs to juniors. You talk directly to the person writing the code.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                My work covers full stack development, business websites, social media design, posters and banners, landing pages, and website redesigns. If it involves a screen, I can probably help.
              </p>

              {/* Personal portfolio link */}
              <a
                href="http://ashfaqjareed.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="fade-up"
                data-delay="140"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: 'var(--orange)', textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  marginTop: '0.5rem',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View my personal portfolio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* Availability badge */}
            <div className="fade-up" data-delay="160" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginTop: '1.75rem',
              padding: '0.5rem 1rem', borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'var(--bg)',
              fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'var(--text)',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 0 2px #22c55e40',
                flexShrink: 0,
                animation: 'pulse 2s infinite',
              }} />
              Available for projects
            </div>

            {/* Inline pulse animation */}
            <style>{`
              @keyframes pulse {
                0%, 100% { box-shadow: 0 0 0 2px #22c55e40; }
                50% { box-shadow: 0 0 0 5px #22c55e20; }
              }
            `}</style>
          </div>
        </div>
      </Section>

      {/* Panel 3: Our Approach */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Our Approach</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1.25rem' }}>
              We keep the team small on purpose.
            </h2>
          </div>
          <div className="fade-up" data-delay="120" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              That means fewer layers between you and the people actually designing and building your project.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              You talk directly to the people working on your product, see progress as it happens and know exactly what you're paying for.
            </p>
          </div>
        </div>
      </Section>

      {/* Panel 4: What We Do */}
      <Section alt>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Our Services</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.75rem', maxWidth: '520px' }}>
          What we do
        </h2>
        <p className="fade-up" data-delay="80" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2.5rem' }}>
          These are the things we're actually good at and take on regularly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            {
              icon: CodeIcon,
              title: 'Full Stack Development',
              desc: 'Complete React applications with a Firebase/Firestore backend. User authentication, databases, admin panels — the whole thing built properly.',
            },
            {
              icon: BoltIcon,
              title: 'Business Websites',
              desc: 'Multi-section websites for businesses that need more than a basic page — services listed, contact forms working, and a design that actually represents the brand.',
            },
            {
              icon: PaletteIcon,
              title: 'Social Media Design',
              desc: 'Feed posts, story templates, highlight covers and profile art — all designed to look consistent and on-brand across your social platforms.',
            },
            {
              icon: StarIcon,
              title: 'Posters & Banners',
              desc: 'Event posters, promotional banners, digital ad creatives — designed to stop the scroll with clean layout and strong visual hierarchy.',
            },
            {
              icon: BoltIcon,
              title: 'Website Redesign',
              desc: 'Your existing site looks outdated? We audit what\'s there and rebuild it into something modern, fast, and properly structured — without losing your content.',
            },
            {
              icon: CodeIcon,
              title: 'Landing Pages & Single Page Sites',
              desc: 'Focused single-purpose pages built to convert, and clean one-page websites covering everything from hero to contact in one scroll.',
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="fade-up bento-card" data-delay={i * 80} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display" style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Panel 5: How We Work */}
      <Section>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>How we work</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem' }}>
          A few things we stand by
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] border border-[var(--border)] rounded-xl overflow-hidden">
          {[
            { num: '01', title: 'We say what we mean', desc: 'If your budget doesn\'t match the scope, we\'ll say so upfront. No vague promises and no agreeing to things we can\'t deliver.' },
            { num: '02', title: 'Everything is written down', desc: 'Every project starts with a clear brief — what\'s being built, how many revisions, and when it\'s due. That way there are no surprises for either side.' },
            { num: '03', title: 'You can see progress', desc: 'We share the work-in-progress as we go. You don\'t wait until the end to see what you\'re getting. Feedback happens along the way.' },
          ].map((v, i) => (
            <div
              key={v.title}
              className="fade-up p-8 bg-[var(--bg)]"
              data-delay={i * 80}
            >
              <p className="eyebrow" style={{ marginBottom: '0.5rem', color: 'var(--orange)' }}>{v.num}</p>
              <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Panel 6: What we don't do */}
      <Section alt>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>What we don't do</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
              We're upfront about this
            </h2>
            <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Better to say it now than waste your time. These are things we don't offer and won't pretend to.
            </p>
          </div>
          <div className="fade-up" data-delay="120" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              'Mobile app development (iOS / Android)',
              'WordPress or template-based builds',
              'Paid advertising (Google Ads, Facebook Ads)',
              'SEO campaigns or link building',
              'Projects without a written brief',
              'Work without a 50% upfront deposit',
            ].map(item => (
              <div key={item} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'center',
                padding: '0.875rem 1rem',
                border: '1px solid var(--border)', borderRadius: '8px',
                fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border)', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Panel 7: CTA */}
      <Section>
        <div className="fade-up" style={{
          textAlign: 'center', padding: '3rem 2rem',
          borderRadius: 'var(--radius-curve)',
          border: '1px solid var(--border)', background: 'var(--bg-alt)',
        }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Want to work with us?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
            Send us a message on WhatsApp or fill out the contact form — we get back within the day.
          </p>
          <Link to="/contact" className="btn-liquid" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--orange)', color: 'var(--white-locked)',
            fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            textDecoration: 'none', padding: '0.875rem 2rem',
          }}>
            Contact Us <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
