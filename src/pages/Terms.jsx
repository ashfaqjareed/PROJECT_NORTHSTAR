import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto" style={{ padding: '5rem 1.5rem' }}>
      <section style={{ marginBottom: '3rem' }}>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.75rem', color: 'var(--text)' }}>
          Terms of Service
        </h1>
        <p className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
          Last updated: {new Date().toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '1.5rem' }}>
          By hiring NorthStarDevs or using this website, you agree to the terms below. Please read them — they're short and written in plain language.
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>1. What We Do</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            NorthStarDevs is a Sri Lanka-based web development studio. We build websites, landing pages, full-stack web apps, logos, social media content, and related digital products. The exact scope of any project is confirmed in writing before work begins — either via WhatsApp, email, or a written brief.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>2. Payments & Deposits</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            We require a <strong style={{ color: 'var(--text)' }}>50% upfront deposit</strong> before any work begins. The remaining 50% is due when the project is fully completed and delivered. We do not release the final source code, files, or deploy to production until the full balance is cleared. For monthly retainers, the full monthly amount is due at the start of each billing period.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>3. Revisions</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Each plan includes a set number of revision rounds as specified in the pricing page. A revision round means going back and making changes to what was already built based on your feedback. Changes that go outside the original brief are considered new scope and quoted separately before proceeding.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>4. Ownership & Files</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Once the final payment is received, full ownership of the code and design files transfers to you. We retain the right to show the project in our portfolio unless you ask us not to in writing. If a Non-Disclosure Agreement (NDA) is required, let us know before the project starts.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>5. Bug Fixes & Support</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            We fix bugs caused by our own code at no extra charge for 30 days after delivery (or the support period stated in your plan). This does not cover issues caused by third-party services going down, hosting problems, or changes made by someone else after delivery.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>6. Cancellation</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            If you cancel a project after work has started, the deposit is non-refundable. If we cancel (which we won't do without a serious reason), we refund any payment for work not yet done. Either party can end a retainer agreement with 14 days' written notice.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text)' }}>7. Contact</h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            If you have questions about these terms, reach us at{' '}
            <a href="mailto:northstardevs1@gmail.com" style={{ color: 'var(--orange)', textDecoration: 'none' }}>northstardevs1@gmail.com</a>{' '}
            or on WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
}
