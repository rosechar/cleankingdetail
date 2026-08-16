import Link from 'next/link';
import Image from 'next/image';
import { site, packages } from '@/data/site';
import { AREA_LINKS } from '@/data/nav';
import ReviewsCarousel from '@/components/garage/ReviewsCarousel';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import Eyebrow from '@/components/ui/Eyebrow';
import LocationSection from '@/components/ui/LocationSection';
import AddressLink from '@/components/ui/AddressLink';
import SectionHead from '@/components/ui/SectionHead';
import { GArrow, GCalendar, GPhone, GStar } from '@/components/garage/Icons';
import {
  AddOnCard,
  PackageActions,
  PackageCard,
  PackageGrid,
} from '@/components/ui/PackageCard';

// Staggered entrance for the hero copy (only when motion is allowed).
const rise = (i) => ({ animationDelay: `${50 + i * 80}ms` });

const MARQUEE = [
  'Spiffy Detail',
  'Interior Detail',
  'Full Detail',
  'Deluxe Detail',
  'Ceramic Tint',
  'Paint Protection',
];

const Home = () => {
  return (
    <>
      {/* hero */}
      <section
        className="relative mx-auto -mt-header flex min-h-[calc(100svh-62px)] flex-col border-b border-line md:mt-0 md:grid md:min-h-0 md:max-w-2xl md:grid-cols-1 lg:max-w-410 lg:grid-cols-[1.12fr_0.88fr]"
        id="top"
        data-hero
      >
        <div className="flex shrink-0 flex-col justify-center border-b border-line px-page pt-5.5 pb-6.5 md:pt-16 md:pb-13.5 lg:border-r lg:border-b-0 lg:pt-24 lg:pb-20">
          <Eyebrow className="motion-safe:animate-rise" style={rise(0)}>
            Showroom-grade auto detailing in Blissfield, MI
          </Eyebrow>
          <h1
            className="absolute top-header right-page left-page z-3 mt-4 max-w-fit border border-white/22 bg-canvas/62 px-4 pt-3 pb-3.5 font-display text-hero-mobile uppercase backdrop-blur-xs motion-safe:animate-rise md:static md:mt-5 md:max-w-none md:border-0 md:bg-transparent md:p-0 md:text-hero-tablet md:backdrop-blur-none lg:text-hero"
            style={rise(1)}
          >
            <span className="sr-only">
              Car detailing &amp; window tinting in Blissfield, MI —{' '}
            </span>
            The King
            <br />
            <span className="text-accent">of</span> Clean
          </h1>
          <p
            className="mt-2.5 max-w-115 text-lead text-fg-2 motion-safe:animate-rise md:mt-6"
            style={rise(2)}
          >
            Book online, detailed by hand, finished like new.
          </p>
          <div
            className="mt-8.5 hidden max-w-110 flex-wrap gap-3.25 motion-safe:animate-rise md:flex"
            style={rise(3)}
          >
            <Button variant="accent" href="/appointment" className="flex-1">
              Book Appointment
            </Button>
            <Button variant="ghost" href={site.phoneHref} className="flex-1">
              {site.phone}
            </Button>
          </div>
          <div
            className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4.5 text-center motion-safe:animate-rise md:mt-11 md:pt-7 lg:mt-13"
            style={rise(4)}
          >
            <div>
              <div className="font-display text-stat">
                <span className="text-accent">$</span>35
              </div>
              <div className="mt-2 font-mono text-xs tracking-label text-fg-3 uppercase">
                And up
              </div>
            </div>
            <a
              className="group"
              href={site.google}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">
                Rated {site.rating.score} out of 5
                {site.rating.count ? ` from ${site.rating.count} reviews` : ''}{' '}
                on Google — read our reviews:{' '}
              </span>
              <div className="font-display text-stat">
                5
                <GStar
                  aria-hidden="true"
                  className="ml-1 inline-block size-7 -translate-y-0.5 fill-accent lg:size-8"
                />
              </div>
              <div className="mt-2 font-mono text-xs tracking-label text-fg-3 uppercase transition-colors group-hover:text-fg">
                On Google
              </div>
            </a>
            <div>
              <div className="font-display text-stat">
                100<span className="text-accent">%</span>
              </div>
              <div className="mt-2 font-mono text-xs tracking-label text-fg-3 uppercase">
                By hand
              </div>
            </div>
          </div>
        </div>
        <div className="relative order-first flex min-h-[max(30rem,62svh)] flex-1 items-center justify-center overflow-hidden pt-header after:absolute after:inset-0 after:bg-linear-120 after:from-canvas/55 after:to-transparent after:to-42% after:content-[''] motion-safe:animate-fade-in motion-safe:opacity-0 md:min-h-80 md:pt-0 lg:order-none lg:min-h-115">
          <Image
            src="/tire.webp"
            alt="Freshly detailed wheel and tire"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
            className="object-cover"
          />
          {/* mobile-only: CTA overlaid on the center of the image */}
          <div className="relative z-3 flex translate-y-5.5 items-center gap-3 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              href="/appointment"
              className="w-40 bg-canvas/55 backdrop-blur-xs"
            >
              <GCalendar
                aria-hidden="true"
                className="size-5 shrink-0 stroke-accent stroke-2"
              />
              Book
            </Button>
            <Button
              variant="ghost"
              size="sm"
              href={site.phoneHref}
              className="w-40 bg-canvas/55 backdrop-blur-xs"
              aria-label={`Call ${site.phone}`}
            >
              <GPhone
                aria-hidden="true"
                className="size-5 shrink-0 fill-accent"
              />
              Call
            </Button>
          </div>
          <span className="absolute right-6 bottom-6 z-2 border border-white/22 bg-canvas/62 px-3.25 py-2 font-mono text-xs tracking-label whitespace-nowrap text-white uppercase backdrop-blur-xs">
            Deluxe Detail · Wheels &amp; Tires
          </span>
        </div>
      </section>

      {/* marquee */}
      <div
        className="overflow-hidden border-b border-line py-4.5"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee gap-11 whitespace-nowrap motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-11 font-display text-marquee leading-normal text-fg-2 uppercase"
            >
              {MARQUEE.map((m) => (
                <span key={m} className="contents">
                  {m}
                  <i className="inline-block size-2.25 rotate-45 bg-accent" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* review — social proof before pricing */}
      <ReviewsCarousel />

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
