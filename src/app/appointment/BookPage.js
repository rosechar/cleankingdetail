'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GCheck } from '@/components/garage/Icons';

const VEHICLES = ['Car', 'SUV', 'Truck', 'Van'];

// Next `n` bookable days, skipping Sundays, starting tomorrow.
function useDates(n) {
  return useMemo(() => {
    const out = [];
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (out.length < n) {
      if (d.getDay() !== 0) {
        out.push({
          key: d.toISOString().slice(0, 10),
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
  const [f, setF] = useState({
    pkg: '',
    vehicle: '',
    date: '',
    name: '',
    phone: '',
    email: '',
    makeModel: '',
    notes: '',
    optIn: false,
    company: '', // honeypot — hidden from humans, bots auto-fill it
  });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const openedAt = useRef(Date.now());

  // Optional ?pkg= preselect (matches package by name, case-insensitive).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('pkg');
    if (!p) return;
    const match = packages.find(
      (o) => o.name.toLowerCase() === p.toLowerCase() || o.id === p
    );
    if (match) setF((prev) => ({ ...prev, pkg: match.name }));
  }, []);

  const sel = packages.find((o) => o.name === f.pkg);
  const dateLabel = dates.find((d) => d.key === f.date);

  const submit = async (e) => {
    e.preventDefault();
    if (!f.pkg) return setErr('Please choose a package.');
    if (!f.vehicle) return setErr('Select your vehicle type.');
    if (!f.date) return setErr('Pick a date.');
    if (!f.name.trim()) return setErr('Please enter your name.');
    if (!/[0-9]{7,}/.test(f.phone.replace(/\D/g, '')))
      return setErr('Enter a valid phone number.');

    setErr('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pkg: f.pkg,
          price: sel ? sel.price : '',
          vehicle: f.vehicle,
          date: dateLabel ? `${dateLabel.dow}, ${dateLabel.md}` : f.date,
          name: f.name,
          phone: f.phone,
          email: f.email,
          makeModel: f.makeModel,
          notes: f.notes,
          optIn: f.optIn,
          company: f.company,
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
              Thanks, {f.name.split(' ')[0] || 'there'}! We&apos;ve got your
              request for a <b>{f.pkg}</b> on{' '}
              <b>{dateLabel ? `${dateLabel.dow}, ${dateLabel.md}` : ''}</b>.
              We&apos;ll call {f.phone} shortly to confirm your spot.
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
              <label htmlFor="bk-company">Company</label>
              <input
                id="bk-company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={f.company}
                onChange={(e) => set('company', e.target.value)}
              />
            </div>

            {/* 01 package */}
            <div className="bk-sec">
              <div className="bk-sech">
                <span className="bk-secn">01</span> Choose your package
              </div>
              <div className="bk-pgrid">
                {packages.map((o) => (
                  <button
                    type="button"
                    key={o.name}
                    className={'bk-ptile' + (f.pkg === o.name ? ' sel' : '')}
                    onClick={() => {
                      set('pkg', o.name);
                      setErr('');
                    }}
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
                      className={'bk-chip' + (f.vehicle === v ? ' sel' : '')}
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
                      className={'bk-chip' + (f.date === d.key ? ' sel' : '')}
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
                    value={f.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="bk-field">
                  <label>Phone</label>
                  <input
                    className="bk-input"
                    value={f.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="(517) 000-0000"
                  />
                </div>
                <div className="bk-field">
                  <label>Email (optional)</label>
                  <input
                    className="bk-input"
                    value={f.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="you@email.com"
                  />
                </div>
                <div className="bk-field">
                  <label>Vehicle make &amp; model</label>
                  <input
                    className="bk-input"
                    value={f.makeModel}
                    onChange={(e) => set('makeModel', e.target.value)}
                    placeholder="Ford Explorer"
                  />
                </div>
                <div className="bk-field full">
                  <label>Anything we should know? (optional)</label>
                  <textarea
                    className="bk-input"
                    value={f.notes}
                    onChange={(e) => set('notes', e.target.value)}
                    placeholder="Pet hair, heavy mud, specific stains…"
                  />
                </div>
              </div>
              <label className="bk-optin">
                <input
                  type="checkbox"
                  checked={f.optIn}
                  onChange={(e) => set('optIn', e.target.checked)}
                />
                Send me occasional offers and detailing tips from Clean King. No
                spam — unsubscribe anytime.
              </label>
            </div>

            {/* footer */}
            <div className="bk-foot">
              <div className="bk-total">
                Estimated price <b>{sel ? sel.price : '—'}</b>
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
