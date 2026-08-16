import { site } from '@/data/site';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Car Detailing near Ann Arbor, MI | Clean King Detailing',
  description:
    'Professional car detailing & window tinting for Ann Arbor, MI drivers from $35–$160. Hand wash, interior deep clean, clay bar, ceramic tint — detailed by hand. A straight shot down US-23. Call (517) 682-1919.',
  keywords:
    'car detailing Ann Arbor MI, car wash Ann Arbor Michigan, auto detailing Ann Arbor, window tinting Ann Arbor MI, interior detailing Ann Arbor, ceramic tint Ann Arbor, headlight restoration Ann Arbor, best car detailing near Ann Arbor, car detailing near University of Michigan, U-M student car detailing, car detailing Washtenaw County',
  openGraph: {
    title: 'Car Detailing near Ann Arbor, MI | Clean King Detailing',
    description:
      'Hand car wash, auto detailing & ceramic window tinting for Ann Arbor, MI drivers. Flat pricing from $35–$160.',
    url: '/car-detailing-ann-arbor-mi',
  },
  alternates: {
    canonical: '/car-detailing-ann-arbor-mi',
  },
};

const detailedServices = [
  {
    name: 'Hand Car Wash',
    desc: 'A careful two-bucket hand wash and foam bath that lifts road film and salt without swirling your paint — gentler than the automatic tunnels around town.',
  },
  {
    name: 'Interior Deep Clean',
    desc: 'Vacuum, shampoo and steam for seats, carpets and mats, clearing out the mud and salt that pile up over a Michigan winter.',
  },
  {
    name: 'Clay Bar & Decontamination',
    desc: 'Pulls bonded contaminants and rail dust out of the clear coat so wax and sealant actually grip — the step most quick washes skip.',
  },
  {
    name: 'Hand Wax & Paint Sealant',
    desc: 'A hand-applied wax or sealant that stands up to Michigan sun, rain and winter road brine, locking in a deep gloss for months.',
  },
  {
    name: 'Ceramic Window Tint',
    desc: 'Professional ceramic film that cuts heat, glare and 99% of UV — a real difference on open US-23 drives and bright winter mornings.',
  },
  {
    name: 'Headlight Restoration',
    desc: 'Sand, polish and seal foggy, yellowed headlights back to clear for safer night driving and a fresher-looking front end.',
  },
];

const whyUs = [
  {
    name: 'A Straight Shot Down US-23',
    desc: 'Family-owned in Blissfield, an easy drive south of Ann Arbor. Drop the car off, run your errands, pick it up looking new.',
  },
  {
    name: 'One Flat Price',
    desc: '$35 to $160, posted up front. No upsells and no "while we had it open" surprises when you come back.',
  },
  {
    name: 'Detailed By Hand',
    desc: "Every car is finished by hand, never run through a tunnel. It's the difference that makes the drive from Ann Arbor worth it.",
  },
];

const content = {
  hero: {
    eyebrow: 'Ann Arbor, Michigan',
    title: (
      <>
        Car detailing
        <br />
        near Ann Arbor, MI
      </>
    ),
    lead: 'Hand car wash, full auto detailing and ceramic window tinting from $35–$160. Clean King is family-owned in Blissfield — a straight shot south of Ann Arbor down US-23 — and every vehicle is detailed by hand.',
  },
  location: {
    eyebrow: 'Serving Ann Arbor & Washtenaw',
    title: 'An easy drive from Ann Arbor',
    description:
      "We're based in Blissfield, a straight shot south of Ann Arbor down US-23 — close enough to be your regular detailer, far enough from the automatic washes to do the job right. Ann Arbor drivers — from University of Michigan students prepping a car for an end-of-lease return or move-out to families across Washtenaw County — come to Clean King for hand washing, interior detailing and ceramic tint that's built for Michigan roads and weather.",
    info: [
      { label: 'Shop', value: `${site.address1}, ${site.address2}` },
      { label: 'Phone', value: site.phone },
      { label: 'From Ann Arbor', value: 'About 45 minutes via US-23' },
    ],
  },
  packages: {
    note: 'Flat, honest packages for Ann Arbor vehicle owners.',
  },
  services: {
    title: 'What we do for Ann Arbor drivers',
    note: 'From a careful hand wash to ceramic tint — the work that keeps a vehicle looking and lasting better.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why Ann Arbor drivers make the trip',
    note: 'Local, honest, and detailed by hand — the way it should be.',
    items: whyUs,
  },
  cta: {
    eyebrow: 'Serving Ann Arbor · Saline · Tecumseh · Blissfield',
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
  areaName: 'Ann Arbor',
  slug: 'car-detailing-ann-arbor-mi',
  description: metadata.description,
});

export default function CarDetailingAnnArborMI() {
  return (
    <>
      <JsonLd data={locationLd} />
      <LocationPage {...content} />
    </>
  );
}
