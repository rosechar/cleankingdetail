'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import Button from '@/components/ui/Button';
import { cn } from '@/components/ui/cn';

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
    // Tint + blur live on the ::before so the header itself is NOT a backdrop
    // root — otherwise the mobile nav's own backdrop-filter has nothing to blur.
    // While the menu is open the nav's frosted panel starts at the top of the
    // header (behind its content, z -1) and the header's own frost + border are
    // hidden, so header + menu are ONE blur surface with no seam.
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between gap-6 border-b px-page py-2.5 before:absolute before:inset-0 before:-z-1 before:bg-canvas/82 before:backdrop-frost before:content-[''] md:border-line md:py-4",
        open ? 'border-transparent before:hidden' : 'border-line'
      )}
    >
      <Link
        className="flex shrink-0 items-center gap-3.25"
        href="/"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/cleanking-mark.png"
          alt="Clean King Detailing"
          width={54}
          height={54}
          className="size-15.5 md:size-13.5"
        />
        <span className="font-display text-xl leading-none tracking-wide whitespace-nowrap uppercase sm:text-2xl">
          Clean King
        </span>
      </Link>

      <nav
        className={cn(
          'absolute inset-x-0 top-0 -z-1 flex-col bg-canvas/82 px-page pt-header pb-3.5 backdrop-frost md:static md:z-auto md:ml-auto md:flex md:flex-row md:gap-9.5 md:bg-transparent md:p-0 md:backdrop-filter-none',
          open ? 'flex' : 'hidden'
        )}
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              'relative border-b border-line px-0.5 py-4 font-mono text-base tracking-label uppercase transition-colors hover:text-fg md:border-0 md:p-0 md:text-sm md:after:absolute md:after:-bottom-1.5 md:after:left-0 md:after:h-0.5 md:after:bg-accent md:after:transition-[right] md:after:duration-250 md:after:content-[""]',
              pathname === n.href
                ? 'text-fg md:after:right-0'
                : 'text-fg-2 md:after:right-full md:hover:after:right-0'
            )}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <div className="hidden shrink-0 items-center gap-4 md:flex">
        <a
          className="font-mono text-sm whitespace-nowrap text-fg"
          href={site.phoneHref}
        >
          {site.phone}
        </a>
        <Button variant="accent" href="/appointment">
          Book Now
        </Button>
      </div>

      <button
        type="button"
        className="-m-2 flex size-10.5 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.25 md:hidden"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={cn(
            'block h-0.5 w-6 bg-fg transition-transform duration-200',
            open && 'translate-y-1.75 rotate-45'
          )}
        />
        <span
          className={cn(
            'block h-0.5 w-6 bg-fg transition-opacity duration-200',
            open && 'opacity-0'
          )}
        />
        <span
          className={cn(
            'block h-0.5 w-6 bg-fg transition-transform duration-200',
            open && '-translate-y-1.75 -rotate-45'
          )}
        />
      </button>
    </header>
  );
}
