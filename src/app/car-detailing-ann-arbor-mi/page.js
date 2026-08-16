import { site } from '@/data/site';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

const SLUG = '/car-detailing-ann-arbor-mi';

export const metadata = {
  title: 'Car Detailing near Ann Arbor, MI | Clean King Detailing',
  description:
    'Ann Arbor-quality car detailing at small-town prices, from $35–$160. Hand wash, interior deep clean, paint correction and ceramic tint in Blissfield, about 45 minutes south on US-23. Call (517) 682-1919.',
  openGraph: {
    title: 'Car Detailing near Ann Arbor, MI | Clean King Detailing',
    description:
      'Hand car wash, auto detailing & ceramic window tinting for Ann Arbor, MI drivers. Flat pricing from $35–$160.',
    url: SLUG,
  },
  alternates: {
    canonical: SLUG,
  },
};

const detailedServices = [
  {
    name: 'Full Detail — $140',
    desc: 'The package Ann Arbor drivers compare us on: complete interior shampoo and conditioning plus a hand wash, jambs, wheels, glass and wax. Typically half of what the same job costs inside the city.',
  },
  {
    name: 'Interior Deep Clean',
    desc: 'Upholstery, carpets, leather, vents and dash — vacuumed, shampooed, steamed and conditioned. Ideal for a student car heading home for the summer or a lease coming due.',
  },
  {
    name: 'Paint Correction & Premium Wax',
    desc: 'Clay bar, machine buff and a premium hand wax to clear swirls from years of touchless washes and bring the depth back to dark paint. À la carte, $70–$110.',
  },
  {
    name: 'Ceramic Window Tint',
    desc: 'Ceramic film that cuts heat and glare on US-23 and I-94 and keeps a car parked in a structure all day from turning into an oven. Priced per vehicle.',
  },
  {
    name: 'Deluxe Detail with Engine Bay',
    desc: 'Everything in the Full Detail plus a cleaned and dressed engine bay and trunk — the pre-sale detail for anyone listing a car in a competitive Ann Arbor market.',
  },
  {
    name: 'Headlight Restoration',
    desc: 'Sand, polish and UV-seal cloudy lenses. Cheap insurance for night driving on M-14 and one of the biggest visual upgrades per dollar on an older car.',
  },
];

const whyUs = [
  {
    name: 'A Straight Shot on US-23',
    desc: 'South on US-23 to the US-223 exit, then west to Blissfield — about 45 minutes door to door. Combine it with a Cabela’s or Toledo run and the drive is a wash.',
  },
  {
    name: 'Small-Town Pricing',
    desc: '$35 to $160 for the same interior-and-exterior work you would pay considerably more for near campus or in Saline. Prices are posted, no quotes needed.',
  },
  {
    name: 'Detailed By Hand',
    desc: 'Family-owned, hand-washed and hand-finished. No conveyor, no brush tunnel — the reason people who could go anywhere in Ann Arbor make the trip.',
  },
];

const content = {
  slug: SLUG,
  hero: {
    eyebrow: 'Ann Arbor, Michigan',
    title: (
      <>
        Car detailing
        <br />
        near Ann Arbor, MI
      </>
    ),
    lead: 'City-quality hand detailing without the city price. Clean King is a family-owned shop in Blissfield, about 45 minutes south of Ann Arbor on US-23, with flat-priced packages from $35–$160.',
  },
  location: {
    eyebrow: 'Serving Ann Arbor & Washtenaw',
    title: 'Why Ann Arbor drivers head south',
    description: [
      'We will be honest: Blissfield is not around the corner from Ann Arbor. It is about 45 minutes down US-23. Ann Arbor customers come anyway because a hand-done Full Detail here runs $140 with no add-on surprises, and a car dropped off at 9:30 is ready the same afternoon.',
      'It works best as a planned trip — a student car before a move-out, a lease return, a car you are about to sell, or a family vehicle that has not had a real interior clean in years. Book the package online, drive down, grab lunch in town, and drive home in a car that looks new.',
    ],
    info: [
      { label: 'Shop', value: `${site.address1}, ${site.address2}` },
      { label: 'Phone', value: site.phone },
      { label: 'From Ann Arbor', value: 'About 45 minutes via US-23 & US-223' },
    ],
  },
  packages: {
    note: 'Flat prices, posted up front — most Ann Arbor customers book the Full or Deluxe Detail to make the trip count.',
  },
  services: {
    title: 'What we do for Ann Arbor drivers',
    note: 'The full-value jobs that justify the drive: deep interiors, paint correction, ceramic tint and pre-sale details.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why Ann Arbor drivers make the trip',
    note: 'A predictable drive, predictable pricing, and a finish you will not get from a touchless wash.',
    items: whyUs,
  },
  cta: {
    eyebrow: 'Serving Ann Arbor · Saline · Milan · Lenawee County',
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
  slug: SLUG.slice(1),
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
