import Link from 'next/link';
import { site, findPackage } from '@/data/site';
import { servicesFaqs, faqJsonLd } from '@/data/faqs';
import JsonLd from '@/components/seo/JsonLd';
import Faq from '@/components/ui/Faq';
import PackagePicker from '@/components/garage/PackagePicker';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/ui/CtaBand';
import { FeatureCard, FeatureRail } from '@/components/ui/FeatureCard';
import PageHero from '@/components/ui/PageHero';
import SectionHead from '@/components/ui/SectionHead';

export const metadata = {
  title: 'Car Detailing Services & Pricing | Clean King — Blissfield, MI',
  description:
    'Professional car wash and detailing services from $35-$160. Interior detail, exterior detail, full detail, window tinting. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.',
  openGraph: {
    title: 'Car Detailing Services & Pricing | Clean King — Blissfield, MI',
    description:
      'View our complete range of car wash, detailing, and window tinting services with transparent pricing from $35-$160.',
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
          </FeatureRail>
          <p className="mt-6.5 font-mono text-xs tracking-widest text-fg-3">
            Not sure what you need?{' '}
            <Link href="/contact" className="text-accent">
              Ask us for a recommendation →
            </Link>
          </p>
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
