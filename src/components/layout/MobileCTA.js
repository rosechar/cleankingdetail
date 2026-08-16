'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { GPhone } from '@/components/garage/Icons';
import Button from '@/components/ui/Button';
import { cn } from '@/components/ui/cn';

// Sticky bottom action bar — mobile only (hidden from md up), where the
// header's Call/Book buttons are hidden. It reveals only once the whole hero
// (marked with [data-hero]) has scrolled out of view, so the two never compete
// on screen. Pages without a hero show it straight away. The booking flow has
// its own sticky footer (estimate + Continue), so it renders nothing there.
export default function MobileCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  // While true the bar has no transition, so route changes can flip it
  // without a fade — only scrolling (and the very first arrival) animate.
  const [instant, setInstant] = useState(false);
  const showRef = useRef(show);
  showRef.current = show;

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    if (!hero) {
      // No hero on this page: if the bar is already up from the previous
      // page, leave it alone; otherwise fade it in shortly after paint.
      if (showRef.current) return undefined;
      const t = setTimeout(() => setShow(true), 250);
      return () => clearTimeout(t);
    }
    // Hero page: hide immediately (no fade-out on navigation), then let the
    // observer bring it back once the hero has scrolled away.
    setInstant(true);
    setShow(false);
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setInstant(false));
    });
    const io = new IntersectionObserver(([entry]) =>
      setShow(!entry.isIntersecting)
    );
    io.observe(hero);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  if (pathname === '/appointment') return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-line bg-canvas/86 px-3 pt-2.5 pb-safe-2.5 backdrop-frost transition-[opacity,visibility] duration-350 ease-out md:hidden',
        instant && 'transition-none',
        show ? 'visible opacity-100' : 'invisible opacity-0'
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
        Call
      </Button>
      <Button variant="accent" size="sm" className="flex-1" href="/appointment">
        Book Now
      </Button>
    </div>
  );
}
