import { site } from '@/data/site';
import AddressLink from '@/components/ui/AddressLink';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

const SLUG = '/car-detailing-adrian-mi';

export const metadata = {
  title: 'Car Detailing in Adrian, MI — From $35, Same-Day | Clean King',
  description:
    'Car detailing for Adrian, MI drivers from $35–$160 — 15 minutes down US-223 in Blissfield. Hand wash, interior shampoo, clay bar, wax and ceramic window tint. Call (517) 682-1919.',
  openGraph: {
    title: 'Car Detailing in Adrian, MI — From $35, Same-Day | Clean King',
    description:
      'Hand car wash, full detailing & ceramic window tint for Adrian, MI. Flat pricing from $35–$160, 15 minutes from downtown Adrian.',
    url: SLUG,
  },
  alternates: {
    canonical: SLUG,
  },
};

const detailedServices = [
  {
    name: 'Hand Car Wash',
    desc: 'Two-bucket hand wash, foam bath and chamois dry — no brushes, no tunnel. Gets the winter brine off without the swirl marks the drive-through washes on US-223 leave behind.',
  },
  {
    name: 'Interior Shampoo & Steam',
    desc: 'Seats, carpets, mats and headliner vacuumed, shampooed and steamed. Built for the salt, gravel and dog hair that come with commuting between Adrian and the farm roads around it.',
  },
  {
    name: 'Clay Bar & Wax',
    desc: 'Clay pulls the bonded grit out of the paint, then a hand-applied wax or sealant locks in gloss and keeps road salt from biting into the clear coat through the winter.',
  },
  {
    name: 'Ceramic Window Tint',
    desc: 'Heat-rejecting ceramic film that cuts glare on the long, open stretches of M-52 and keeps a parked car cooler in the Adrian College and downtown lots. Priced per vehicle.',
  },
  {
    name: 'Engine Bay & Trunk',
    desc: 'Degrease and dress the engine bay, vacuum the trunk and clean the channels — the Deluxe Detail finishing touches that make a used car photograph like a new one.',
  },
  {
    name: 'Headlight Restoration',
    desc: 'Wet-sand, polish and seal yellowed lenses so they pass a glance and light the road properly again. A cheap fix that adds real value before you sell or trade in.',
  },
];

const whyUs = [
  {
    name: '15 Minutes from Adrian',
    desc: 'Straight down US-223 from the Adrian Mall to our shop on W Adrian St in Blissfield. Drop off in the morning, pick up the same day.',
  },
  {
    name: 'Posted, Flat Pricing',
    desc: '$35 to $160 for every package, listed on the site. What we quote is what you pay — no upsells at pickup.',
  },
  {
    name: 'Family-Owned & By Hand',
    desc: 'Clean King is a Lenawee County family business. Every vehicle is washed and detailed by hand, which is why Adrian customers keep coming back.',
  },
];

const content = {
  slug: SLUG,
  hero: {
    eyebrow: 'Adrian, Michigan',
    title: (
      <>
        Car detailing
        <br />
        in Adrian, MI
      </>
    ),
    lead: 'Hand car wash, interior and exterior detailing and ceramic window tint from $35–$160 — a 15-minute drive from downtown Adrian to our family-owned shop in Blissfield.',
  },
  location: {
    eyebrow: 'Serving Adrian & Lenawee',
    title: 'The county seat’s closest hand-detail shop',
    description: [
      'Adrian is our biggest customer base and our closest neighbor. From the Adrian Mall or Siena Heights, hop on US-223 heading east and you are pulling into Clean King at 610 W Adrian St in Blissfield about fifteen minutes later — no appointment lottery, no waiting in a tunnel line.',
      'Most Adrian drivers book a Full or Deluxe Detail after winter to get the road salt out of the carpets and off the paint, and a Spiffy Detail in between. If you commute on M-52 or park downtown all day, ask about ceramic tint — it makes a noticeable difference in July.',
    ],
    info: [
      { label: 'Shop', value: <AddressLink /> },
      { label: 'Phone', value: site.phone },
      { label: 'From Adrian', value: 'About 15 minutes east on US-223' },
    ],
  },
  packages: {
    note: 'Same flat prices for Adrian drivers as everyone else — pick a package and book online.',
  },
  services: {
    title: 'What we do for Adrian drivers',
    note: 'From a quick hand wash to a full engine-bay Deluxe Detail, everything is done by hand in our Blissfield shop.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why Adrian drives to Blissfield',
    note: 'Close, honest, and finished properly — the reasons our Adrian customers make the short trip.',
    items: whyUs,
  },
  cta: {
    eyebrow: 'Serving Adrian · Tecumseh · Blissfield · Lenawee County',
    title: (
      <>
        Ready to detail
        <br />
        your vehicle?
      </>
    ),
  },
};

const locationLd = locationSchema({
  areaType: 'City',
  areaName: 'Adrian',
  slug: SLUG.slice(1),
  description: metadata.description,
});

export default function CarDetailingAdrianMI() {
  return (
    <>
      <JsonLd data={locationLd} />
      <LocationPage {...content} />
    </>
  );
}
