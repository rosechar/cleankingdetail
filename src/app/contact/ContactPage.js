'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { site } from '@/data/site';
import { faqs } from '@/data/faqs';
import { GPin, GPhone, GCheck } from '@/components/garage/Icons';

export const ContactPage = () => {
  const [c, setC] = useState({
    name: '',
    phone: '',
    email: '',
    msg: '',
    optIn: false,
    company: '', // honeypot — hidden from humans, bots auto-fill it
  });
  const openedAt = useRef(Date.now());
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const set = (k, v) => setC((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!c.name.trim()) return setErr('Please enter your name.');
    if (!/[0-9]{7,}/.test(c.phone.replace(/\D/g, '')))
      return setErr('Enter a valid phone number.');

    setErr('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: c.name,
          phone: c.phone,
          email: c.email,
          message: c.msg,
          optIn: c.optIn,
          company: c.company,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSent(true);
    } catch {
      setErr('Something went wrong sending your message. Please call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Contact
          </div>
          <div className="ck-eyebrow">Get in touch</div>
          <h1>
            Come see
            <br />
            the King
          </h1>
          <p className="lead">
            Questions, quotes, or gift certificates — call, message, or stop by
            the shop in Blissfield. We&apos;re a family-owned crew and
            we&apos;ll get right back to you.
          </p>
        </div>
      </section>

      <section className="ct">
        <div className="ct-grid">
          <div className="ct-info">
            <div className="ck-eyebrow">Details</div>
            <h2>Reach the shop</h2>
            <div className="ct-rows">
              <div className="ct-row">
                <div className="ic">
                  <GPin />
                </div>
                <div>
                  <div className="k">Visit</div>
                  <div className="v">
                    {site.address1}
                    <br />
                    {site.address2}
                  </div>
                </div>
              </div>
              <div className="ct-row">
                <div className="ic">
                  <GPhone />
                </div>
                <div>
                  <div className="k">Call or text</div>
                  <div className="v">
                    <a href={site.phoneHref}>{site.phone}</a>
                  </div>
                </div>
              </div>
              <div className="ct-row">
                <div className="ic">
                  <GCheck
                    style={{ stroke: 'var(--accent)', strokeWidth: 2.4 }}
                  />
                </div>
                <div>
                  <div className="k">Hours</div>
                  <div className="v">{site.hoursNote}</div>
                </div>
              </div>
              <div className="ct-row">
                <div className="ic">
                  <GPin />
                </div>
                <div>
                  <div className="k">Proudly serving</div>
                  <div className="ct-chips">
                    {site.areas.map((a) => (
                      <span key={a}>{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ct-social">
              <a href={site.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href={site.google} target="_blank" rel="noopener noreferrer">
                Google Reviews
              </a>
            </div>
          </div>

          <div className="ct-form">
            {!sent ? (
              <form onSubmit={submit} noValidate>
                {/* honeypot — visually hidden, real visitors never fill this */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  <label htmlFor="ct-company">Company</label>
                  <input
                    id="ct-company"
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={c.company}
                    onChange={(e) => set('company', e.target.value)}
                  />
                </div>
                <h3>Send a message</h3>
                <p className="note">
                  Tell us what your vehicle needs and we&apos;ll follow up with
                  a quote or a time.
                </p>
                <div className="ct-fields">
                  <div className="bk-field">
                    <label>Name</label>
                    <input
                      className="bk-input"
                      value={c.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="bk-field">
                    <label>Phone</label>
                    <input
                      className="bk-input"
                      value={c.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="(517) 000-0000"
                    />
                  </div>
                  <div className="bk-field full">
                    <label>Email (optional)</label>
                    <input
                      className="bk-input"
                      value={c.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="bk-field full">
                    <label>Message</label>
                    <textarea
                      className="bk-input"
                      value={c.msg}
                      onChange={(e) => set('msg', e.target.value)}
                      placeholder="I'd like a quote for a Full Detail on my SUV…"
                    />
                  </div>
                </div>
                <label className="bk-optin">
                  <input
                    type="checkbox"
                    checked={c.optIn}
                    onChange={(e) => set('optIn', e.target.checked)}
                  />
                  Send me occasional offers and detailing tips from Clean King.
                  No spam — unsubscribe anytime.
                </label>
                {err && <div className="bk-err">{err}</div>}
                <div className="ct-nav">
                  <Link className="ct-back" href="/appointment">
                    Or book online →
                  </Link>
                  <button
                    className="ck-btn ck-btn-accent"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bk-done" style={{ padding: '20px 0' }}>
                <div className="mark">
                  <GCheck />
                </div>
                <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)' }}>
                  Message sent
                </h2>
                <p>
                  Thanks, {c.name.split(' ')[0] || 'there'}! We&apos;ll get back
                  to you at {c.phone} as soon as we can.
                </p>
                <div className="row">
                  <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
                    Call {site.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="ct-map">
          <iframe
            src={site.mapEmbed}
            title="Map to Clean King Detailing, 610 W Adrian St, Blissfield MI"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="ck-faq">
        <div className="inner">
          <div className="garage-sh">
            <div>
              <div className="ck-eyebrow">Good to know</div>
              <h2>FAQ</h2>
            </div>
            <p>
              A few common questions. Still unsure? Call {site.phone} and
              we&apos;ll help.
            </p>
          </div>
          <div className="ck-faq-list">
            {faqs.map(({ id, question, answer }) => (
              <div
                key={id}
                className={'ck-faq-item' + (openFaq === id ? ' open' : '')}
              >
                <button
                  type="button"
                  className="ck-faq-q"
                  aria-expanded={openFaq === id}
                  onClick={() => setOpenFaq(openFaq === id ? null : id)}
                >
                  {question}
                  <span className="ico" aria-hidden="true" />
                </button>
                <div className="ck-faq-a">
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="garage-cta">
        <div className="ck-eyebrow" style={{ color: 'var(--accent)' }}>
          Gift certificates available
        </div>
        <h2 style={{ marginTop: 16 }}>
          Ready when
          <br />
          you are
        </h2>
        <div className="row">
          <Link className="ck-btn ck-btn-accent" href="/appointment">
            Book Appointment
          </Link>
          <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
