import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';

const LINK = 'transition-colors hover:text-accent';

export default function Footer() {
  return (
    // Extra bottom padding below md keeps content clear of the fixed mobile CTA bar.
    <footer className="mx-auto flex max-w-350 flex-wrap items-center justify-between gap-6 border-t border-line px-page pt-9.5 pb-safe-24 md:pb-9.5">
      <div className="flex items-center gap-3.5">
        <Image
          src="/cleanking-mark.png"
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
          className="size-10"
        />
        <div>
          <div className="font-display text-lg uppercase">
            Clean King Detailing
          </div>
          <div className="mt-0.75 font-mono text-xs tracking-widest text-fg-3">
            {site.address1} · {site.address2}
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-3 font-mono text-xs tracking-label text-fg-2 uppercase">
        <div className="flex flex-wrap gap-5.5">
          <Link className={LINK} href="/">
            Home
          </Link>
          <Link className={LINK} href="/services">
            Services
          </Link>
          <Link className={LINK} href="/appointment">
            Book
          </Link>
          <Link className={LINK} href="/contact">
            Contact
          </Link>
        </div>
        <div className="flex flex-wrap gap-5.5">
          <Link className={LINK} href="/car-detailing-adrian-mi">
            Adrian
          </Link>
          <Link className={LINK} href="/car-detailing-tecumseh-mi">
            Tecumseh
          </Link>
          <Link className={LINK} href="/car-detailing-ann-arbor-mi">
            Ann Arbor
          </Link>
          <Link className={LINK} href="/car-detailing-lenawee-county">
            Lenawee County
          </Link>
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
