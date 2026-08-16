'use client';

import { useRef, useState } from 'react';
import { site } from '@/data/site';
import { faqs } from '@/data/faqs';
import { isEmail, isPhone } from '@/lib/validation';
import { GPin, GPhone, GCheck } from '@/components/garage/Icons';
import HoneypotField from '@/components/forms/HoneypotField';
import MapEmbed from '@/components/garage/MapEmbed';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import CtaBand from '@/components/ui/CtaBand';
import Eyebrow from '@/components/ui/Eyebrow';
import PageHero from '@/components/ui/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import { cn } from '@/components/ui/cn';

// 16px (not 15) so iOS Safari doesn't auto-zoom on focus.
const INPUT =
  'w-full border border-line-2 bg-canvas px-3.5 py-3.25 font-body text-base text-fg transition-colors focus:border-accent focus:outline-none';
const LABEL = 'font-mono text-xs uppercase tracking-label text-fg-3';
const FIELD = 'flex flex-col gap-1.75';
const SOCIAL =
  'border border-line-2 px-4 py-2.75 text-center font-mono text-xs uppercase tracking-label text-fg-2 transition-colors hover:border-accent hover:text-fg';

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
    company: '', // honeypot
  });
  const openedAt = useRef(Date.now());
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
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
          company: form.company,
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
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Come see
            <br />
            the King
          </>
        }
      />

      <section className="px-page pt-6 pb-section md:pt-9 lg:pt-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-11 lg:gap-18">
          <div>
            <Eyebrow>Details</Eyebrow>
            <h2 className="mt-3 font-display text-display-md uppercase">
              Reach the shop
            </h2>
            <div className="mt-7 flex flex-col">
              <InfoRow
                icon={<GPin className="size-4.5 fill-accent" />}
                label="Visit"
              >
                <div className="mt-1 text-base">
                  {site.address1}
                  <br />
                  {site.address2}
                </div>
              </InfoRow>
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
            <div className="mt-7 flex gap-3 max-sm:flex-col">
              <a
                className={SOCIAL}
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                className={SOCIAL}
                href={site.google}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Reviews
              </a>
            </div>
          </div>

          <div className="border border-line bg-surface p-6.5 md:p-8 lg:p-10.5">
            {!sent ? (
              <form onSubmit={submit} noValidate>
                <HoneypotField
                  id="ct-company"
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                />
                <h3 className="font-display text-display-sm uppercase">
                  Send a message
                </h3>
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
                  We&apos;ll get back to you at {form.phone} as soon as we can.
                </p>
                <div className="mt-7.5 flex flex-wrap justify-center gap-3.25">
                  <Button variant="ghost" href={site.phoneHref}>
                    Call {site.phone}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative mx-auto mt-8 h-70 max-w-6xl overflow-hidden border border-line md:mt-11 md:h-85 lg:mt-13 lg:h-105">
          <MapEmbed />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-page pb-section">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Good to know" title="FAQ" tight />
          <div className="border-t border-line">
            {faqs.map(({ id, question, answer }) => {
              const open = openFaq === id;
              return (
                <div key={id} className="border-b border-line">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-5 py-5.5 text-left font-display text-display-xs text-fg uppercase"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : id)}
                  >
                    {question}
                    <span
                      className={cn(
                        'relative size-5.5 shrink-0 before:absolute before:top-1/2 before:left-1/2 before:h-0.5 before:w-3.25 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-accent before:content-[""] after:absolute after:top-1/2 after:left-1/2 after:h-0.5 after:w-3.25 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-accent after:transition-transform after:duration-250 after:content-[""]',
                        open ? 'after:rotate-0' : 'after:rotate-90'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-[max-height] duration-300 ease-in-out',
                      open ? 'max-h-80' : 'max-h-0'
                    )}
                  >
                    <p className="max-w-190 pr-10 pb-6 text-base leading-relaxed text-fg-2">
                      {answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Gift certificates available"
        title={
          <>
            Ready when
            <br />
            you are
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
