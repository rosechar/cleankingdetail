import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import { AREA_LINKS, NAV_LINKS } from '@/data/nav';
import { cn } from '@/components/ui/cn';
import { GFacebook, GGoogle } from '@/components/garage/Icons';

const LINK = 'transition-colors hover:text-accent';

export default function Footer() {
  return (
    // Border on the outer footer so the divider spans the full viewport;
    // the inner row is capped. Extra bottom padding below md keeps content
    // clear of the fixed mobile CTA bar.
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-7 px-page pt-10 pb-safe-24 md:pb-10">
        <div className="flex items-center gap-4.5">
          <Image
            src="/cleanking-mark.png"
            alt=""
            width={80}
            height={80}
            aria-hidden="true"
            className="size-20"
          />
          <div className="font-mono text-sm leading-relaxed tracking-widest text-fg-3">
            <div className="font-display text-2xl tracking-normal text-fg uppercase">
              {site.name}
            </div>
            <a
              className={cn(LINK, 'mt-1 block')}
              href={site.google}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.address1}
              <br />
              {site.address2}
            </a>
            <a className={cn(LINK, 'block')} href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3 font-mono text-[13px] tracking-label text-fg-2 uppercase">
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

        <div className="flex gap-5 text-fg-2">
          <a
            className={LINK}
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clean King on Facebook"
          >
            <GFacebook className="size-8 fill-current" aria-hidden="true" />
          </a>
          <a
            className={LINK}
            href={site.google}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Clean King on Google"
          >
            <GGoogle className="size-8 fill-current" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
