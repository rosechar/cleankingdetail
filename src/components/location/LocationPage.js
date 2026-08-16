import Link from 'next/link';
import { site, packages } from '@/data/site';
import { AREA_LINKS } from '@/data/nav';
import Button from '@/components/ui/Button';
import PageHero from '@/components/ui/PageHero';
import LocationSection from '@/components/ui/LocationSection';
import SectionHead from '@/components/ui/SectionHead';
import CtaBand from '@/components/ui/CtaBand';
import {
  PackageGrid,
  PackageCard,
  PackageFeatures,
  PackageActions,
  PackageLink,
  AddOnCard,
} from '@/components/ui/PackageCard';
import { FeatureGrid, FeatureCard } from '@/components/ui/FeatureCard';

/**
 * Shared template for the "car detailing in <area>" landing pages.
 * Every prop is copy; the route files own metadata + JSON-LD.
 *
 * slug:      this page's route (e.g. '/car-detailing-adrian-mi'), used to
 *            cross-link the *other* service-area pages
 * hero:      { eyebrow, title (node), lead }
 * location:  { eyebrow, title, description (string | string[]),
 *              info: [{ label, value }] }
 * packages:  { note (node — right-hand paragraph next to "Detailing packages") }
 * services:  { title, note, items: [{ name, desc }] }
 * whyUs:     { title, note, items: [{ name, desc }] }
 * cta:       { eyebrow, title (node) }
 */
export default function LocationPage({
  slug,
  hero,
  location,
  packages: pkgs,
  services,
  whyUs,
  cta,
}) {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead}>
        <Button variant="accent" href="/appointment">
          Book Appointment
        </Button>
        <Button variant="ghost" href={site.phoneHref}>
          Call {site.phone}
        </Button>
      </PageHero>

      {/* location */}
      <LocationSection
        eyebrow={location.eyebrow}
        title={location.title}
        description={location.description}
        info={location.info}
        chipsLabel="Also serving"
        chips={[
          { label: 'Blissfield', href: '/contact' },
          ...AREA_LINKS.filter((l) => l.href !== slug),
        ]}
      />

      {/* packages */}
      <section className="px-page py-section">
        <SectionHead
          eyebrow="Services & Pricing"
          title={
            <>
              Detailing
              <br />
              packages
            </>
          }
        >
          {pkgs.note}{' '}
          <Link href="/services" className="text-accent">
            See full details →
          </Link>
        </SectionHead>
        <PackageGrid>
          {packages.map((s) => (
            <PackageCard
              key={s.name}
              name={s.name}
              price={s.price}
              blurb={s.blurb}
              popular={s.popular}
            >
              <PackageFeatures items={s.items} />
              <PackageActions>
                <PackageLink href={`/appointment?pkg=${s.id}`}>
                  Book this
                </PackageLink>
              </PackageActions>
            </PackageCard>
          ))}
          <AddOnCard />
        </PackageGrid>
      </section>

      {/* comprehensive services */}
      <section className="border-t border-line px-page py-section">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Full service list" title={services.title}>
            {services.note}
          </SectionHead>
          <FeatureGrid>
            {services.items.map((s) => (
              <FeatureCard
                key={s.name}
                tag="Service"
                title={s.name}
                description={s.desc}
              />
            ))}
          </FeatureGrid>
        </div>
      </section>

      {/* why us */}
      <section className="px-page py-section">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Why Clean King" title={whyUs.title}>
            {whyUs.note}
          </SectionHead>
          <FeatureGrid>
            {whyUs.items.map((s) => (
              <FeatureCard
                key={s.name}
                tag="Clean King"
                title={s.name}
                description={s.desc}
              />
            ))}
          </FeatureGrid>
        </div>
      </section>

      <CtaBand eyebrow={cta.eyebrow} title={cta.title}>
        <Button variant="accent" href="/appointment">
          Schedule Online
        </Button>
        <Button variant="ghost" href={site.phoneHref}>
          {site.phone}
        </Button>
      </CtaBand>
    </>
  );
}
