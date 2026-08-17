'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { GPhone } from '@/components/garage/Icons';
import Button from '@/components/ui/Button';
import { cn } from '@/components/ui/cn';
import { isPastHero } from './heroReveal';

// Sticky bottom action bar — mobile only (hidden from md up), where the
// header's Call/Book buttons are hidden. On pages with a hero ([data-hero]) it
// slides in on the same scroll threshold as the site header (see heroReveal),
// so the two arrive and leave together instead of competing with the hero's own
// CTAs. Pages without a hero show it straight away. The booking flow has its
// own sticky footer (estimate + Continue), so it renders nothing there.
export default function MobileCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  // While true the bar has no transition, so route changes (and a restored
  // scroll position) can flip it without animating — only scrolling and the
  // first arrival slide.
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
    // Hero page: settle to the current scroll position without animating,
    // then track the header's threshold so both slide in at the same moment.
    setInstant(true);
    const update = () => setShow(isPastHero());
    update();
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setInstant(false));
    });
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
    };
  }, [pathname]);

  if (pathname === '/appointment') return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 -bottom-0.5 z-50 flex gap-2.5 border-t border-line bg-canvas px-3 pt-2.5 pb-safe-3 md:hidden',
        show
          ? 'visible translate-y-0 opacity-100'
          : 'invisible translate-y-full opacity-0',
        // slides down out of view at full opacity, then opacity/visibility
        // drop once it's gone; omitted entirely while `instant`
        !instant &&
          (show
            ? 'transition-[translate,opacity] duration-300 ease-out'
            : 'transition-[translate,opacity,visibility] [transition-delay:0s,300ms,300ms] duration-300 ease-in')
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
