import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto" style={{ padding: '5rem 1.5rem' }}>
      <section style={{ marginBottom: '3rem' }}>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.75rem', color: 'var(--text)' }}>
          Privacy Policy
        </h1>
        <p className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
          Last updated: {new Date().toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '1.5rem' }}>
          We keep this simple. Here's what we collect, why, and what we do with it.
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>1. What We Collect</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            When you contact us through the contact form, WhatsApp, or email, we receive your name, contact details, and any project information you share. We only collect what you give us directly. We don't pull any extra data from your browser or device beyond what's needed for the site to function.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>2. How We Use It</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            We use your contact details to reply to your enquiry and manage your project. That's it. We don't add you to mailing lists, sell your data, or share it with third parties.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>3. Cookies & Tracking</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            This site doesn't use advertising cookies or any third-party tracking. The only thing stored locally on your device is your theme preference (dark or light mode), so the site remembers your choice next time you visit.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>4. Project Confidentiality</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            We treat all client information as confidential. We won't share project details, client names, or any work-in-progress with anyone outside the team. If you want to be sure, we're happy to sign an NDA — just ask before the project starts.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>5. Contact Us</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            If you have any questions about your data or this policy, email us at{' '}
            <a href="mailto:northstardevs1@gmail.com" style={{ color: 'var(--orange)', textDecoration: 'none' }}>northstardevs1@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
