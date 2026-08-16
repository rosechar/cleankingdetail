'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { findPackage, site } from '@/data/site';
import { isEmail, isPhone } from '@/lib/validation';
import {
  bookingPackages,
  DEFAULT_PACKAGE_ID,
  DROP_OFF_NOTE,
  formatDayLong,
  isPriceRange,
  nextWeekdays,
  OPT_IN_LABEL,
  STEP_TITLES,
  VEHICLES,
} from '@/data/booking';
import { CalendarCheck, CarFront } from 'lucide-react';
import { GArrow } from '@/components/garage/Icons';
import HoneypotField from '@/components/forms/HoneypotField';
import Stars from '@/components/ui/Stars';
import { cn } from '@/components/ui/cn';

/* ------------------------------------------------------------------ */
/*  Style constants (design values × the "large" 1.15 content scale)   */
/* ------------------------------------------------------------------ */

// Section eyebrow ("Choose your package", "Pick a day"…) — the site's mono label.
const LABEL = 'font-mono text-xs tracking-label text-fg-3 uppercase';
// Inputs are 16px+ so iOS Safari never auto-zooms; border turns accent on focus.
const INPUT =
  'w-full border border-line-2 bg-surface px-4.5 text-[17px] text-fg transition-colors focus:border-accent focus:outline-none';
const FIELD = cn(INPUT, 'h-14 lg:h-15');
// Key/value rows inside the summary panels.
const ROW = 'flex justify-between gap-4 text-base';
const ROW_KEY = 'text-fg-3';
const ROW_VAL = 'text-right font-semibold text-fg';

const CHECK_PATH = (
  <path
    d="M2 6.5l2.5 2.5L10 3"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

/** Tiny 12×12 check used inside radios, step dots and the opt-in box. */
function Tick({ className }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      {CHECK_PATH}
    </svg>
  );
}

function SectionLabel({ className, children }) {
  return <div className={cn(LABEL, className)}>{children}</div>;
}

/** Desktop-only step heading (the mobile header carries the title instead). */
function StepHeading({ children }) {
  return (
    <h2 className="mb-2 hidden font-display text-display-md text-fg uppercase lg:block">
      {children}
    </h2>
  );
}

/** Accent primary button with the disabled state from the design. */
function PrimaryButton({ disabled, className, children, ...rest }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-body font-semibold transition-opacity',
        disabled
          ? 'cursor-not-allowed bg-[#34343a] text-[#7a766f]'
          : 'cursor-pointer bg-accent text-on-accent hover:opacity-90',
        className
      )}
      {...rest}
    >
      {children}
      <GArrow className="size-4 shrink-0 stroke-2" aria-hidden="true" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Steps                                                              */
/* ------------------------------------------------------------------ */

function PackageStep({ value, onChange }) {
  return (
    <div>
      <StepHeading>Choose your package</StepHeading>
      <SectionLabel className="mb-3.5">Choose your package</SectionLabel>
      <div
        role="radiogroup"
        aria-label="Package"
        className="flex flex-col gap-6 lg:grid lg:grid-cols-2"
      >
        {bookingPackages.map((p) => {
          const sel = p.id === value;
          return (
            <button
              type="button"
              key={p.id}
              role="radio"
              aria-checked={sel}
              onClick={() => onChange(p.id)}
              className={cn(
                'relative flex w-full cursor-pointer border bg-surface p-4.5 text-left transition-[border-color,box-shadow] duration-150',
                sel
                  ? 'border-accent shadow-[0_8px_22px_rgba(216,53,46,0.16)] inset-ring inset-ring-accent'
                  : 'border-line hover:border-line-2'
              )}
            >
              {p.popular && (
                <span className="absolute -top-2 left-4.5 bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-on-accent uppercase">
                  Most popular
                </span>
              )}
              <span className="flex w-full items-center justify-between gap-3">
                <span className="font-display text-xl leading-none text-fg uppercase">
                  {p.name}
                </span>
                <span className="flex items-center gap-3">
                  <span className="font-display text-2xl leading-none whitespace-nowrap text-fg">
                    {p.price}
                  </span>
                  <span
                    className={cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-full',
                      sel
                        ? 'bg-accent text-on-accent'
                        : 'border-[1.5px] border-line-2'
                    )}
                    aria-hidden="true"
                  >
                    {sel && <Tick className="size-3.25" />}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VehicleStep({ form, set }) {
  return (
    <div>
      <StepHeading>Tell us about your vehicle</StepHeading>
      <SectionLabel className="mb-3.5">Vehicle type</SectionLabel>
      <div
        role="radiogroup"
        aria-label="Vehicle type"
        className="grid grid-cols-2 gap-3 lg:max-w-150 lg:grid-cols-4 lg:gap-3.5"
      >
        {VEHICLES.map((v) => {
          const sel = v === form.vehicle;
          return (
            <button
              type="button"
              key={v}
              role="radio"
              aria-checked={sel}
              onClick={() => set('vehicle', v)}
              className={cn(
                'flex h-16 cursor-pointer items-center justify-center border bg-surface text-fg transition-colors duration-150',
                sel
                  ? 'border-accent inset-ring inset-ring-accent'
                  : 'border-line hover:border-line-2'
              )}
            >
              <span className="text-base font-bold">{v}</span>
            </button>
          );
        })}
      </div>

      <label htmlFor="bk-make" className={cn(LABEL, 'mt-8.5 mb-3.5 block')}>
        Make &amp; model
      </label>
      <input
        id="bk-make"
        className={cn(FIELD, 'lg:max-w-150')}
        value={form.makeModel}
        onChange={(e) => set('makeModel', e.target.value)}
        placeholder="e.g. Ford Explorer"
        autoComplete="off"
      />

      <label htmlFor="bk-notes" className={cn(LABEL, 'mt-8.5 mb-3.5 block')}>
        Optional details
      </label>
      <textarea
        id="bk-notes"
        className={cn(
          INPUT,
          'min-h-28 resize-none px-4.5 py-3.75 leading-normal lg:max-w-150'
        )}
        value={form.notes}
        onChange={(e) => set('notes', e.target.value)}
        placeholder="Anything we should know? Pet hair, heavy mud, specific stains…"
      />
    </div>
  );
}

function DayChip({ day, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${day.dow} ${day.month} ${day.day}`}
      onClick={onSelect}
      className={cn(
        'flex w-17 flex-none cursor-pointer flex-col items-center justify-center border py-3 text-fg transition-colors duration-150 lg:w-20 lg:py-3.5',
        selected
          ? 'border-accent bg-accent text-on-accent'
          : 'border-line bg-surface hover:border-line-2'
      )}
    >
      <span className="text-xs opacity-70 lg:text-sm">{day.dow}</span>
      <span className="mt-0.5 font-display text-2xl leading-none lg:mt-1 lg:text-[26px]">
        {day.day}
      </span>
      <span className="mt-px text-[11px] opacity-60 lg:text-xs">
        {day.month}
      </span>
    </button>
  );
}

function DetailsStep({ form, set, days, summary }) {
  return (
    <div>
      <StepHeading>Pick a day &amp; your details</StepHeading>
      <SectionLabel className="mb-3.5">Pick a day</SectionLabel>
      <div
        role="radiogroup"
        aria-label="Day"
        className="-mx-5.5 flex gap-2.5 overflow-x-auto px-5.5 pb-3 lg:mx-0 lg:gap-3.5 lg:px-0 lg:pb-3.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-line-2 [&::-webkit-scrollbar-track]:bg-line"
      >
        {days.map((day, i) => (
          <DayChip
            key={day.iso}
            day={day}
            selected={form.dayIdx === i}
            onSelect={() => set('dayIdx', i)}
          />
        ))}
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm leading-normal text-fg-3 lg:mt-3.5 lg:max-w-160">
        <span
          className="mt-1.5 size-2 flex-none rounded-full bg-[#1f8a4c]"
          aria-hidden="true"
        />
        {DROP_OFF_NOTE}
      </p>

      <SectionLabel className="mt-8.5 mb-4 lg:mb-3.5">
        Your details
      </SectionLabel>
      <div className="flex flex-col gap-3 lg:max-w-150 lg:gap-3.5">
        <input
          className={FIELD}
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Full name"
          aria-label="Full name"
          autoComplete="name"
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-3.5">
          <input
            className={cn(FIELD, 'lg:flex-1')}
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="Phone number"
            aria-label="Phone number"
            autoComplete="tel"
          />
          <input
            className={cn(FIELD, 'lg:flex-1')}
            type="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="Email (optional)"
            aria-label="Email (optional)"
            autoComplete="email"
          />
        </div>
      </div>
      <button
        type="button"
        role="checkbox"
        aria-checked={form.optIn}
        onClick={() => set('optIn', !form.optIn)}
        className="mt-4.5 flex cursor-pointer items-center gap-3 text-left"
      >
        <span
          className={cn(
            'flex size-6 shrink-0 items-center justify-center',
            form.optIn
              ? 'bg-accent text-on-accent'
              : 'border-[1.5px] border-line-2'
          )}
          aria-hidden="true"
        >
          {form.optIn && <Tick className="size-3.5" />}
        </span>
        <span className="text-[15px] leading-snug text-fg-3">
          {OPT_IN_LABEL}
        </span>
      </button>

      {/* Mobile booking summary — the desktop card lives in the sidebar. */}
      <div className="mt-7 border border-line bg-surface p-4.5 lg:hidden">
        <SectionLabel className="mb-3.5">Your booking</SectionLabel>
        <SummaryRows summary={summary} rowClassName="py-1.5" />
      </div>
    </div>
  );
}

function SummaryRows({ summary, rowClassName }) {
  return (
    <>
      <div className={cn(ROW, rowClassName)}>
        <span className={ROW_KEY}>Package</span>
        <span className={ROW_VAL}>{summary.pkgName}</span>
      </div>
      <div className={cn(ROW, rowClassName)}>
        <span className={ROW_KEY}>Vehicle</span>
        <span className={ROW_VAL}>{summary.vehicle}</span>
      </div>
      <div className={cn(ROW, rowClassName)}>
        <span className={ROW_KEY}>When</span>
        <span className={ROW_VAL}>{summary.when}</span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Chrome                                                             */
/* ------------------------------------------------------------------ */

function BackIcon({ className }) {
  return (
    <svg viewBox="0 0 9 15" className={className} aria-hidden="true">
      <path
        d="M7.5 1.5L1.5 7.5l6 6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Mobile: 3-segment progress row, stuck just below the site header (83px on
 * phones, 87px once the header switches to its md layout).
 */
function MobileProgress({ step, goStep }) {
  return (
    <nav
      aria-label="Booking steps"
      className="sticky top-header z-30 bg-canvas/92 px-4.5 pt-4 pb-3.5 backdrop-frost md:top-[5.4375rem] lg:hidden"
    >
      <ol className="flex gap-2.25">
        {STEP_TITLES.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={label} className="flex flex-1 flex-col gap-2.5">
              <button
                type="button"
                disabled={i > step}
                onClick={() => goStep(i)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex flex-col gap-2.5 text-left',
                  i <= step ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'block h-1 transition-colors duration-250',
                    active || done ? 'bg-accent' : 'bg-line'
                  )}
                />
                <span className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'flex size-3.75 shrink-0 items-center justify-center rounded-full transition-colors',
                      done && 'bg-accent text-on-accent',
                      active && 'border-2 border-accent',
                      !done && !active && 'border-2 border-line-2'
                    )}
                    aria-hidden="true"
                  >
                    {done && <Tick className="size-2" />}
                  </span>
                  <span
                    className={cn(
                      'text-xs whitespace-nowrap',
                      active
                        ? 'font-bold text-fg'
                        : done
                          ? 'font-semibold text-fg-2'
                          : 'font-semibold text-fg-3'
                    )}
                  >
                    {label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Desktop: "Back" link + numbered stepper. */
function DesktopStepper({ step, onBack, goStep }) {
  return (
    <div className="mb-11 hidden items-center gap-4 lg:flex">
      <button
        type="button"
        onClick={onBack}
        className="flex cursor-pointer items-center gap-2 text-base text-fg-3 transition-colors hover:text-fg"
      >
        <BackIcon className="h-3.25 w-2" />
        Back
      </button>
      <ol className="ml-2.5 flex items-center gap-3">
        {STEP_TITLES.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={label} className="flex items-center gap-3">
              <button
                type="button"
                disabled={i > step}
                onClick={() => goStep(i)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-2.5',
                  i <= step ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'flex size-7.5 items-center justify-center rounded-full text-sm font-bold',
                    active || done
                      ? 'bg-accent text-on-accent'
                      : 'bg-surface-2 text-fg-3'
                  )}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span
                  className={cn(
                    'text-base',
                    active
                      ? 'font-bold text-fg'
                      : done
                        ? 'font-medium text-fg-2'
                        : 'font-medium text-fg-3'
                  )}
                >
                  {label}
                </span>
              </button>
              {i < STEP_TITLES.length - 1 && (
                <span className="h-px w-10 bg-line-2" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ratingLine() {
  const { score, count } = site.rating;
  return count
    ? `Rated ${score} by ${count}+ local drivers`
    : `Rated ${score} on Google`;
}

/** Desktop: sticky summary card with the primary button beneath the rows. */
function DesktopSummary({ summary, canGo, submitting, err, onNext, label }) {
  return (
    <aside className="sticky top-28 hidden w-95 flex-none lg:block">
      <div className="border border-line bg-surface p-6">
        <SectionLabel className="mb-4.5">Your booking</SectionLabel>
        <SummaryRows summary={summary} rowClassName="py-2" />
        <div className="mt-3 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-sm text-fg-3">{summary.estCaption}</span>
          <span className="font-display text-3xl leading-none text-fg">
            {summary.estLabel}
          </span>
        </div>
        <PrimaryButton
          className="mt-5 h-15 w-full text-lg"
          disabled={!canGo || submitting}
          onClick={onNext}
        >
          {label}
        </PrimaryButton>
        {err && (
          <p className="mt-3 text-sm font-medium text-accent" role="alert">
            {err}
          </p>
        )}
      </div>
      <div className="mt-4.5 flex items-center gap-2.5 px-1 text-sm text-fg-3">
        <Stars starClassName="size-3.5" /> {ratingLine()}
      </div>
    </aside>
  );
}

/** Mobile: sticky footer with the estimate and the primary button. */
function MobileFooter({ summary, canGo, submitting, err, onNext, label }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-line bg-surface/95 px-4.5 pt-3.5 pb-safe-3.5 backdrop-frost lg:hidden">
      <div className="flex items-center gap-3.5">
        <div className="min-w-0 flex-1">
          <div className="text-xs text-fg-3">{summary.estCaption}</div>
          <div className="font-display text-2xl leading-none text-fg">
            {summary.estLabel}
          </div>
        </div>
        <PrimaryButton
          className="h-12.5 shrink-0 px-5 text-base"
          disabled={!canGo || submitting}
          onClick={onNext}
        >
          {label}
        </PrimaryButton>
      </div>
      {err && (
        <p className="mt-2.5 text-sm font-medium text-accent" role="alert">
          {err}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Confirmation                                                       */
/* ------------------------------------------------------------------ */

function Confirmed({ firstName, phone, summary }) {
  return (
    <section className="flex min-h-[70dvh] flex-col items-center justify-center px-5.5 py-10 text-center lg:min-h-[60vh] lg:px-page lg:py-14">
      <div className="w-full max-w-130">
        <div className="mx-auto mb-6 flex h-16 w-fit items-center justify-center gap-3.5 rounded-full bg-accent px-6 lg:mb-6.5 lg:h-18 lg:px-7">
          <CarFront
            className="size-8 text-on-accent lg:size-9"
            strokeWidth={2}
            aria-hidden="true"
          />
          <CalendarCheck
            className="size-8 text-on-accent lg:size-9"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <h1 className="mb-3 font-display text-display-lg text-fg uppercase lg:mb-3.5">
          Request sent!
        </h1>
        <p className="mb-6 text-[15px] leading-relaxed text-fg-2 lg:mb-7 lg:text-base">
          Thanks {firstName} — we&apos;ve got your details. We&apos;ll call{' '}
          <strong className="font-semibold text-fg">{phone}</strong> shortly to
          lock in your spot.
        </p>
        <div className="bg-surface p-4.5 text-left lg:p-6">
          <div className={cn(ROW, 'py-1.75 lg:py-2')}>
            <span className={ROW_KEY}>Package</span>
            <span className={ROW_VAL}>{summary.pkgName}</span>
          </div>
          <div className={cn(ROW, 'py-1.75 lg:py-2')}>
            <span className={ROW_KEY}>Vehicle</span>
            <span className={ROW_VAL}>{summary.vehicleFull}</span>
          </div>
          <div className={cn(ROW, 'py-1.75 lg:py-2')}>
            <span className={ROW_KEY}>Requested</span>
            <span className={ROW_VAL}>{summary.when}</span>
          </div>
          <div
            className={cn(
              ROW,
              'mt-1.75 items-baseline border-t border-line pt-2.75 lg:mt-2 lg:pt-3.25'
            )}
          >
            <span className={ROW_KEY}>Estimated total</span>
            <span className="font-display text-xl leading-none text-fg lg:text-2xl">
              {summary.estLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow                                                               */
/* ------------------------------------------------------------------ */

const initialForm = {
  pkg: DEFAULT_PACKAGE_ID,
  vehicle: '',
  makeModel: '',
  notes: '',
  dayIdx: null,
  name: '',
  phone: '',
  email: '',
  optIn: true,
  company: '', // honeypot
};

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [screen, setScreen] = useState('booking');
  const [form, setForm] = useState(initialForm);
  const [days, setDays] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const openedAt = useRef(Date.now());

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErr('');
  };

  // Day chips depend on "today", so build them after mount — the prerendered
  // HTML then never disagrees with the visitor's clock/timezone.
  useEffect(() => {
    setDays(nextWeekdays(20));
  }, []);

  // Optional ?pkg= preselect (package id or name, case-insensitive) — the
  // "Book this" links on the services/home pages pass the id.
  useEffect(() => {
    const match = findPackage(
      new URLSearchParams(window.location.search).get('pkg')
    );
    if (match) setForm((prev) => ({ ...prev, pkg: match.id }));
  }, []);

  // Each step (and the confirmation) starts at the top of the page.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step, screen]);

  const pkg = bookingPackages.find((p) => p.id === form.pkg);
  const isRange = isPriceRange(pkg.price);
  const day = form.dayIdx != null ? days[form.dayIdx] : null;
  const firstName = form.name.trim().split(/\s+/)[0] || 'there';
  const summary = {
    pkgName: pkg.name,
    vehicle: form.vehicle || 'To be confirmed',
    vehicleFull: form.makeModel.trim()
      ? `${form.vehicle} · ${form.makeModel.trim()}`
      : form.vehicle,
    when: day ? `${day.dow} ${day.day} ${day.month}` : 'To be confirmed',
    estLabel: pkg.price,
    estCaption: isRange ? 'Estimated range' : 'Estimated total',
  };

  const canGo =
    step === 0 ||
    (step === 1 && !!form.vehicle && !!form.makeModel.trim()) ||
    (step === 2 && day != null && !!form.name.trim() && !!form.phone.trim());

  const goStep = (n) => {
    if (n <= step) setStep(n);
  };
  const back = () => {
    if (step > 0) setStep(step - 1);
    else router.push('/');
  };

  const submit = async () => {
    if (!isPhone(form.phone)) return setErr('Enter a valid phone number.');
    if (form.email.trim() && !isEmail(form.email))
      return setErr('Enter a valid email address or leave it blank.');
    setErr('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pkg: pkg.name,
          price: pkg.price,
          vehicle: form.vehicle,
          makeModel: form.makeModel,
          notes: form.notes,
          date: formatDayLong(day),
          name: form.name,
          phone: form.phone,
          email: form.email,
          optIn: form.optIn,
          company: form.company,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setScreen('confirmed');
    } catch {
      setErr('Something went wrong sending your request. Please call us.');
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (!canGo || submitting) return;
    if (step < 2) setStep(step + 1);
    else submit();
  };

  if (screen === 'confirmed') {
    return (
      <Confirmed firstName={firstName} phone={form.phone} summary={summary} />
    );
  }

  const buttonLabel = submitting
    ? 'Sending…'
    : step < 2
      ? 'Continue'
      : 'Confirm booking';

  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-col lg:min-h-0">
      <h1 className="sr-only">Book an appointment</h1>
      <MobileProgress step={step} goStep={goStep} />

      <div className="mx-auto w-full max-w-6xl flex-1 px-5.5 pt-7 pb-8 lg:px-page lg:py-7">
        <DesktopStepper step={step} onBack={back} goStep={goStep} />

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          className="lg:flex lg:items-start lg:gap-11.5"
        >
          <HoneypotField
            id="bk-company"
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
          />

          <div className="min-w-0 lg:flex-[1.7]">
            {step === 0 && (
              <PackageStep value={form.pkg} onChange={(id) => set('pkg', id)} />
            )}
            {step === 1 && <VehicleStep form={form} set={set} />}
            {step === 2 && (
              <DetailsStep
                form={form}
                set={set}
                days={days}
                summary={summary}
              />
            )}
          </div>

          <DesktopSummary
            summary={summary}
            canGo={canGo}
            submitting={submitting}
            err={err}
            onNext={next}
            label={buttonLabel}
          />
        </form>
      </div>

      <MobileFooter
        summary={summary}
        canGo={canGo}
        submitting={submitting}
        err={err}
        onNext={next}
        label={buttonLabel}
      />
    </div>
  );
}
