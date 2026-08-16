import { site } from '@/data/site';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Car Detailing in Adrian, MI | Clean King Detailing',
  description:
    'Professional car detailing in Adrian, MI from $35-$160. Interior/exterior detailing, clay bar, wax, buff, window tinting. Serving Adrian, Lenawee County. Call (517) 682-1919.',
  keywords:
    'car detailing Adrian MI, car wash Adrian Michigan, auto detailing Adrian, window tinting Adrian MI, clay bar Adrian, car wax Adrian, car buff Adrian, mobile car wash Adrian, best car detailing Adrian',
  openGraph: {
    title: 'Car Detailing in Adrian, MI | Clean King Detailing',
    description:
      'Professional car wash, detailing & window tinting in Adrian, MI. Clay bar, wax, buff services from $35-$160.',
    url: '/car-detailing-adrian-mi',
  },
  alternates: {
    canonical: '/car-detailing-adrian-mi',
  },
};

const detailedServices = [
  {
    name: 'Professional Car Wash',
    desc: "Hand wash and foam treatment to safely clean your vehicle's exterior, removing dirt, grime, and road salt common on Adrian area roads.",
  },
  {
    name: 'Clay Bar Treatment',
    desc: "Remove embedded contaminants from your paint surface that regular washing can't eliminate, leaving your car's paint smooth and ready for wax protection.",
  },
  {
    name: 'Wax & Buff Services',
    desc: "Professional waxing and buffing to protect your paint from Michigan's harsh weather conditions while restoring that showroom shine.",
  },
  {
    name: 'Interior Detailing',
    desc: 'Deep cleaning of seats, carpets, dashboard, and all interior surfaces. Perfect for removing winter salt stains and keeping your Adrian vehicle fresh.',
  },
  {
    name: 'Window Tinting',
    desc: "Professional ceramic window tint installation to reduce heat, glare, and UV rays. Especially beneficial for Adrian's sunny summer days and winter glare.",
  },
  {
    name: 'Engine Bay Cleaning',
    desc: "Thorough cleaning and degreasing of your engine bay, helping maintain your vehicle's performance and resale value.",
  },
];

const whyUs = [
  {
    name: 'Local Expertise',
    desc: 'Family-owned in Blissfield, just minutes from Adrian. We know what Michigan roads and winters do to your vehicle.',
  },
  {
    name: 'Transparent Pricing',
    desc: 'Flat, honest pricing from $35 to $160 — no surprises, no upsells. You know the cost before we start.',
  },
  {
    name: '5-Star Service',
    desc: 'Every vehicle detailed by hand with the care that earns repeat customers across Lenawee County.',
  },
];

const content = {
  hero: {
    eyebrow: 'Adrian, Michigan',
    title: (
      <>
        Car detailing
        <br />
        in Adrian, MI
      </>
    ),
    lead: 'Expert auto wash, detailing & window tinting services from $35–$160. Clean King proudly serves Adrian, Tecumseh and the wider Lenawee County area — every vehicle detailed by hand.',
  },
  location: {
    eyebrow: 'Serving Adrian & Lenawee',
    title: 'Adrian, Tecumseh, Lenawee & surrounding areas',
    description:
      "Clean King Detailing is just 15 minutes from Adrian down US-223, so dropping the car off is easy — whether you're an Adrian College or Siena Heights student cleaning up before break, a downtown Adrian business keeping a work vehicle sharp, or a family shaking off a Michigan winter. We hand wash, detail and ceramic tint for Adrian drivers who want the job done right, not rushed through a tunnel.",
    info: [
      { label: 'Shop', value: `${site.address1}, ${site.address2}` },
      { label: 'Phone', value: site.phone },
      { label: 'From Adrian', value: 'Just 15 minutes via US-223' },
    ],
  },
  packages: {
    note: 'Professional auto care tailored for Adrian vehicle owners.',
  },
  services: {
    title: 'Comprehensive auto care in Adrian',
    note: 'From hand washes to ceramic tint — everything your Adrian vehicle needs in one shop.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why Adrian drivers choose us',
    note: 'Local, honest, and detailed by hand — the way it should be.',
    items: whyUs,
  },
  cta: {
    eyebrow: 'Serving Adrian · Blissfield · Tecumseh · Monroe · Lenawee County',
    title: (
      <>
        Ready to detail
        <br />
        your vehicle in Adrian?
      </>
    ),
  },
};

const locationLd = locationSchema({
  areaType: 'City',
  areaName: 'Adrian',
  slug: 'car-detailing-adrian-mi',
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
