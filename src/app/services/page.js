import Link from 'next/link';
import { site, findPackage, PRICE_RANGE } from '@/data/site';
import { servicesFaqs, faqJsonLd } from '@/data/faqs';
import JsonLd from '@/components/seo/JsonLd';
import Faq from '@/components/ui/Faq';
import PackagePicker from '@/components/garage/PackagePicker';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import {
  FeatureCard,
  FeatureGrid,
  FeatureRail,
} from '@/components/ui/FeatureCard';
import { PICKUP_NOTE } from '@/data/booking';
import PageHero from '@/components/ui/PageHero';
import SectionHead from '@/components/ui/SectionHead';

export const metadata = {
  title: `Car Detailing Services & Pricing — Flat ${PRICE_RANGE} | Clean King`,
  description: `Professional car wash and detailing services from ${PRICE_RANGE}. Interior detail, exterior detail, full detail, window tinting. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.`,
  openGraph: {
    title: `Car Detailing Services & Pricing — Flat ${PRICE_RANGE} | Clean King`,
    description: `View our complete range of car wash, detailing, and window tinting services with transparent pricing from ${PRICE_RANGE}.`,
    url: '/services',
  },
  alternates: {
    canonical: '/services',
  },
};

const alaCarte = findPackage('a-la-carte');

export default function Services() {
  return (
    <>
      <JsonLd data={faqJsonLd(servicesFaqs)} />
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

      <section className="px-page pb-section" id="packages">
        {/* No max-width wrapper: the card rail bleeds to the viewport edges. */}
        <PackagePicker />
      </section>

      <section className="border-t border-line px-page py-section" id="addons">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="More options" title="À la carte & add-ons">
            Need just one thing, or want to protect your finish? Add any of
            these to a detail or book them on their own.
          </SectionHead>
          <FeatureRail>
            <FeatureCard
              tag="À la carte"
              title="Single Services"
              price={alaCarte.price}
              description="Pick exactly what your car needs — no full package required."
              items={alaCarte.items}
            >
              <Link
                href={`/appointment?pkg=${alaCarte.id}`}
                className="mt-auto pt-5 text-sm text-accent"
              >
                Book à la carte →
              </Link>
            </FeatureCard>
            {site.addons.map((a) => (
              <FeatureCard
                key={a.name}
                tag="Add-on"
                title={a.name}
                price="Quote"
                description={a.desc}
              />
            ))}
          </FeatureRail>
          <p className="mt-6.5 font-mono text-xs tracking-widest text-fg-3">
            Not sure what you need?{' '}
            <Link href="/contact" className="text-accent">
              Ask us for a recommendation →
            </Link>
          </p>
        </div>
      </section>

      {/* how it works — the shop is drop-off only, so set that expectation
          before the FAQ and booking band */}
      <section className="border-t border-line px-page py-section" id="how">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Morning drop-off,
                <br />
                same-day pickup
              </>
            }
          />
          <FeatureGrid>
            <FeatureCard
              tag="Step 01"
              title="Book online"
              description="Pick a package and a weekday. We'll call to confirm your spot."
            />
            <FeatureCard
              tag="Step 02"
              title="Morning drop off"
              description="A morning start gives us time to give your vehicle the thorough attention it deserves."
            />
            <FeatureCard
              tag="Step 03"
              title="Same day pickup"
              description={PICKUP_NOTE}
            />
          </FeatureGrid>
        </div>
      </section>

      {/* FAQ — objection handling right before the booking band */}
      <section className="border-t border-line px-page py-section" id="faq">
        <Faq items={servicesFaqs} eyebrow="Before you book" title="FAQ">
          <Link href="/contact" className="text-accent">
            Ask us anything else →
          </Link>
        </Faq>
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
