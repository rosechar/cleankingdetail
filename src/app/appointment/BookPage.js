'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GCheck } from '@/components/garage/Icons';
import HoneypotField from '@/components/forms/HoneypotField';
import DateField from '@/components/forms/DateField';

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
      <section className="bk">
        <div className="bk-wrap">
          <div className="bk-card bk-done">
            <div className="mark">
              <GCheck />
            </div>
            <h2>Request received</h2>
            <p>
              Thanks, {form.name.split(' ')[0] || 'there'}! We&apos;ve got your
              request for a <b>{form.pkg}</b> on <b>{dateLabel}</b>. We&apos;ll
              call {form.phone} shortly to confirm your spot.
            </p>
            <div className="row">
              <a className="ck-btn ck-btn-accent" href={site.phoneHref}>
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Book
          </div>
          <div className="ck-eyebrow">Online Booking</div>
          <h1>
            Book your
            <br />
            appointment
          </h1>
          <p className="lead">
            Fill out the details below and we&apos;ll take care of the rest. No
            payment now — we&apos;ll call to confirm your spot.
          </p>
        </div>
      </section>

      <section className="bk">
        <div className="bk-wrap">
          <form className="bk-card" onSubmit={submit} noValidate>
            <HoneypotField
              id="bk-company"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
            />

            {/* 01 package */}
            <div className="bk-sec">
              <div className="bk-sech">Choose your package</div>
              <div className="bk-pgrid">
                {packages.map((o) => (
                  <button
                    type="button"
                    key={o.id}
                    className={'bk-ptile' + (form.pkg === o.name ? ' sel' : '')}
                    onClick={() => set('pkg', o.name)}
                  >
                    <span className="nm">{o.name}</span>
                    <span className="pr">{o.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 02 schedule */}
            <div className="bk-sec">
              <div className="bk-sech">Pick a day</div>
              <div className="bk-grp">
                <div className="gl">Vehicle type</div>
                <div className="bk-chiprow">
                  {VEHICLES.map((v) => (
                    <button
                      type="button"
                      key={v}
                      className={'bk-chip' + (form.vehicle === v ? ' sel' : '')}
                      onClick={() => set('vehicle', v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bk-grp">
                <div className="gl">Date</div>
                <DateField
                  value={form.date}
                  min={minDate}
                  max={maxDate}
                  onChange={onDateChange}
                />
                {dateWarn && (
                  <p className="bk-hint">
                    Weekdays only — we&apos;re closed weekends.
                  </p>
                )}
              </div>
            </div>

            {/* 03 details */}
            <div className="bk-sec">
              <div className="bk-sech">Your details</div>
              <div className="bk-fields">
                <div className="bk-field">
                  <label>Full name</label>
                  <input
                    className="bk-input"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="bk-field">
                  <label>Phone</label>
                  <input
                    className="bk-input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="(517) 000-0000"
                  />
                </div>
                <div className="bk-field">
                  <label>Email (optional)</label>
                  <input
                    className="bk-input"
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@email.com"
                  />
                </div>
                <div className="bk-field">
                  <label>Vehicle make &amp; model</label>
                  <input
                    className="bk-input"
                    value={form.makeModel}
                    onChange={(e) => set('makeModel', e.target.value)}
                    placeholder="Ford Explorer"
                  />
                </div>
                <div className="bk-field full">
                  <label>Anything we should know? (optional)</label>
                  <textarea
                    className="bk-input"
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Pet hair, heavy mud, specific stains…"
                  />
                </div>
              </div>
              <label className="bk-optin">
                <input
                  type="checkbox"
                  checked={form.optIn}
                  onChange={(e) => set('optIn', e.target.checked)}
                />
                Send me occasional offers and detailing tips from Clean King.
              </label>
            </div>

            {/* footer */}
            <div className="bk-foot">
              <div className="bk-total">
                Estimated price <b>{selectedPkg ? selectedPkg.price : '—'}</b>
              </div>
              <button
                className="ck-btn ck-btn-accent"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send request'}
              </button>
            </div>
            {err && (
              <div className="bk-err" style={{ marginTop: 14 }}>
                {err}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
