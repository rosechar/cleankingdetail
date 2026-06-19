'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { GPhone } from '@/components/garage/Icons';

// Sticky bottom action bar — mobile only (CSS-gated), where the header's
// Call/Book buttons are hidden. It reveals only once the whole hero (which
// carries its own Call/Book buttons) has scrolled out of view, so the two never
// compete on screen. Pages without a hero (e.g. the booking page) show it
// straight away. On the booking page the "Book" action is the page itself, so
// we show Call full-width with the number instead.
export default function MobileCTA() {
  const pathname = usePathname();
  const onBooking = pathname === '/appointment';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.garage-hero');
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
      className={'ck-mcta' + (show ? ' show' : '')}
      role="region"
      aria-label="Quick actions"
    >
      <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
        <GPhone aria-hidden="true" />
        {onBooking ? `Call ${site.phone}` : 'Call'}
      </a>
      {!onBooking && (
        <Link className="ck-btn ck-btn-accent" href="/appointment">
          Book Now
        </Link>
      )}
    </div>
  );
}
