import { site } from '@/data/site';
import AddressLink from '@/components/ui/AddressLink';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

const SLUG = '/car-detailing-tecumseh-mi';

export const metadata = {
  title: 'Car Detailing in Tecumseh, MI — From $35, Same-Day | Clean King',
  description:
    'Car detailing & ceramic window tint for Tecumseh, MI from $35–$160. Hand-washed, interior deep clean, wax and paint sealant at our Blissfield shop, about 25 minutes south. Call (517) 682-1919.',
  openGraph: {
    title: 'Car Detailing in Tecumseh, MI — From $35, Same-Day | Clean King',
    description:
      'Hand car wash, interior detailing & ceramic tint for Tecumseh, MI drivers. Flat pricing from $35–$160.',
    url: SLUG,
  },
  alternates: {
    canonical: SLUG,
  },
};

const detailedServices = [
  {
    name: 'Full Interior Detail',
    desc: 'Every cabin surface — upholstery and carpets shampooed, leather cleaned and conditioned, vents, dash and door panels finished. The reset a family SUV needs after a season of Tecumseh youth sports and lake trips.',
  },
  {
    name: 'Hand Wash & Wax',
    desc: 'Foam, two-bucket hand wash, chamois dry and a spray wax over the whole body. Gentle enough for dark paint, thorough enough to clear the salt film that builds up on M-50.',
  },
  {
    name: 'Paint Correction & Buffing',
    desc: 'Machine buff to knock down swirls and light scratches, then a premium wax to hold the shine — an à la carte option popular with owners of classics and weekend cars.',
  },
  {
    name: 'Ceramic Window Tint',
    desc: 'Ceramic film blocks 99% of UV and a big share of the heat, so the cabin stays cooler on the drive down M-52 and your dash and seats do not fade. Priced per vehicle.',
  },
  {
    name: 'Paint Sealant',
    desc: 'A long-lasting sealant layered on after a wash and clay bar. Beads water, sheds brine, and buys your clear coat time between waxes.',
  },
  {
    name: 'Trunk & Cargo Cleanup',
    desc: 'Vacuum, spot-clean and dress the trunk or cargo area and its channels — usually the dirtiest, most forgotten part of a family vehicle.',
  },
];

const whyUs = [
  {
    name: 'About 25 Minutes South',
    desc: 'M-52 south to Adrian, then US-223 east, or the back way through Britton and Deerfield. Either way you are at our door in Blissfield in under half an hour.',
  },
  {
    name: 'No Surprise Add-Ons',
    desc: '$35 to $160 across five packages, priced on the site. If your vehicle needs something extra we tell you before we start, not at pickup.',
  },
  {
    name: 'Detailed By Hand',
    desc: 'Nothing goes through a tunnel. Every car is washed and finished by hand, which is what brings Tecumseh customers back for a second and third detail.',
  },
];

const content = {
  slug: SLUG,
  hero: {
    eyebrow: 'Tecumseh, Michigan',
    title: (
      <>
        Car detailing
        <br />
        in Tecumseh, MI
      </>
    ),
    lead: 'Hand car wash, full interior detailing and ceramic window tint from $35–$160. Clean King is a family-owned shop in Blissfield, about 25 minutes south of Tecumseh, and every vehicle is finished by hand.',
  },
  location: {
    eyebrow: 'Serving Tecumseh & Lenawee',
    title: 'Worth the drive from Tecumseh',
    description: [
      'Tecumseh has plenty of places to run a car through a wash, but not many that will hand-shampoo the carpets, condition the leather and clay the paint. That is the work we do at Clean King, and it is why drivers from Tecumseh, Clinton and Britton make the trip down to Blissfield.',
      'Take M-52 south to Adrian and US-223 east, or cut across through Britton and Deerfield — about 25 minutes either way. Drop the car off between 9:30 and 10, and it is ready to go home the same afternoon.',
    ],
    info: [
      { label: 'Shop', value: <AddressLink /> },
      { label: 'Phone', value: site.phone },
      { label: 'From Tecumseh', value: 'About 25 minutes via M-52 & US-223' },
    ],
  },
  packages: {
    note: 'Five flat-priced packages — the Full Detail is the one most Tecumseh families book.',
  },
  services: {
    title: 'What we do for Tecumseh drivers',
    note: 'Interior deep cleans, hand waxing, paint correction and ceramic tint — the jobs a quick wash cannot do.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why Tecumseh drivers make the trip',
    note: 'A short drive south, honest pricing, and a car that comes back looking new.',
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
  slug: SLUG.slice(1),
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
