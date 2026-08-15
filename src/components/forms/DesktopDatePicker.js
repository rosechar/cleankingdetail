'use client';

import { useEffect, useRef, useState } from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { cn } from '@/components/ui/cn';

const pad = (v) => String(v).padStart(2, '0');
const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (iso) => (iso ? new Date(`${iso}T00:00:00`) : undefined);

// react-day-picker's own stylesheet is unlayered, so it outranks Tailwind's
// layered utilities regardless of specificity — hence the `!` on the few
// declarations that collide with it (day background, weekday size, chevron
// fill). Everything the library exposes as a --rdp-* variable is set via
// `RDP_VARS` instead.
const RDP_VARS = {
  '--rdp-accent-color': 'var(--color-accent)',
  '--rdp-accent-background-color': 'var(--color-accent)',
  '--rdp-today-color': 'var(--color-accent)',
  '--rdp-disabled-opacity': 0.22,
  '--rdp-outside-opacity': 0.3,
  '--rdp-day_button-border-radius': '4px',
  '--rdp-selected-border': 'none',
  '--rdp-weekday-text-transform': 'uppercase',
};

const rdp = getDefaultClassNames();
const RDP_CLASSES = {
  root: cn(rdp.root, 'font-body text-fg'),
  month_caption: cn(
    rdp.month_caption,
    'font-display tracking-wide text-fg uppercase'
  ),
  caption_label: cn(
    rdp.caption_label,
    'font-display tracking-wide text-fg uppercase'
  ),
  weekday: cn(rdp.weekday, 'text-xs! text-fg-3'),
  button_previous: cn(rdp.button_previous, 'group'),
  button_next: cn(rdp.button_next, 'group'),
  chevron: cn(rdp.chevron, 'fill-fg-2! group-hover:fill-accent!'),
};

/** Day cell button: accent fill when selected, surface hover otherwise. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- keep `day` off the DOM
function DayButton({ day, modifiers, className, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return (
    <button
      ref={ref}
      className={cn(
        className,
        modifiers.selected
          ? 'bg-accent! text-on-accent!'
          : 'hover:not-disabled:bg-surface-2!'
      )}
      {...rest}
    />
  );
}
const RDP_COMPONENTS = { DayButton };

/**
 * Desktop date picker: a themed react-day-picker popover. Weekends and any day
 * outside the [min, max] window are disabled, so only valid weekdays can be
 * chosen. Reports an ISO `YYYY-MM-DD` string via `onChange`.
 */
export default function DesktopDatePicker({ value, min, max, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const selected = fromISO(value);
  const minDate = fromISO(min);
  const maxDate = fromISO(max);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleSelect = (day) => {
    if (!day) return;
    onChange(toISO(day));
    setOpen(false);
  };

  const label = selected
    ? selected.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Select a date';

  return (
    <div className="relative inline-block" ref={wrapRef}>
      <button
        type="button"
        className={cn(
          'inline-flex min-w-60 cursor-pointer items-center justify-between gap-3.5 border border-line-2 bg-canvas px-3.5 py-3.25 text-left text-base scheme-dark transition-colors focus:border-accent focus:outline-none',
          selected ? 'text-fg' : 'text-fg-3'
        )}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          className="size-4 shrink-0 fill-none stroke-accent stroke-2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute top-full left-0 z-30 mt-2 border border-line-2 bg-surface px-3.5 py-3 shadow-2xl shadow-black/60"
          role="dialog"
          aria-label="Choose a date"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected || minDate}
            startMonth={minDate}
            endMonth={maxDate}
            showOutsideDays={false}
            disabled={[
              { before: minDate },
              { after: maxDate },
              { dayOfWeek: [0, 6] },
            ]}
            classNames={RDP_CLASSES}
            components={RDP_COMPONENTS}
            style={RDP_VARS}
          />
        </div>
      )}
    </div>
  );
}
