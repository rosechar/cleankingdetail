'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { site, packages } from '@/data/site';
import { GCheck } from '@/components/garage/Icons';
import HoneypotField from '@/components/forms/HoneypotField';
import DateField from '@/components/forms/DateField';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import PageHero from '@/components/ui/PageHero';
import { cn } from '@/components/ui/cn';

const SECTION = 'px-page pt-9 pb-section md:pt-12 lg:pt-16';
const CARD = 'border border-line bg-surface';
const FIELDSET =
  'border-t border-line py-6.5 first:border-t-0 first:pt-0 md:py-8 lg:py-10';
const LABEL = 'font-mono text-xs uppercase tracking-label text-fg-3';
// 16px font is deliberate: iOS Safari auto-zooms on smaller inputs.
const INPUT =
  'w-full border border-line-2 bg-canvas px-3.5 py-3.25 text-base text-fg transition-colors focus:border-accent focus:outline-none';

const VEHICLES = ['Car', 'SUV', 'Truck', 'Van'];

const pad = (v) => String(v).padStart(2, '0');
const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const isWeekend = (iso) => {
  const day = new Date(`${iso}T00:00:00`).getDay();
  return day === 0 || day === 6;
};

export default function BookPage() {
  // Bookable window: tomorrow through one month out. Weekdays only — the shop
  // is closed weekends, enforced on selection because native date inputs can't
  // disable specific weekdays.
  const { minDate, maxDate } = useMemo(() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);
    // Skip to the next bookable weekday — the shop is closed weekends.
    while (min.getDay() === 0 || min.getDay() === 6) {
      min.setDate(min.getDate() + 1);
    }
    const max = new Date();
    max.setDate(max.getDate() + 30);
    return { minDate: toISO(min), maxDate: toISO(max) };
  }, []);

  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dateWarn, setDateWarn] = useState(false);
  const [form, setForm] = useState({
    pkg: '',
    vehicle: '',
    date: '',
    name: '',
    phone: '',
    email: '',
    makeModel: '',
    notes: '',
    optIn: true,
    company: '', // honeypot
  });
  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErr('');
  };
  const onDateChange = (value) => {
    if (value && isWeekend(value)) {
      setForm((prev) => ({ ...prev, date: '' }));
      setDateWarn(true);
      return;
    }
    setDateWarn(false);
    set('date', value);
  };
  const openedAt = useRef(Date.now());

  // Optional ?pkg= preselect (matches package by id or name, case-insensitive).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('pkg');
    if (!p) return;
    const match = packages.find(
      (o) => o.name.toLowerCase() === p.toLowerCase() || o.id === p
    );
    if (match) setForm((prev) => ({ ...prev, pkg: match.name }));
  }, []);

  // Default to the first bookable weekday. Set client-side (not in initial
  // state) so the prerendered HTML stays empty and hydration always matches.
  useEffect(() => {
    setForm((prev) => (prev.date ? prev : { ...prev, date: minDate }));
  }, [minDate]);

  const selectedPkg = packages.find((o) => o.name === form.pkg);
  const dateLabel = form.date
    ? new Date(`${form.date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const submit = async (e) => {
    e.preventDefault();
    if (!form.pkg) return setErr('Please choose a package.');
    if (!form.vehicle) return setErr('Select your vehicle type.');
    if (!form.date) return setErr('Pick a date.');
    if (isWeekend(form.date))
      return setErr("We're closed weekends — please choose a weekday.");
    if (!form.name.trim()) return setErr('Please enter your name.');
    if (form.phone.replace(/\D/g, '').length < 7)
      return setErr('Enter a valid phone number.');

    setErr('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pkg: form.pkg,
          price: selectedPkg ? selectedPkg.price : '',
          vehicle: form.vehicle,
          date: dateLabel || form.date,
          name: form.name,
          phone: form.phone,
          email: form.email,
          makeModel: form.makeModel,
          notes: form.notes,
          optIn: form.optIn,
          company: form.company,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setDone(true);
    } catch {
      setErr('Something went wrong sending your request. Please call us.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section className={SECTION}>
        <div className="mx-auto max-w-4xl">
          <div className={cn(CARD, 'py-7.5 text-center md:py-11 lg:py-15')}>
            <div className="inline-flex size-16.5 items-center justify-center rounded-full bg-accent">
              <GCheck className="size-8 text-on-accent" strokeWidth={2.6} />
            </div>
            <h2 className="mt-6.5 font-display text-display-lg uppercase">
              Request received
            </h2>
            <p className="mx-auto mt-3.5 max-w-115 text-base text-fg-2">
              Thanks, {form.name.split(' ')[0] || 'there'}! We&apos;ve got your
              request for a <b>{form.pkg}</b> on <b>{dateLabel}</b>. We&apos;ll
              call {form.phone} shortly to confirm your spot.
            </p>
            <div className="mt-7.5 flex flex-wrap justify-center gap-3.25">
              <Button variant="accent" href={site.phoneHref}>
                Call {site.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Online Booking"
        title={
          <>
            Book your
            <br />
            appointment
          </>
        }
        lead="Fill out the details below and we'll take care of the rest. No payment now — we'll call to confirm your spot."
      />

      <section className={SECTION}>
        <div className="mx-auto max-w-4xl">
          <form
            className={cn(CARD, 'p-6.5 md:p-9 lg:p-11.5')}
            onSubmit={submit}
            noValidate
          >
            <HoneypotField
              id="bk-company"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
            />

            {/* 01 package */}
            <div className={FIELDSET}>
              <Eyebrow>Choose your package</Eyebrow>
              <div className="mt-5.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {packages.map((o) => (
                  <button
                    type="button"
                    key={o.id}
                    className={cn(
                      'flex min-h-23 cursor-pointer flex-col justify-between gap-2.5 border bg-canvas px-4.25 py-4 text-left transition-colors duration-150',
                      form.pkg === o.name
                        ? 'border-accent inset-ring inset-ring-accent'
                        : 'border-line-2 hover:border-fg-3'
                    )}
                    onClick={() => set('pkg', o.name)}
                  >
                    <span className="font-display text-lg leading-none uppercase">
                      {o.name}
                    </span>
                    <span className="font-display text-2xl leading-none text-accent">
                      {o.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 02 schedule */}
            <div className={FIELDSET}>
              <Eyebrow>Pick a day</Eyebrow>
              <div className="mt-5.5">
                <div className={cn(LABEL, 'mb-3')}>Vehicle type</div>
                <div className="flex flex-wrap gap-2.5">
                  {VEHICLES.map((v) => (
                    <button
                      type="button"
                      key={v}
                      className={cn(
                        'cursor-pointer border px-4.25 py-2.75 text-sm transition-all duration-150',
                        form.vehicle === v
                          ? 'border-accent bg-accent font-semibold text-on-accent'
                          : 'border-line-2 bg-canvas text-fg-2 hover:border-fg-3 hover:text-fg'
                      )}
                      onClick={() => set('vehicle', v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5.5">
                <div className={cn(LABEL, 'mb-3')}>Date</div>
                <DateField
                  value={form.date}
                  min={minDate}
                  max={maxDate}
                  onChange={onDateChange}
                />
                {dateWarn && (
                  <p className="mt-2.5 font-mono text-xs tracking-wider text-accent">
                    Weekdays only — we&apos;re closed weekends.
                  </p>
                )}
              </div>
            </div>

            {/* 03 details */}
            <div className={FIELDSET}>
              <Eyebrow>Your details</Eyebrow>
              <div className="mt-5.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.75">
                  <label className={LABEL}>Full name</label>
                  <input
                    className={INPUT}
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="flex flex-col gap-1.75">
                  <label className={LABEL}>Phone</label>
                  <input
                    className={INPUT}
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="(517) 000-0000"
                  />
                </div>
                <div className="flex flex-col gap-1.75">
                  <label className={LABEL}>Email (optional)</label>
                  <input
                    className={INPUT}
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@email.com"
                  />
                </div>
                <div className="flex flex-col gap-1.75">
                  <label className={LABEL}>Vehicle make &amp; model</label>
                  <input
                    className={INPUT}
                    value={form.makeModel}
                    onChange={(e) => set('makeModel', e.target.value)}
                    placeholder="Ford Explorer"
                  />
                </div>
                <div className="flex flex-col gap-1.75 sm:col-span-2">
                  <label className={LABEL}>
                    Anything we should know? (optional)
                  </label>
                  <textarea
                    className={cn(INPUT, 'min-h-23 resize-y')}
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Pet hair, heavy mud, specific stains…"
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
            </div>

            {/* footer */}
            <div className="mt-7.5 flex flex-wrap items-center justify-between gap-4.5 border-t border-line pt-6.5">
              <div className="font-mono text-sm tracking-widest text-fg-3 uppercase">
                Estimated price{' '}
                <b className="relative top-1 ml-3.5 font-display text-3xl tracking-normal text-fg">
                  {selectedPkg ? selectedPkg.price : '—'}
                </b>
              </div>
              <Button
                variant="accent"
                type="submit"
                className="shrink-0"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send request'}
              </Button>
            </div>
            {err && (
              <div className="mt-3.5 text-sm font-medium text-accent">
                {err}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
