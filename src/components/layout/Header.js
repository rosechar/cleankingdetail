'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/appointment', label: 'Book' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={'garage-head' + (open ? ' is-open' : '')}>
      <Link className="garage-brand" href="/" onClick={() => setOpen(false)}>
        <Image
          src="/cleanking-mark.png"
          alt="Clean King Detailing"
          width={54}
          height={54}
        />
        <span className="wm">Clean King</span>
      </Link>

      <nav className="garage-nav">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={pathname === n.href ? 'is-active' : ''}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <div className="hc">
        <a className="ph" href={site.phoneHref}>
          {site.phone}
        </a>
        <Link className="ck-btn ck-btn-accent" href="/appointment">
          Book Now
        </Link>
      </div>

      <button
        type="button"
        className="garage-burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
