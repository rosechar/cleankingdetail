import Link from 'next/link';
import Image from 'next/image';
import { site, packages } from '@/data/site';
import { AREA_LINKS } from '@/data/nav';
import ReviewsCarousel from '@/components/garage/ReviewsCarousel';
import Button from '@/components/ui/Button';
import { cn } from '@/components/ui/cn';
import CtaBand from '@/components/ui/CtaBand';
import LocationSection from '@/components/ui/LocationSection';
import AddressLink from '@/components/ui/AddressLink';
import SectionHead from '@/components/ui/SectionHead';
import {
  GArrow,
  GCalendar,
  GPhoneOutline,
  GStar,
} from '@/components/garage/Icons';
import {
  AddOnCard,
  PackageActions,
  PackageCard,
  PackageGrid,
} from '@/components/ui/PackageCard';

const MARQUEE = [
  'Spiffy Detail',
  'Interior Detail',
  'Full Detail',
  'Deluxe Detail',
  'Ceramic Tint',
  'Paint Protection',
];
// The marquee slides one "half" then snaps back, so each half must be wider
// than any viewport or a blank shows up at the far right just before the loop.
// Two passes of the list (~3.3k px) covers wide desktops.
const MARQUEE_STRIP = [...MARQUEE, ...MARQUEE];

/**
 * Hero CTA: frosted glass face, 2px border and a hard 5px offset shadow in the
 * same colour; on hover it "snaps down" into its shadow. Colour classes come
 * from the caller. Renders <Link> for internal hrefs, <a> otherwise.
 */
const PosterButton = ({ href, className, children, ...rest }) => {
  const Tag = href.startsWith('/') ? Link : 'a';
  return (
    <Tag
      href={href}
      className={cn(
        'inline-flex min-h-11 cursor-pointer items-center justify-center border-2 font-body font-semibold whitespace-nowrap backdrop-blur-sm transition-[transform,box-shadow] duration-120 hover:translate-x-0.75 hover:translate-y-0.75',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Home = () => {
  return (
    <>
      {/* hero — tucks under the header on every size (--spacing-header /
          --spacing-header-md). The header stays hidden until the hero has
          scrolled away (see <Header>), so the photo owns the whole first screen
          and carries the brand mark itself. Mobile: photo + marquee fill exactly
          one viewport; desktop: the same — the photo takes whatever height is
          left after the marquee, so the marquee always lands at the fold. */}
      <div
        className="-mt-header flex min-h-svh flex-col md:-mt-header-md"
        id="top"
        data-hero
      >
        <section className="relative flex-1 overflow-hidden max-md:min-h-108 md:min-h-104">
          {/* photo: full-bleed on phones; on desktop it occupies the right
              two-thirds and fades in from the solid canvas on its left edge */}
          <div className="absolute inset-0 md:left-1/5 md:mask-[linear-gradient(90deg,transparent,#000_30%)]">
            <Image
              src="/tire.webp"
              alt="Freshly detailed wheel and tire"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              // `priority` only preloads; the LCP image also needs the high
              // fetch priority so the browser doesn't queue it behind scripts.
              fetchPriority="high"
              // Source is 1013×1520; q50 keeps the phone variant (~50 KB AVIF)
              // at the same weight the old 570px crop cost, but sharp.
              quality={50}
              className="object-cover object-[60%_center] [animation-duration:2.4s] motion-safe:animate-fade-in motion-safe:opacity-0 md:object-center"
            />
            {/* shading: one vertical ramp on phones; on desktop a left-edge
                fade into the canvas plus a bottom ramp */}
            <div className="absolute inset-0 bg-hero-shade-mobile md:bg-hero-shade-x" />
            <div className="absolute inset-0 hidden bg-hero-shade-y md:block" />
          </div>

          {/* caption chip (lg+ — it collides with the eyebrow on tablets) */}
          <span className="absolute top-[calc(clamp(3rem,6.67vw,6rem)_-_0.5rem)] right-page z-2 hidden border border-white/15 bg-canvas/55 px-4 py-2.5 font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-fg-2 uppercase backdrop-blur-sm lg:block">
            Deluxe Detail · Wheels &amp; Tires
          </span>

          {/* copy: on phones a full-height column (eyebrow + headline top;
              stats + CTAs pinned to the bottom, no subline); on desktop a
              680px block top-left (eyebrow, headline, subline, CTAs) with the
              stat band — and the brand mark above it — pinned along the bottom
              of the photo */}
          <div className="absolute inset-0 flex flex-col px-4 pt-7 pb-4 md:px-page md:pt-[clamp(3rem,6.67vw,6rem)] md:pb-0">
            <p className="px-1 font-mono text-sm leading-[1.7] tracking-[0.2em] text-accent uppercase md:px-0 md:text-[0.9375rem] md:leading-normal md:tracking-[0.32em]">
              Showroom-grade auto detailing
              <br className="md:hidden" /> in Blissfield, MI
            </p>
            <h1 className="mt-3 px-1 font-display text-hero-mobile uppercase motion-safe:animate-rise max-md:mb-auto md:mt-6.5 md:max-w-170 md:px-0 md:text-hero">
              <span className="sr-only">
                Car detailing &amp; window tinting in Blissfield, MI —{' '}
              </span>
              The King
              <br />
              <span className="text-accent">of</span> Clean
            </h1>
            <p className="hidden text-xl text-fg md:mt-6.5 md:block md:max-w-170 md:text-[1.375rem]">
              Book online, detailed by hand, finished like new.
            </p>

            {/* stats: edge-to-edge strip between subline and CTAs on phones;
                glass band along the bottom of the photo (right four-fifths) on desktop */}
            <div className="relative -mx-4 flex border-y border-white/15 bg-canvas/55 backdrop-blur-[10px] md:absolute md:right-0 md:bottom-0 md:left-1/5 md:mx-0 md:mt-0 md:border-b-0 md:border-white/14 md:bg-canvas/45">
              {/* the header stays hidden while the hero is on screen, so the
                  brand mark sits in the photo, right above the stat band */}
              <Image
                src="/cleanking-mark.png"
                alt={site.name}
                width={395}
                height={395}
                className="absolute right-4 bottom-full mb-4 size-30 md:right-page md:mb-8 md:size-52"
              />
              <div className="flex-1 border-r border-white/10 py-3 text-center md:border-white/12 md:py-6.5">
                <div className="font-display text-stat">
                  <span className="text-accent">$</span>35
                </div>
                <div className="mt-1.5 font-mono text-xs tracking-[0.24em] text-fg-3 uppercase md:mt-2.5 md:text-[13px] md:tracking-[0.3em]">
                  And up
                </div>
              </div>
              <a
                className="group flex-1 border-r border-white/10 py-3 text-center md:border-white/12 md:py-6.5"
                href={site.google}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">
                  Rated {site.rating.score} out of 5
                  {site.rating.count
                    ? ` from ${site.rating.count} reviews`
                    : ''}{' '}
                  on Google — read our reviews:{' '}
                </span>
                <div className="font-display text-stat">
                  5
                  <GStar
                    aria-hidden="true"
                    className="ml-1.5 inline-block size-[0.7em] -translate-y-[0.08em] fill-accent"
                  />
                </div>
                <div className="mt-1.5 font-mono text-xs tracking-[0.24em] text-fg-3 uppercase transition-colors group-hover:text-fg md:mt-2.5 md:text-[13px] md:tracking-[0.3em]">
                  On Google
                </div>
              </a>
              <div className="flex-1 py-3 text-center md:py-6.5">
                <div className="font-display text-stat">
                  100<span className="text-accent">%</span>
                </div>
                <div className="mt-1.5 font-mono text-xs tracking-[0.24em] text-fg-3 uppercase md:mt-2.5 md:text-[13px] md:tracking-[0.3em]">
                  By hand
                </div>
              </div>
            </div>

            {/* CTAs — "poster offset" buttons */}
            <div className="mt-3 flex gap-3.5 md:mt-8.5 md:gap-5 md:pb-0">
              <PosterButton
                href="/appointment"
                className="flex-1 gap-2 border-accent bg-accent/15 py-3 text-lg font-bold tracking-[0.04em] text-white uppercase shadow-[5px_5px_0_var(--color-accent)] hover:shadow-[2px_2px_0_var(--color-accent)] md:flex-none md:gap-3 md:px-11 md:py-5.5 md:text-2xl md:tracking-[0.03em] md:normal-case"
              >
                <GCalendar
                  aria-hidden="true"
                  className="size-4 shrink-0 stroke-2 md:size-6"
                />
                Book
              </PosterButton>
              <PosterButton
                href={site.phoneHref}
                className="w-16 border-fg bg-fg/8 py-3 text-fg shadow-[5px_5px_0_var(--color-fg)] hover:shadow-[2px_2px_0_var(--color-fg)] md:w-auto md:px-7 md:py-5.5"
                aria-label={`Call ${site.phone}`}
                title={site.phone}
              >
                <GPhoneOutline
                  aria-hidden="true"
                  className="size-4.5 shrink-0 stroke-2 md:size-7"
                />
              </PosterButton>
            </div>
          </div>
        </section>

        {/* services marquee */}
        <div
          className="flex h-14 shrink-0 items-center overflow-hidden border-y border-line md:h-20"
          aria-hidden="true"
        >
          <div className="flex w-max shrink-0 animate-marquee whitespace-nowrap will-change-transform motion-reduce:animate-none">
            {[0, 1].map((k) => (
              <span
                key={k}
                className="inline-flex items-center gap-11 pr-11 font-display text-marquee leading-normal text-fg-2 uppercase md:gap-24 md:pr-24"
              >
                {MARQUEE_STRIP.map((m, i) => (
                  <span key={i} className="contents">
                    {m}
                    <i className="inline-block size-2.25 rotate-45 bg-accent" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* services preview */}
      <section className="px-page py-section" id="services">
        <SectionHead
          eyebrow={<>Services &amp; Pricing</>}
          title={
            <>
              Pick your
              <br />
              package
            </>
          }
        >
          <Link href="/services" className="text-accent">
            See full details &amp; what&apos;s included →
          </Link>
        </SectionHead>
        <PackageGrid>
          {packages.map((s) => (
            <PackageCard
              as={Link}
              href={`/services#${s.id}`}
              key={s.name}
              name={s.name}
              price={s.price}
              blurb={s.blurb}
              popular={s.popular}
            >
              <PackageActions className="justify-end">
                <GArrow
                  className="size-4 shrink-0 fill-none stroke-accent stroke-2 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </PackageActions>
            </PackageCard>
          ))}
          <AddOnCard as={Link} href="/contact" />
        </PackageGrid>
      </section>

      {/* reviews */}
      <ReviewsCarousel />

      {/* our work */}
      {/* <Gallery /> */}

      {/* location */}
      <LocationSection
        id="location"
        eyebrow="Find us"
        title={<>Family-owned in Blissfield</>}
        info={[
          { label: 'Shop', value: <AddressLink /> },
          { label: 'Phone', value: site.phone },
        ]}
        chipsLabel="Proudly serving"
        chips={[
          { label: 'Blissfield', href: '/contact' },
          ...AREA_LINKS,
          { label: 'Monroe' },
        ]}
      />

      {/* cta */}
      <CtaBand
        className="max-md:border-t-0 max-md:pt-8"
        eyebrow="Gift certificates available"
        title={
          <>
            Ready when
            <br />
            you are
          </>
        }
      >
        <Button variant="accent" href="/appointment">
          Schedule Appointment
        </Button>
        <Button variant="ghost" href={site.phoneHref}>
          {site.phone}
        </Button>
      </CtaBand>
    </>
  );
};

export default Home;
