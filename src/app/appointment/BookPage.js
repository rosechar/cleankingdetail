'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GCheck } from '@/components/garage/Icons';
import HoneypotField from '@/components/forms/HoneypotField';

const VEHICLES = ['Car', 'SUV', 'Truck', 'Van'];

// Next `n` bookable days, starting tomorrow. Weekdays only — the shop is
// closed on weekends (keep in sync with site.hoursNote).
function useDates(n) {
  return useMemo(() => {
    const pad = (v) => String(v).padStart(2, '0');
    const out = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (out.length < n) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        out.push({
          key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
          dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
          md: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        });
      }
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, [n]);
}

export default function BookPage() {
  const dates = useDates(10);

  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
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

  const selectedPkg = packages.find((o) => o.name === form.pkg);
  const selectedDate = dates.find((d) => d.key === form.date);
  const dateLabel = selectedDate
    ? `${selectedDate.dow}, ${selectedDate.md}`
    : '';

  const submit = async (e) => {
    e.preventDefault();
    if (!form.pkg) return setErr('Please choose a package.');
    if (!form.vehicle) return setErr('Select your vehicle type.');
    if (!form.date) return setErr('Pick a date.');
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
              <Link className="ck-btn ck-btn-accent" href="/">
                Back to home
              </Link>
              <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
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
              <div className="bk-sech">
                <span className="bk-secn">01</span> Choose your package
              </div>
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
              <div className="bk-sech">
                <span className="bk-secn">02</span> Pick a day
              </div>
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
                <div className="bk-chiprow">
                  {dates.map((d) => (
                    <button
                      type="button"
                      key={d.key}
                      className={
                        'bk-chip' + (form.date === d.key ? ' sel' : '')
                      }
                      onClick={() => set('date', d.key)}
                    >
                      {d.dow}
                      <span className="sub">{d.md}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 03 details */}
            <div className="bk-sec">
              <div className="bk-sech">
                <span className="bk-secn">03</span> Your details
              </div>
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
                Send me occasional offers and detailing tips from Clean King. No
                spam — unsubscribe anytime.
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
