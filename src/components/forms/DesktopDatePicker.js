'use client';

import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

const pad = (v) => String(v).padStart(2, '0');
const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (iso) => (iso ? new Date(`${iso}T00:00:00`) : undefined);

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
    <div className="dp" ref={wrapRef}>
      <button
        type="button"
        className={'bk-input bk-date dp-trigger' + (selected ? '' : ' empty')}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="16" rx="2" />
          <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
        </svg>
      </button>
      {open && (
        <div className="dp-pop" role="dialog" aria-label="Choose a date">
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
          />
        </div>
      )}
    </div>
  );
}
