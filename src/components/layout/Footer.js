import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import { AREA_LINKS, NAV_LINKS } from '@/data/nav';
import { cn } from '@/components/ui/cn';

const LINK = 'transition-colors hover:text-accent';

export default function Footer() {
  return (
    // Extra bottom padding below md keeps content clear of the fixed mobile CTA bar.
    <footer className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-6 border-t border-line px-page pt-9.5 pb-safe-24 md:pb-9.5">
      <div className="flex items-center gap-3.5">
        <Image
          src="/cleanking-mark.png"
          alt=""
          width={56}
          height={56}
          aria-hidden="true"
          className="size-14"
        />
        <div>
          <div className="font-display text-lg uppercase">{site.name}</div>
          <a
            className={cn(
              LINK,
              'mt-0.75 block font-mono text-xs tracking-widest text-fg-3'
            )}
            href={site.google}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.address1} · {site.address2}
          </a>
        </div>
      </div>

      <nav className="flex flex-col gap-3 font-mono text-xs tracking-label text-fg-2 uppercase">
        <div className="flex flex-wrap gap-5.5">
          <Link className={LINK} href="/">
            Home
          </Link>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} className={LINK} href={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-5.5">
          {AREA_LINKS.map(({ href, label }) => (
            <Link key={href} className={LINK} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex gap-4.5 font-mono text-xs tracking-label text-fg-2 uppercase">
        <a
          className={LINK}
          href={site.facebook}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          className={LINK}
          href={site.google}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google
        </a>
        <a className={LINK} href={site.phoneHref}>
          {site.phone}
        </a>
      </div>
    </footer>
  );
}
