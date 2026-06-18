'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Desktop-only calendar, lazy-loaded so phones never download react-day-picker.
const DesktopDatePicker = dynamic(() => import('./DesktopDatePicker'), {
  ssr: false,
});

/**
 * Native <input type="date"> on mobile (best OS picker, accessibility for
 * free), a themed react-day-picker popover on desktop (where the native popup
 * looks out of place). Both report an ISO `YYYY-MM-DD` string via `onChange`.
 *
 * Renders native on the server and first client paint, then upgrades to the
 * desktop calendar after mount when a fine pointer + wide viewport is detected
 * — so hydration always matches.
 */
export default function DateField({ value, min, max, onChange }) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (desktop) {
    return (
      <DesktopDatePicker
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    );
  }

  return (
    <input
      className="bk-input bk-date"
      type="date"
      aria-label="Appointment date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
