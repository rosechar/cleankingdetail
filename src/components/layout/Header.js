'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/appointment', label: 'Book' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="garage-head">
      <Link className="garage-brand" href="/">
        <Image
          src="/cleanking.svg"
          alt="Clean King Detailing"
          width={54}
          height={54}
          priority
        />
        <span className="wm">Clean King</span>
      </Link>

      <nav className="garage-nav">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={pathname === n.href ? 'is-active' : ''}
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
    </header>
  );
}
