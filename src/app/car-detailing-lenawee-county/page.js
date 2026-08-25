import { site } from '@/data/site';
import AddressLink from '@/components/ui/AddressLink';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

const SLUG = '/car-detailing-lenawee-county';

export const metadata = {
  title: 'Car Detailing in Lenawee County, MI — From $35 | Clean King',
  description:
    'Auto detailing, hand car wash & window tinting for all of Lenawee County, MI from $35–$160. Family-owned in Blissfield, serving Adrian, Tecumseh, Hudson, Morenci, Clinton, Deerfield and beyond. Call (517) 682-1919.',
  openGraph: {
    title: 'Car Detailing in Lenawee County, MI — From $35 | Clean King',
    description:
      'Hand car wash, full detailing and ceramic window tinting across Lenawee County, MI. Flat pricing from $35–$160.',
    url: SLUG,
  },
  alternates: {
    canonical: SLUG,
  },
};

const detailedServices = [
  {
    name: 'Work Truck & Farm Vehicle Detail',
    desc: 'Mud, feed dust and gravel are normal in this county. We vacuum and shampoo work trucks and SUVs down to the floor pans and pressure-clean the wheel wells and bed.',
  },
  {
    name: 'Salt & Brine Removal',
    desc: 'The Lenawee County road commission brines hard. A hand wash, door-jamb clean and undercarriage-adjacent rinse get it off before it eats at the rockers and clear coat.',
  },
  {
    name: 'Full & Deluxe Detail',
    desc: 'Interior shampoo plus exterior wash and wax ($140), or add engine bay and trunk for the Deluxe ($160). The two packages most county customers book once or twice a year.',
  },
  {
    name: 'Ceramic Window Tint',
    desc: 'Ceramic film for cars, trucks and SUVs that spend the day parked in open lots or driving wide-open county roads. Heat and UV rejection, priced per vehicle.',
  },
  {
    name: 'Clay Bar, Buff & Premium Wax',
    desc: 'À la carte paint work: clay to strip bonded contaminants, a machine buff to clear swirls, and a premium wax to protect it — $70–$110 depending on the job.',
  },
  {
    name: 'Pre-Sale & Lease-Return Detail',
    desc: 'Selling on Marketplace or turning in a lease? A Full Detail with headlight restoration is the cheapest way to add hundreds to the number you get back.',
  },
];

const whyUs = [
  {
    name: 'Central to the County',
    desc: 'Blissfield sits on US-223 in the southeast corner of Lenawee — 15 minutes from Adrian, 25 from Tecumseh, and an easy run from Deerfield, Palmyra, Ottawa Lake and Morenci.',
  },
  {
    name: 'Same Price for Everyone',
    desc: '$35 to $160, listed publicly and the same whether you drive in from Hudson or walk over from downtown Blissfield.',
  },
  {
    name: 'A Lenawee Family Business',
    desc: 'Owned and run locally, and every vehicle detailed by hand. Our reviews are from your neighbors, not from a franchise marketing team.',
  },
];

const content = {
  slug: SLUG,
  hero: {
    eyebrow: 'Lenawee County, Michigan',
    title: (
      <>
        Car detailing
        <br />
        across Lenawee County
      </>
    ),
    lead: 'Hand car wash, full auto detailing and ceramic window tint from $35–$160 for every corner of Lenawee County — Adrian, Tecumseh, Hudson, Morenci, Clinton, Deerfield and the townships in between. Family-owned in Blissfield.',
  },
  location: {
    eyebrow: 'Serving all of Lenawee',
    title: 'One shop for the whole county',
    description: [
      'Lenawee County is farm roads, brined highways and vehicles that work for a living, and that is what Clean King is set up for. From our shop on US-223 in Blissfield we detail everything from a farm pickup caked in spring mud to a Tecumseh minivan that has survived a season of travel ball.',
      'Wherever you are in the county — Adrian, Tecumseh, Hudson, Morenci, Onsted, Clinton, Britton, Deerfield or Palmyra — you are within about half an hour. Book online, drop the vehicle off in the morning, and pick it up the same day.',
    ],
    info: [
      { label: 'Shop', value: <AddressLink /> },
      { label: 'Phone', value: site.phone },
      {
        label: 'Coverage',
        value: 'All of Lenawee County, plus Monroe & Washtenaw neighbors',
      },
    ],
  },
  packages: {
    note: 'Flat, posted pricing for every vehicle in the county — from a $35 Spiffy to the $160 Deluxe.',
  },
  services: {
    title: 'Built for Lenawee County roads',
    note: 'The work that actually matters here: salt removal, deep interiors, paint protection and tint.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why the county trusts us',
    note: 'Central, honest, and local — a detail shop run by people who drive the same roads you do.',
    items: whyUs,
  },
  cta: {
    eyebrow:
      'Serving Adrian · Tecumseh · Blissfield · Hudson · Morenci · Clinton',
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
  areaType: 'County',
  areaName: 'Lenawee County',
  slug: SLUG.slice(1),
  description: metadata.description,
});

export default function CarDetailingLenaweeCounty() {
  return (
    <>
      <JsonLd data={locationLd} />
      <LocationPage {...content} />
    </>
  );
}
