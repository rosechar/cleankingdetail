import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GCheck } from '@/components/garage/Icons';
import IncludesToggle from '@/components/garage/IncludesToggle';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { FeatureCard, FeatureGrid } from '@/components/ui/FeatureCard';
import PageHero from '@/components/ui/PageHero';
import SectionHead from '@/components/ui/SectionHead';
import { cn } from '@/components/ui/cn';

export const metadata = {
  title: 'Car Detailing Services & Pricing | Clean King — Blissfield, MI',
  description:
    'Professional car wash and detailing services from $35-$160. Interior detail, exterior detail, full detail, window tinting. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.',
  keywords:
    'car detailing services Blissfield MI, car wash pricing, interior detail, exterior detail, full detail, deluxe detail, window tinting services, auto detailing packages',
  openGraph: {
    title: 'Car Detailing Services & Pricing | Clean King — Blissfield, MI',
    description:
      'View our complete range of car wash, detailing, and window tinting services with transparent pricing from $35-$160.',
    url: 'https://www.cleankingdetail.com/services',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/services',
  },
};

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services & Pricing"
        title={
          <>
            Detailing,
            <br />
            done by hand
          </>
        }
      />

      <section
        className="px-page pt-7 pb-section md:pt-9.5 lg:pt-12"
        id="packages"
      >
        <div className="mx-auto max-w-6xl">
          {packages.map((s) => (
            <div
              className={cn(
                'relative flex scroll-mt-25 flex-col gap-6 pb-3.5 not-first:border-t not-first:border-line not-first:pt-3.5 md:flex-row md:gap-8 md:pb-4.5 md:not-first:pt-4.5 lg:pb-5.5 lg:not-first:pt-5.5',
                s.popular &&
                  "before:absolute before:-top-px before:bottom-0 before:-left-page before:w-0.75 before:bg-accent before:content-['']"
              )}
              key={s.name}
              id={s.id}
            >
              <div className="min-w-0 md:flex-1">
                <h3 className="mt-1.5 flex flex-wrap items-center gap-4 font-display text-display-sm uppercase">
                  {s.name}
                  {s.popular && (
                    <span className="-translate-y-0.5 bg-accent px-2.75 py-1.25 font-mono text-xs font-semibold tracking-label text-on-accent uppercase">
                      Most popular
                    </span>
                  )}
                </h3>
                <p className="mt-2.5 max-w-xl text-base leading-normal text-fg-2">
                  {s.blurb}
                </p>
                <ul className="mt-4 grid max-w-xl grid-cols-1 gap-x-6.5 gap-y-2.25 sm:grid-cols-2">
                  {(s.details || s.items).map((it) => (
                    <li
                      key={it}
                      className="flex items-baseline gap-2.5 text-sm text-fg-2"
                    >
                      <GCheck
                        className="size-3.75 shrink-0 translate-y-0.5 fill-none stroke-accent"
                        strokeWidth={2.6}
                      />{' '}
                      {it}
                    </li>
                  ))}
                </ul>
                {s.includes && (
                  <IncludesToggle text={s.includesText} items={s.includes} />
                )}
              </div>
              <div className="flex items-baseline justify-between gap-5 md:w-70.5 md:shrink-0 md:flex-col md:items-end md:justify-start md:gap-0 md:text-right">
                <div className="font-display text-display-sm whitespace-nowrap">
                  {s.price}
                </div>
                <Button
                  variant="accent"
                  href={`/appointment?pkg=${s.id}`}
                  className="md:mt-4"
                >
                  Book this
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line px-page py-section" id="addons">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="More options" title="À la carte & add-ons">
            Need just one thing, or want to protect your finish? Add any of
            these to a detail or book them on their own.
          </SectionHead>
          <FeatureGrid>
            <FeatureCard
              tag="À la carte"
              title="Single Services"
              price={site.alacarte.price}
              description="Pick exactly what your car needs — no full package required."
              items={site.alacarte.items}
            />
            {site.addons.map((a) => (
              <FeatureCard
                key={a.name}
                tag="Add-on"
                title={a.name}
                price="Quote"
                description={a.desc}
              />
            ))}
          </FeatureGrid>
          <p className="mt-6.5 font-mono text-xs tracking-widest text-fg-3">
            Not sure what you need?{' '}
            <Link href="/contact" className="text-accent">
              Ask us for a recommendation →
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Gift certificates available"
        title={
          <>
            Ready to book
            <br />
            your detail?
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
}
