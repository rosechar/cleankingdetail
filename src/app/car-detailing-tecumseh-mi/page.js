import { site } from '@/data/site';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Car Detailing in Tecumseh, MI | Clean King Detailing',
  description:
    'Professional car detailing & window tinting near Tecumseh, MI from $35–$160. Hand wash, interior deep clean, clay bar, ceramic tint — detailed by hand. A short drive south. Call (517) 682-1919.',
  keywords:
    'car detailing Tecumseh MI, car wash Tecumseh Michigan, auto detailing Tecumseh, window tinting Tecumseh MI, interior detailing Tecumseh, ceramic tint Tecumseh, headlight restoration Tecumseh, best car detailing near Tecumseh',
  openGraph: {
    title: 'Car Detailing in Tecumseh, MI | Clean King Detailing',
    description:
      'Hand car wash, auto detailing & ceramic window tinting for Tecumseh, MI drivers. Flat pricing from $35–$160.',
    url: '/car-detailing-tecumseh-mi',
  },
  alternates: {
    canonical: '/car-detailing-tecumseh-mi',
  },
};

const detailedServices = [
  {
    name: 'Hand Car Wash',
    desc: 'A careful two-bucket hand wash and foam bath that lifts road film and salt without swirling your paint — gentler than the automatic tunnels around town.',
  },
  {
    name: 'Interior Deep Clean',
    desc: 'Vacuum, shampoo and steam for seats, carpets and mats, clearing out the mud and salt that pile up over a Lenawee County winter.',
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
    desc: 'Professional ceramic film that cuts heat, glare and 99% of UV — a real difference on open M-50 drives and bright winter mornings.',
  },
  {
    name: 'Headlight Restoration',
    desc: 'Sand, polish and seal foggy, yellowed headlights back to clear for safer night driving and a fresher-looking front end.',
  },
];

const whyUs = [
  {
    name: 'Minutes Down US-223',
    desc: 'Family-owned in Blissfield, a short drive south of Tecumseh. Drop the car off, run your errands, pick it up looking new.',
  },
  {
    name: 'One Flat Price',
    desc: '$35 to $160, posted up front. No upsells and no "while we had it open" surprises when you come back.',
  },
  {
    name: 'Detailed By Hand',
    desc: "Every car is finished by hand, never run through a tunnel. It's the difference our Tecumseh repeat customers keep coming back for.",
  },
];

const content = {
  hero: {
    eyebrow: 'Tecumseh, Michigan',
    title: (
      <>
        Car detailing
        <br />
        in Tecumseh, MI
      </>
    ),
    lead: 'Hand car wash, full auto detailing and ceramic window tinting from $35–$160. Clean King is family-owned in Blissfield — a short drive south of Tecumseh — and every vehicle is detailed by hand.',
  },
  location: {
    eyebrow: 'Serving Tecumseh & Lenawee',
    title: 'An easy drive from Tecumseh',
    description:
      "We're based in Blissfield, just south of Tecumseh down US-223 — close enough to be your regular detailer, far enough from the automatic washes to do the job right. Tecumseh drivers come to Clean King for hand washing, interior detailing and ceramic tint that's built for Michigan roads and weather.",
    info: [
      { label: 'Shop', value: `${site.address1}, ${site.address2}` },
      { label: 'Phone', value: site.phone },
      { label: 'From Tecumseh', value: 'About 30 minutes via US-223' },
    ],
  },
  packages: {
    note: 'Flat, honest packages for Tecumseh vehicle owners.',
  },
  services: {
    title: 'What we do for Tecumseh drivers',
    note: 'From a careful hand wash to ceramic tint — the work that keeps a vehicle looking and lasting better.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why Tecumseh drivers make the trip',
    note: 'Local, honest, and detailed by hand — the way it should be.',
    items: whyUs,
  },
  cta: {
    eyebrow: 'Serving Tecumseh · Adrian · Blissfield · Lenawee County',
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
  areaName: 'Tecumseh',
  slug: 'car-detailing-tecumseh-mi',
  description: metadata.description,
});

export default function CarDetailingTecumsehMI() {
  return (
    <>
      <JsonLd data={locationLd} />
      <LocationPage {...content} />
    </>
  );
}
