'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { GPhone } from '@/components/garage/Icons';
import Button from '@/components/ui/Button';
import { cn } from '@/components/ui/cn';

// Sticky bottom action bar — mobile only (hidden from md up), where the
// header's Call/Book buttons are hidden. It reveals only once the whole hero
// (marked with [data-hero]) has scrolled out of view, so the two never compete
// on screen. Pages without a hero (e.g. the booking page) show it straight
// away. On the booking page the "Book" action is the page itself, so we show
// Call full-width with the number instead.
export default function MobileCTA() {
  const pathname = usePathname();
  const onBooking = pathname === '/appointment';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) {
      setShow(true);
      return;
    }
    setShow(false);
    const io = new IntersectionObserver(([entry]) =>
      setShow(!entry.isIntersecting)
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-line bg-canvas/86 px-3 pt-2.5 pb-safe-2.5 backdrop-frost transition-[transform,opacity] duration-300 ease-snap motion-reduce:translate-none motion-reduce:transition-opacity motion-reduce:duration-200 md:hidden',
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      )}
      role="region"
      aria-label="Quick actions"
    >
      <Button
        variant="ghost"
        size="sm"
        className="flex-1 bg-surface/55"
        href={site.phoneHref}
      >
        <GPhone aria-hidden="true" className="size-4.25 fill-current" />
        {onBooking ? `Call ${site.phone}` : 'Call'}
      </Button>
      {!onBooking && (
        <Button
          variant="accent"
          size="sm"
          className="flex-1"
          href="/appointment"
        >
          Book Now
        </Button>
      )}
    </div>
  );
}
