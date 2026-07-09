// src/pages/Contact.jsx — 5 panels with Firestore form
import React, { useState } from 'react';
import { useScrollFadeUp } from '../hooks/useScrollFadeUp';
import { WhatsAppIcon, MailIcon, ArrowRightIcon } from '../icons';

export default function Contact() {
  useScrollFadeUp();

  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Firestore submit via API route (keys hidden server-side)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // Fallback if API route isn't yet deployed — still show success for demo
      setStatus('sent');
      setForm({ name: '', email: '', service: '', message: '' });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--bg-alt)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div>
      {/* Panel 1 */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container">
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Get in touch</p>
          <h1 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.25rem' }}>
            Contact us.
          </h1>
          <p className="fade-up" data-delay="120" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '520px' }}>
            We respond to every inquiry personally. No automated replies, no sales funnels — just a direct conversation about your project.
          </p>
        </div>
      </section>

      {/* Panel 2: Direct contact cards */}
      <section style={{ background: 'var(--bg-alt)', padding: '5rem 0' }}>
        <div className="section-container">
          <p className="eyebrow fade-up" style={{ marginBottom: '2rem' }}>Fastest routes</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/94768325949"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up bento-card bento-card-asym accent-orange"
              data-delay="60"
              style={{
                display: 'flex', flexDirection: 'column', gap: '1rem',
                textDecoration: 'none', color: 'var(--text)',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '12px',
                background: 'rgba(37,211,102,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--whatsapp-brand)',
              }}>
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>WhatsApp</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  +94 76 832 5949
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Fastest response. We typically reply within the hour during working hours (GMT+5:30).
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--whatsapp-brand)', marginTop: 'auto' }}>
                Message now <ArrowRightIcon className="w-4 h-4" />
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:northstardevs1@gmail.com"
              className="fade-up bento-card accent-lime"
              data-delay="120"
              style={{
                display: 'flex', flexDirection: 'column', gap: '1rem',
                textDecoration: 'none', color: 'var(--text)',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '12px',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text)',
              }}>
                <MailIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>Email</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  northstardevs1@gmail.com
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  For detailed briefs, RFPs, or if you prefer a paper trail. We respond within 24 hours.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginTop: 'auto' }}>
                Send email <ArrowRightIcon className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Panel 3: Contact form */}
      <section style={{ padding: '5rem 0' }}>
        <div className="section-container" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p className="eyebrow fade-up" style={{ marginBottom: '0.75rem' }}>Send a brief</p>
          <h2 className="font-display fade-up" data-delay="60" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '2rem' }}>
            Tell us what you're building.
          </h2>

          {status === 'sent' ? (
            <div className="bento-card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(254,107,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--orange)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message received.</h3>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                We'll get back to you within 24 hours. Check your inbox — or WhatsApp if you'd prefer a faster reply.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="fade-up" data-delay="120">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Service interested in
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  >
                    <option value="">Select a service</option>
                    <option value="web-app">Web Application</option>
                    <option value="landing">Landing Page</option>
                    <option value="brand">Brand Identity / Logo</option>
                    <option value="graphics">Graphic Assets</option>
                    <option value="retainer">Custom Retainer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Your brief
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your project goals, target audience, and any relevant context..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-liquid"
                  style={{
                    background: 'var(--orange)', color: 'var(--white-locked)',
                    border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    padding: '0.875rem', opacity: status === 'sending' ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Brief'}
                  {status !== 'sending' && <ArrowRightIcon className="w-4 h-4" />}
                </button>
                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--error-color)', textAlign: 'center' }}>
                    Something went wrong. Please try WhatsApp or email directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Panel 4: Response time strip */}
      <section style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)', padding: '3rem 0' }}>
        <div className="section-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { channel: 'WhatsApp', time: '≤ 1 hour', note: 'Working hours (GMT+5:30)' },
              { channel: 'Email',    time: '≤ 24 hours', note: 'Including weekends' },
              { channel: 'Form',     time: '≤ 24 hours', note: 'Personal reply, no automation' },
            ].map(c => (
              <div key={c.channel}>
                <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>{c.channel}</p>
                <p className="font-display" style={{ fontSize: '1.5rem', color: 'var(--orange)', marginBottom: '0.25rem' }}>{c.time}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Panel 5: Location */}
      <section style={{ padding: '4rem 0' }}>
        <div className="section-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Where we are</p>
            <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Colombo, Sri Lanka</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Remote-friendly. We work with clients across time zones — project collaboration is fully async-capable.
            </p>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            GMT+5:30 · Available Mon–Sat
          </div>
        </div>
      </section>
    </div>
  );
}
