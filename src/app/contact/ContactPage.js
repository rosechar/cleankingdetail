'use client';

import { useState } from 'react';
import Link from 'next/link';
import { site } from '@/data/site';
import { faqs } from '@/data/faqs';
import { HONEYPOT_FIELD } from '@/lib/honeypot';
import { isEmail, isPhone } from '@/lib/validation';
import {
  GPin,
  GPhone,
  GCheck,
  GFacebook,
  GGoogle,
} from '@/components/garage/Icons';
import HoneypotField from '@/components/forms/HoneypotField';
import MapEmbed from '@/components/garage/MapEmbed';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import CtaBand from '@/components/ui/CtaBand';
import Eyebrow from '@/components/ui/Eyebrow';
import Faq from '@/components/ui/Faq';
import { cn } from '@/components/ui/cn';
import { RISE, riseDelay } from '@/components/ui/rise';

// 16px (not 15) so iOS Safari doesn't auto-zoom on focus.
const INPUT =
  'w-full border border-line-2 bg-canvas px-3.5 py-3.25 font-body text-base text-fg transition-colors focus:border-accent focus:outline-none';
const LABEL = 'font-mono text-xs uppercase tracking-label text-fg-3';
const FIELD = 'flex flex-col gap-1.75';
// Icon-only social links, same treatment as the footer, just bigger.
const SOCIAL = 'text-fg-2 transition-colors hover:text-accent';
const SOCIAL_ICON = 'size-8 fill-current';

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex gap-4 border-t border-line py-5 last:border-b">
      <div className="flex size-10 shrink-0 items-center justify-center border border-line-2">
        {icon}
      </div>
      <div>
        <div className={LABEL}>{label}</div>
        {children}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    msg: '',
    optIn: false,
    honeypot: '',
  });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErr('');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setErr('Please enter your name.');
    if (!isPhone(form.phone)) return setErr('Enter a valid phone number.');
    if (form.email.trim() && !isEmail(form.email))
      return setErr('Enter a valid email address or leave it blank.');

    setErr('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.msg,
          optIn: form.optIn,
          [HONEYPOT_FIELD]: form.honeypot,
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
      {/* Hero: title on the left, map filling the right half (full height of
          the band) from md; on phones the map sits directly under the title,
          flush against the contact info below. */}
      <section className="relative border-b border-line md:grid md:grid-cols-2">
        {/* The left margin lines the text up with PageHero's centred
            max-w-7xl column on other sub-pages. */}
        <div className="px-page pt-6.5 pb-8.5 md:pt-9 md:pb-11 md:pl-[max(var(--spacing-page),calc((100vw-80rem)/2))] lg:pt-12 lg:pb-13.5">
          <Eyebrow className={RISE} style={riseDelay(0)}>
            Get in touch
          </Eyebrow>
          <h1
            className={cn('mt-4 font-display text-display-3xl uppercase', RISE)}
            style={riseDelay(1)}
          >
            Come see
            <br />
            the King
          </h1>
        </div>
        <div className="relative h-70 border-t border-line motion-safe:animate-fade-in motion-safe:opacity-0 md:h-auto md:min-h-90 md:border-t-0 md:border-l">
          <MapEmbed />
        </div>
      </section>

      <section className="px-page pb-section md:pt-9 lg:pt-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-11 lg:gap-18">
          <div>
            <div className="flex flex-col md:mt-7">
              <InfoRow
                icon={<GPhone className="size-4.5 fill-accent" />}
                label="Call or text"
              >
                <div className="mt-1 text-base">
                  <a
                    className="transition-colors hover:text-accent"
                    href={site.phoneHref}
                  >
                    {site.phone}
                  </a>
                </div>
              </InfoRow>
              <InfoRow
                icon={
                  <GCheck className="size-4.5 fill-accent stroke-accent stroke-2" />
                }
                label="Hours"
              >
                <div className="mt-1 text-base">{site.hoursNote}</div>
              </InfoRow>
              <InfoRow
                icon={<GPin className="size-4.5 fill-accent" />}
                label="Proudly serving"
              >
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {site.areas.map((a) => (
                    <Chip key={a}>{a}</Chip>
                  ))}
                </div>
              </InfoRow>
            </div>
            <div className="mt-7 flex gap-5">
              <a
                className={SOCIAL}
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Clean King on Facebook"
              >
                <GFacebook className={SOCIAL_ICON} aria-hidden="true" />
              </a>
              <a
                className={SOCIAL}
                href={site.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Clean King reviews on Google"
              >
                <GGoogle className={SOCIAL_ICON} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="border border-line bg-surface p-6.5 md:p-8 lg:p-10.5">
            {!sent ? (
              <form onSubmit={submit} noValidate>
                <HoneypotField
                  id="ct-hp"
                  value={form.honeypot}
                  onChange={(e) => set('honeypot', e.target.value)}
                />
                <h2 className="font-display text-display-sm uppercase">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-fg-2">
                  Tell us what your vehicle needs and we&apos;ll follow up with
                  a quote or a time.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className={FIELD}>
                    <label htmlFor="ct-name" className={LABEL}>
                      Name
                    </label>
                    <input
                      id="ct-name"
                      className={INPUT}
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Jane Doe"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className={FIELD}>
                    <label htmlFor="ct-phone" className={LABEL}>
                      Phone
                    </label>
                    <input
                      id="ct-phone"
                      className={INPUT}
                      type="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="(517) 000-0000"
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <div className={cn(FIELD, 'sm:col-span-2')}>
                    <label htmlFor="ct-email" className={LABEL}>
                      Email (optional)
                    </label>
                    <input
                      id="ct-email"
                      className={INPUT}
                      type="email"
                      inputMode="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className={cn(FIELD, 'sm:col-span-2')}>
                    <label htmlFor="ct-message" className={LABEL}>
                      Message
                    </label>
                    <textarea
                      id="ct-message"
                      className={cn(INPUT, 'min-h-23 resize-y')}
                      value={form.msg}
                      onChange={(e) => set('msg', e.target.value)}
                      placeholder="I'd like a quote for a Full Detail on my SUV…"
                    />
                  </div>
                </div>
                <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-sm leading-normal text-fg-3">
                  <input
                    className="mt-0.5 size-4 shrink-0 cursor-pointer accent-accent"
                    type="checkbox"
                    checked={form.optIn}
                    onChange={(e) => set('optIn', e.target.checked)}
                  />
                  Send me occasional offers and detailing tips from Clean King.
                </label>
                {err && (
                  <p
                    className="mt-3.5 text-sm font-medium text-accent"
                    role="alert"
                  >
                    {err}
                  </p>
                )}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                  <Button variant="accent" type="submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Send message'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="py-5 text-center">
                <div className="inline-flex size-16.5 items-center justify-center rounded-full bg-accent">
                  <GCheck className="size-8 fill-none stroke-on-accent stroke-3" />
                </div>
                <h2 className="mt-6.5 font-display text-display-md uppercase">
                  Message sent
                </h2>
                <p className="mx-auto mt-3.5 max-w-115 text-base text-fg-2">
                  Thanks, {form.name.trim().split(/\s+/)[0] || 'there'}!
                  We&apos;ll get back to you at {form.phone} — usually within an
                  hour during shop hours ({site.hoursNote}). Need an answer
                  right now? Give us a call.
                </p>
                <div className="mt-7.5 flex flex-wrap justify-center gap-3.25">
                  <Button variant="accent" href="/appointment">
                    Book an appointment
                  </Button>
                  <Button variant="ghost" href={site.phoneHref}>
                    Call {site.phone}
                  </Button>
                </div>
                <p className="mt-6 text-sm text-fg-3">
                  <Link href="/" className="transition-colors hover:text-fg">
                    ← Back to home
                  </Link>
                  <span className="mx-2.5" aria-hidden="true">
                    ·
                  </span>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-fg"
                  >
                    Browse services &amp; pricing
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-page pb-section">
        <Faq items={faqs} />
      </section>

      <CtaBand
        eyebrow="Gift certificates available"
        title={
          <>
            Ready to
            <br />
            get clean?
          </>
        }
      >
        <Button variant="accent" href="/appointment">
          Book Appointment
        </Button>
        <Button variant="ghost" href={site.phoneHref}>
          {site.phone}
        </Button>
      </CtaBand>
    </>
  );
}
