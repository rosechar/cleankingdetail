'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/components/ui/cn';

/**
 * Circular "you're booked" 3D scene (red car on a pedestal, check badge,
 * sparkles) for the booking confirmation. Renders `fallback` (the icon
 * badge) until the scene is up, and keeps it if WebGL isn't available.
 * three.js is dynamically imported so it never ships with the form itself.
 */
export default function BookingCelebration({ fallback, className }) {
  const hostRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let ctl = null;
    (async () => {
      try {
        const { createBookingScene } = await import('./bookingScene');
        if (cancelled) return;
        ctl = createBookingScene(host, {
          accent: '#d8352e',
          reducedMotion:
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ??
            false,
        });
        setStatus('ready');
      } catch (err) {
        console.error('booking celebration', err);
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
      ctl?.dispose();
    };
  }, []);

  if (status === 'error') return fallback;

  return (
    <div
      className={cn(
        'relative mx-auto aspect-square w-56 overflow-hidden rounded-full border border-line bg-[radial-gradient(closest-side,#25262d_0%,#141419_70%,#0f0f12_100%)] lg:w-64',
        className
      )}
      role="img"
      aria-label="Your car, freshly detailed, with a check mark — booking received"
    >
      <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
}
