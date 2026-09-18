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
          A small web development team based in Sri Lanka. We build websites for businesses, brands, and individuals — from simple landing pages to full stack web applications.
        </p>
      </Section>

      {/* Panel 2: Our Story */}
      <Section alt>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Our Story</p>
            <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '1.25rem' }}>
              Started simple. Kept going.
            </h2>
          </div>
          <div className="fade-up" data-delay="120" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              NorthStarDevs started because we kept seeing the same thing — people paying good money for websites that looked average and took forever to load. We thought we could do better, so we started taking on projects.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We handle both the design and the development ourselves. That means there's no miscommunication between a designer and a developer — the same person who draws the layout is the same person who writes the code. What you see in the preview is what you get when it's live.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We're honest about where we're at. We're not a big agency with a hundred past clients. What we do have is a clear process, good work to show for it, and a straightforward way of doing things.
            </p>
          </div>
        </div>
      </Section>

      {/* Panel 3: What We Do */}
      <Section>
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
              title: 'Landing Pages',
              desc: 'A single, well-built page to get your business online and looking professional. Fast to build, mobile-friendly, and optimised to perform.',
            },
            {
              icon: BoltIcon,
              title: 'Growth Plans',
              desc: 'Multi-section websites for businesses that need more than a basic page — services listed, contact forms working, and a design that actually represents the brand.',
            },
            {
              icon: ShieldIcon,
              title: 'Web Maintenance',
              desc: 'Ongoing support for websites already live. Security patches, content updates, and fixing things when they break — on a monthly retainer basis.',
            },
            {
              icon: PaletteIcon,
              title: 'Logo & Banner Design',
              desc: 'Logo creation, social media banners, poster design, and other graphic assets. We keep the style consistent so everything looks like it belongs together.',
            },
            {
              icon: StarIcon,
              title: 'Full Stack Web Apps',
              desc: 'When a regular website isn\'t enough — we build full React applications with a Firebase/Firestore backend. User authentication, databases, dark mode — the whole thing.',
            },
            {
              icon: BoltIcon,
              title: 'Social Media Suits',
              desc: 'Content creation and management for social platforms. Post designs, captions, scheduling, and monthly reporting — handled so you don\'t have to think about it.',
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

      {/* Panel 4: How We Work */}
      <Section alt>
        <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>How we work</p>
        <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '2.5rem' }}>
          A few things we stand by
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          {[
            { num: '01', title: 'We say what we mean', desc: 'If your budget doesn\'t match the scope, we\'ll say so upfront. No vague promises and no agreeing to things we can\'t deliver.' },
            { num: '02', title: 'Everything is written down', desc: 'Every project starts with a clear brief — what\'s being built, how many revisions, and when it\'s due. That way there are no surprises for either side.' },
            { num: '03', title: 'You can see progress', desc: 'We share the work-in-progress as we go. You don\'t wait until the end to see what you\'re getting. Feedback happens along the way.' },
          ].map((v, i) => (
            <div
              key={v.title}
              className="fade-up"
              data-delay={i * 80}
              style={{ padding: '2rem', background: 'var(--bg)', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
            >
              <p className="eyebrow" style={{ marginBottom: '0.5rem', color: 'var(--orange)' }}>{v.num}</p>
              <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Panel 5: What we don't do */}
      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
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

      {/* Panel 6: CTA */}
      <Section alt>
        <div className="fade-up" style={{
          textAlign: 'center', padding: '3rem 2rem',
          borderRadius: 'var(--radius-curve)',
          border: '1px solid var(--border)', background: 'var(--bg)',
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
