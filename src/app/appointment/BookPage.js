'use client';

import { useEffect, useRef, useState } from 'react';
import { findPackage, site } from '@/data/site';
import { isEmail, isPhone } from '@/lib/validation';
import {
  bookingPackages,
  DEFAULT_PACKAGE_ID,
  DROP_OFF_NOTE,
  DROP_OFF_WINDOW,
  formatDayLong,
  nextWeekdays,
  OPT_IN_LABEL,
  STEP_TITLES,
  VEHICLES,
} from '@/data/booking';
import Link from 'next/link';
import { CalendarCheck, CalendarPlus, CarFront } from 'lucide-react';
import { GArrow } from '@/components/garage/Icons';
import BookingCelebration from '@/components/garage/BookingCelebration';
import AddressLink from '@/components/ui/AddressLink';
import HoneypotField from '@/components/forms/HoneypotField';
import Stars from '@/components/ui/Stars';
import { cn } from '@/components/ui/cn';
import { RISE, riseDelay } from '@/components/ui/rise';

/* ------------------------------------------------------------------ */
/*  Style constants (design values × the "large" 1.15 content scale)   */
/* ------------------------------------------------------------------ */

// Section eyebrow ("Choose your detail", "Pick a day"…) — the site's mono label.
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

/** Inline validation message under a field (renders nothing when empty). */
function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-accent" role="alert">
      {children}
    </p>
  );
}

/** Desktop-only step heading (the mobile header carries the title instead). */
function StepHeading({ children }) {
  return (
    <h2 className="mb-2 hidden font-display text-display-md text-fg uppercase lg:mb-5 lg:block">
      {children}
    </h2>
  );
}

/** Accent primary button with the disabled state from the design. */
function PrimaryButton({ disabled, muted, className, children, ...rest }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-body font-semibold transition-colors duration-200',
        disabled
          ? 'cursor-not-allowed bg-[#34343a] text-[#7a766f]'
          : muted
            ? 'cursor-pointer bg-[#34343a] text-[#a9a59e] hover:bg-[#3d3d44]'
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
      <StepHeading>Choose your detail</StepHeading>
      <SectionLabel className="mb-3.5 lg:hidden">
        Choose your detail
      </SectionLabel>
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
              <span className="flex w-full items-center justify-between gap-3">
                <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-display text-xl leading-none text-fg uppercase">
                    {p.name}
                  </span>
                  {p.popular && (
                    <span className="bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-on-accent uppercase">
                      Most popular
                    </span>
                  )}
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
      <StepHeading>Your vehicle</StepHeading>
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

function DetailsStep({ form, set, days, summary, errors = {} }) {
  const invalid = (k) => (errors[k] ? 'border-accent!' : '');
  return (
    <div>
      <StepHeading>Day &amp; details</StepHeading>
      <SectionLabel className="mb-3.5">Pick a day</SectionLabel>
      <div
        id="bk-day"
        role="radiogroup"
        aria-label="Day"
        aria-invalid={!!errors.day || undefined}
        aria-describedby={errors.day ? 'bk-day-err' : undefined}
        tabIndex={-1}
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
      <FieldError id="bk-day-err">{errors.day}</FieldError>
      <p className="mt-4 text-sm leading-normal text-fg-3 lg:mt-3.5 lg:max-w-160">
        {DROP_OFF_NOTE}
      </p>

      <SectionLabel className="mt-8.5 mb-4 lg:mb-3.5">
        Your details
      </SectionLabel>
      <div className="flex flex-col gap-3 lg:max-w-150 lg:gap-3.5">
        <div>
          <input
            id="bk-name"
            className={cn(FIELD, invalid('name'))}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Full name"
            aria-label="Full name"
            aria-invalid={!!errors.name || undefined}
            aria-describedby={errors.name ? 'bk-name-err' : undefined}
            autoComplete="name"
          />
          <FieldError id="bk-name-err">{errors.name}</FieldError>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-3.5">
          <div className="lg:flex-1">
            <input
              id="bk-phone"
              className={cn(FIELD, invalid('phone'))}
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="Phone number"
              aria-label="Phone number"
              aria-invalid={!!errors.phone || undefined}
              aria-describedby={errors.phone ? 'bk-phone-err' : undefined}
              autoComplete="tel"
            />
            <FieldError id="bk-phone-err">{errors.phone}</FieldError>
          </div>
          <div className="lg:flex-1">
            <input
              id="bk-email"
              className={cn(FIELD, invalid('email'))}
              type="email"
              inputMode="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="Email (optional)"
              aria-label="Email (optional)"
              aria-invalid={!!errors.email || undefined}
              aria-describedby={errors.email ? 'bk-email-err' : undefined}
              autoComplete="email"
            />
            <FieldError id="bk-email-err">{errors.email}</FieldError>
          </div>
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

/** Numbered stepper: ① Package — ② Vehicle — ③ Details. */
function Steps({ step, goStep }) {
  return (
    <ol className="flex w-full items-center gap-1.5 lg:w-auto lg:gap-3">
      {STEP_TITLES.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <li
            key={label}
            className={cn(
              'flex min-w-0 items-center gap-1.5 lg:gap-3',
              i < STEP_TITLES.length - 1 && 'flex-1 lg:flex-none'
            )}
          >
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
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold lg:size-7.5',
                  active || done
                    ? 'bg-accent text-on-accent'
                    : 'bg-surface-2 text-fg-3'
                )}
              >
                {done ? '✓' : i + 1}
              </span>
              <span
                className={cn(
                  'text-[17px] whitespace-nowrap lg:text-base',
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
              <span
                className="h-px min-w-1.5 flex-1 bg-line-2 lg:w-10 lg:flex-none"
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Mobile: the stepper stuck directly under the site header. `--header-h` is
 * measured by <Header> so this can never gap or overlap it, whatever the
 * logo/padding end up rendering at; falls back to the design height.
 */
function MobileProgress({ step, goStep }) {
  return (
    <nav
      aria-label="Booking steps"
      className="sticky top-[var(--header-h,var(--spacing-header))] z-30 bg-canvas/95 px-3.5 py-4 backdrop-frost lg:hidden"
    >
      <Steps step={step} goStep={goStep} />
    </nav>
  );
}

/** Desktop: the same stepper inline above the form. */
function DesktopStepper({ step, goStep }) {
  return (
    <div className="mb-11 hidden lg:block">
      <Steps step={step} goStep={goStep} />
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
function DesktopSummary({
  summary,
  canGo,
  ready = true,
  submitting,
  err,
  onNext,
  label,
}) {
  return (
    <aside className="sticky top-28 hidden w-95 flex-none lg:block">
      <div className="border border-line bg-surface p-6">
        <SectionLabel className="mb-4.5">Your booking</SectionLabel>
        <SummaryRows summary={summary} rowClassName="py-2" />
        <PrimaryButton
          className="mt-5 h-15 w-full text-lg"
          disabled={!canGo || submitting}
          muted={!ready}
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

/** Mobile: sticky footer with the primary button. */
function MobileFooter({ canGo, ready = true, submitting, err, onNext, label }) {
  return (
    <div className="sticky bottom-0 z-30 border-t border-line bg-surface/95 px-4.5 pt-3.5 pb-safe-3.5 backdrop-frost lg:hidden">
      <PrimaryButton
        className="h-12.5 w-full px-5 text-base"
        disabled={!canGo || submitting}
        muted={!ready}
        onClick={onNext}
      >
        {label}
      </PrimaryButton>
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

function Confirmed({ firstName, phone, summary, day, pkg }) {
  const calendarHref =
    day && pkg
      ? `/api/calendar?date=${day.iso}&pkg=${encodeURIComponent(pkg.id)}`
      : null;
  const rows = [
    ['Package', summary.pkgName],
    ['Vehicle', summary.vehicleFull],
    ['Requested', summary.when],
    ['Drop-off', DROP_OFF_WINDOW],
    ['Where', <AddressLink key="addr" stacked className="hover:text-accent" />],
  ];
  const cardBtn =
    'flex flex-1 basis-[150px] cursor-pointer items-center justify-center gap-2 px-4.5 py-3.25 text-center font-display text-[15px] tracking-[.05em] whitespace-nowrap uppercase transition-all duration-200 ease-snap hover:-translate-y-0.5';
  return (
    <section className="px-5.5 py-10 lg:px-page lg:py-14">
      <div className="mx-auto w-full max-w-5xl">
        {/* One grid so the phone order is scene → heading → card while
            desktop keeps the heading on top and scene | card below. */}
        <div className="grid items-stretch gap-4.5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div
            className={cn(
              'order-2 text-center lg:order-none lg:col-span-2 lg:mb-4.5',
              RISE
            )}
            style={riseDelay(1)}
          >
            <h1 className="mb-3 font-display text-display-lg text-fg uppercase lg:mb-3.5">
              Confirmation
            </h1>
            <p className="text-[15px] leading-relaxed text-fg-2 lg:text-base">
              Thanks {firstName}, we&apos;ve got your details.
              <br />
              We&apos;ll call{' '}
              <strong className="font-semibold text-fg">{phone}</strong> to lock
              in your spot.
            </p>
          </div>

          {/* celebration scene */}
          <div
            className={cn(
              'order-1 flex items-center justify-center py-2 lg:order-none lg:py-0',
              RISE
            )}
            style={riseDelay(0)}
          >
            <BookingCelebration
              className="mx-0"
              fallback={
                <div className="flex h-16 w-fit items-center justify-center gap-3.5 rounded-full bg-accent px-6 lg:h-18 lg:px-7">
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
              }
            />
          </div>

          {/* confirmation card */}
          <div
            className={cn(
              'order-3 flex flex-col border border-l-[3px] border-line border-l-accent bg-surface p-5.5 text-left lg:order-none',
              RISE
            )}
            style={riseDelay(2)}
          >
            {rows.map(([k, v], i) => (
              <div
                key={k}
                className={cn(
                  'flex justify-between gap-3 py-3.25 text-[15px]',
                  i === 0 && 'pt-1',
                  i < rows.length - 1 && 'border-b border-line'
                )}
              >
                <span className="text-fg-3">{k}</span>
                <span className="text-right font-semibold text-fg">{v}</span>
              </div>
            ))}
            <div className="mt-auto flex flex-wrap gap-2.5 pt-4">
              {calendarHref && (
                <a
                  href={calendarHref}
                  download
                  className={cn(cardBtn, 'bg-accent text-on-accent')}
                >
                  <CalendarPlus
                    className="size-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Add to calendar
                </a>
              )}
              <a
                href={site.phoneHref}
                className={cn(
                  cardBtn,
                  'border border-line-2 text-fg hover:border-fg'
                )}
              >
                Call to reschedule
              </a>
            </div>
          </div>
        </div>

        {/* What happens next — the drop-off rules people otherwise only see
            in the confirmation email (and only if they gave an email). */}
        <ul
          className={cn(
            'mx-auto mt-6 flex w-fit flex-col gap-2.5 text-left text-sm leading-relaxed text-fg-2 lg:mt-8 lg:items-center lg:text-center lg:text-[15px]',
            RISE
          )}
          style={riseDelay(3)}
        >
          {[
            'Please clear out personal belongings, including the trunk, before you arrive.',
            'Most details are ready for pickup the same afternoon.',
          ].map((t) => (
            <li key={t} className="flex gap-2.5 lg:justify-center">
              <span
                className="mt-2 size-1.5 shrink-0 rotate-45 bg-accent"
                aria-hidden="true"
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-fg-3">
          <Link href="/" className="transition-colors hover:text-fg">
            ← Back to home
          </Link>
          <span className="mx-2.5" aria-hidden="true">
            ·
          </span>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            Follow us on Facebook
          </a>
        </p>
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
  const [step, setStep] = useState(0);
  const [screen, setScreen] = useState('booking');
  const [form, setForm] = useState(initialForm);
  const [days, setDays] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const [attempted, setAttempted] = useState(false);
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
  const day = form.dayIdx != null ? days[form.dayIdx] : null;
  const firstName = form.name.trim().split(/\s+/)[0] || 'there';
  const summary = {
    pkgName: pkg.name,
    vehicle: form.vehicle || 'To be confirmed',
    vehicleFull: form.makeModel.trim()
      ? `${form.vehicle} · ${form.makeModel.trim()}`
      : form.vehicle,
    when: day ? `${day.dow} ${day.day} ${day.month}` : 'To be confirmed',
  };

  // Step 3 validates on submit (button stays enabled) so people get told
  // exactly which field needs fixing instead of a dead button.
  const fieldErrors = {
    day: day == null ? 'Pick a day.' : '',
    name: form.name.trim() ? '' : 'Enter your name.',
    phone: isPhone(form.phone) ? '' : 'Enter a valid phone number.',
    email:
      form.email.trim() && !isEmail(form.email)
        ? 'Enter a valid email address or leave it blank.'
        : '',
  };
  const detailsValid = !Object.values(fieldErrors).some(Boolean);
  useEffect(() => {
    if (attempted && detailsValid) setErr('');
  }, [attempted, detailsValid]);

  const canGo =
    step === 0 ||
    (step === 1 && !!form.vehicle && !!form.makeModel.trim()) ||
    step === 2;
  // Final step: the button stays grey until every required field is filled,
  // but remains clickable so a tap can surface the field errors.
  const looksReady = step < 2 || detailsValid;

  const goStep = (n) => {
    if (n <= step) setStep(n);
  };

  const submit = async () => {
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
    if (step < 2) return setStep(step + 1);
    if (!detailsValid) {
      setAttempted(true);
      setErr('Please fix the highlighted fields.');
      const first = ['day', 'name', 'phone', 'email'].find(
        (k) => fieldErrors[k]
      );
      document.getElementById(`bk-${first}`)?.focus();
      return;
    }
    submit();
  };

  if (screen === 'confirmed') {
    return (
      <Confirmed
        firstName={firstName}
        phone={form.phone}
        summary={summary}
        day={day}
        pkg={pkg}
      />
    );
  }

  const buttonLabel = submitting
    ? 'Submitting…'
    : step < 2
      ? 'Continue'
      : 'Confirm booking';

  return (
    <div className="flex min-h-[calc(100dvh-var(--spacing-header))] flex-col lg:min-h-0">
      <h1 className="sr-only">Book an appointment</h1>
      <MobileProgress step={step} goStep={goStep} />

      <div className="mx-auto w-full max-w-6xl flex-1 px-5.5 pt-10 pb-8 lg:px-page lg:py-7">
        <DesktopStepper step={step} goStep={goStep} />

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

          <div key={step} className={cn('min-w-0 lg:flex-[1.7]', RISE)}>
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
                errors={attempted ? fieldErrors : {}}
              />
            )}
          </div>

          <DesktopSummary
            summary={summary}
            canGo={canGo}
            ready={looksReady}
            submitting={submitting}
            err={err}
            onNext={next}
            label={buttonLabel}
          />
        </form>
      </div>

      <MobileFooter
        canGo={canGo}
        ready={looksReady}
        submitting={submitting}
        err={err}
        onNext={next}
        label={buttonLabel}
      />
    </div>
  );
}
