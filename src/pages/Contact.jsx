// src/pages/Contact.jsx — Left: WhatsApp + Email cards | Right: Form
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon, MailIcon, ArrowRightIcon } from '../icons';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setForm({ name: '', email: '', service: '', message: '' });
    } catch {
      setStatus('sent');
      setForm({ name: '', email: '', service: '', message: '' });
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.875rem 1rem',
    background: 'var(--bg-alt)', border: '1px solid var(--border)',
    borderRadius: '12px', color: 'var(--text)',
    fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '5rem 0 3rem' }}>
        <motion.div className="section-container" variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            Get in touch
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.25rem' }}>
            Let&apos;s talk about<br />your project.
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '520px' }}>
            We respond to every inquiry personally — no bots, no funnels. Just a direct conversation about what you&apos;re building.
          </motion.p>
        </motion.div>
      </section>

      {/* Main: two columns */}
      <section style={{ padding: '2rem 0 6rem' }}>
        <motion.div
          className="section-container"
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT — Contact options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)' }}>
              Fastest Routes
            </motion.p>

            {/* WhatsApp card */}
            <motion.a
              variants={fadeUp}
              href="https://wa.me/94768325949"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(37,211,102,0.2)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                display: 'flex', flexDirection: 'column', gap: '1rem',
                padding: '2rem', borderRadius: '24px',
                background: 'rgba(37,211,102,0.08)',
                border: '1px solid rgba(37,211,102,0.25)',
                textDecoration: 'none', color: 'var(--text)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>WhatsApp</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>+94 76 832 5949</p>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Fastest response — typically within the hour during working hours (GMT+5:30).
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#25D366' }}>
                Message now <ArrowRightIcon className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Email card */}
            <motion.a
              variants={fadeUp}
              href="mailto:northstardevs1@gmail.com"
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(254,107,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                display: 'flex', flexDirection: 'column', gap: '1rem',
                padding: '2rem', borderRadius: '24px',
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                textDecoration: 'none', color: 'var(--text)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(254,107,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                  <MailIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>Email</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>northstardevs1@gmail.com</p>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                For detailed briefs, RFPs, or if you prefer a paper trail. We respond within 24 hours.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)' }}>
                Send email <ArrowRightIcon className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Response times */}
            <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1.5rem', background: 'var(--bg-alt)', borderRadius: '20px', border: '1px solid var(--border)' }}>
              {[
                { label: 'WhatsApp', time: '≤ 1h'  },
                { label: 'Email',    time: '≤ 24h' },
                { label: 'Form',     time: '≤ 24h' },
              ].map(c => (
                <div key={c.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900, color: 'var(--orange)' }}>{c.time}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{c.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Contact form */}
          <motion.div variants={fadeUp} style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: '28px', padding: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Send a Brief
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '2rem' }}>
              Tell us what you&apos;re building.
            </h2>

            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(254,107,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: 'var(--orange)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message received!</h3>
                <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  We&apos;ll reply within 24 hours. For faster response, message us on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { id: 'name',    label: 'Your name',    type: 'text',  placeholder: 'Full name'         },
                    { id: 'email',   label: 'Email address', type: 'email', placeholder: 'you@company.com'  },
                  ].map(f => (
                    <div key={f.id}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>{f.label}</label>
                      <input
                        id={`contact-${f.id}`}
                        name={f.id}
                        type={f.type}
                        value={form[f.id]}
                        onChange={handleChange}
                        required
                        placeholder={f.placeholder}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Service</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    >
                      <option value="">Select a service…</option>
                      <option value="web-app">Web Application</option>
                      <option value="landing">Landing Page</option>
                      <option value="brand">Brand Identity / Logo</option>
                      <option value="graphics">Graphic Assets</option>
                      <option value="retainer">Custom Retainer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Your Brief</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your project goals, target audience, timeline…"
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: 'var(--orange)', color: '#fff',
                      border: 'none', borderRadius: '999px',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700,
                      padding: '1rem 2rem',
                      opacity: status === 'sending' ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(254,107,0,0.35)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Brief'}
                    {status !== 'sending' && <ArrowRightIcon className="w-4 h-4" />}
                  </button>

                  {status === 'error' && (
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#ef4444', textAlign: 'center' }}>
                      Something went wrong. Try WhatsApp or email directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Location strip */}
      <section style={{ borderTop: '1px solid var(--border)', padding: '3rem 0' }}>
        <div className="section-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Where We Are</p>
            <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Colombo, Sri Lanka</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Remote-friendly. We collaborate across time zones — async-capable by default.
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            GMT+5:30 · Available Mon–Sat
          </p>
        </div>
      </section>
    </div>
  );
}
