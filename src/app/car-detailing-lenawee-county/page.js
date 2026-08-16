import { site } from '@/data/site';
import { locationSchema } from '@/data/locationSchema';
import LocationPage from '@/components/location/LocationPage';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Car Detailing in Lenawee County, MI | Clean King Detailing',
  description:
    'Auto detailing, hand car wash & window tinting across Lenawee County, MI from $35–$160. Serving Adrian, Tecumseh, Blissfield, Hudson, Morenci, Clinton and beyond — detailed by hand. Call (517) 682-1919.',
  keywords:
    'car detailing Lenawee County, auto detailing Lenawee County MI, car wash Lenawee County, window tinting Lenawee County, mobile detailing Lenawee, detailing Hudson MI, detailing Morenci MI, detailing Clinton MI, detailing Onsted MI',
  openGraph: {
    title: 'Car Detailing in Lenawee County, MI | Clean King Detailing',
    description:
      'Hand car wash, full detailing and ceramic window tinting across Lenawee County, MI. Flat pricing from $35–$160.',
    url: '/car-detailing-lenawee-county',
  },
  alternates: {
    canonical: '/car-detailing-lenawee-county',
  },
};

const detailedServices = [
  {
    name: 'Exterior Hand Wash',
    desc: 'Hand wash and foam bath that strips the gravel dust, farm-road grime and winter salt that coat vehicles all over rural Lenawee.',
  },
  {
    name: 'Full Interior Detail',
    desc: 'Deep vacuum, shampoo and conditioning for work trucks and family cars alike — built for boots, kids and county-road mud.',
  },
  {
    name: 'Paint Clay & Polish',
    desc: 'Clay decontamination and light polishing to pull embedded grit out of the finish and bring back depth a basic wash never can.',
  },
  {
    name: 'Wax & Paint Protection',
    desc: "Hand wax, sealant or ceramic protection to shield your paint through Lenawee's full range of weather — August sun to February brine.",
  },
  {
    name: 'Ceramic Window Tinting',
    desc: 'Heat- and UV-rejecting ceramic tint, professionally installed for comfort on long county and US-223 drives.',
  },
  {
    name: 'Engine Bay & Wheels',
    desc: 'Degrease the engine bay and deep-clean wheels, tires and barrels — the finishing details that protect resale value.',
  },
];

const whyUs = [
  {
    name: 'Central to the County',
    desc: "Based in Blissfield, we're an easy drive from Adrian, Tecumseh, Hudson, Morenci, Clinton, Onsted and everywhere between.",
  },
  {
    name: 'Honest, Flat Pricing',
    desc: '$35 to $160, the same for everyone and posted before we start. Small-town pricing without the runaround.',
  },
  {
    name: 'Hand-Detailed, Every Time',
    desc: 'No conveyor tunnels. Every vehicle is washed and detailed by hand — the standard that has earned us repeat customers countywide.',
  },
];

const content = {
  hero: {
    eyebrow: 'Lenawee County, Michigan',
    title: (
      <>
        Car detailing
        <br />
        across Lenawee County
      </>
    ),
    lead: 'Professional auto detailing, hand washing and window tinting from $35–$160, serving every corner of Lenawee County. Family-owned in Blissfield and detailed by hand — from Adrian and Tecumseh to Hudson, Morenci and Clinton.',
  },
  location: {
    eyebrow: 'Serving all of Lenawee',
    title: 'One shop for the whole county',
    description:
      "Clean King Detailing is rooted in Blissfield, near the heart of Lenawee County. We detail cars, trucks and work vehicles for residents and businesses across the county — Adrian, Tecumseh, Hudson, Morenci, Clinton, Onsted, Britton, Deerfield and Sand Creek included. Rural roads, farm dust and Michigan winters are hard on a finish; we're the shop that does it by hand.",
    info: [
      { label: 'Shop', value: `${site.address1}, ${site.address2}` },
      { label: 'Phone', value: site.phone },
      { label: 'Coverage', value: 'All of Lenawee County' },
    ],
  },
  packages: {
    note: 'The same flat pricing countywide.',
  },
  services: {
    title: 'Built for Lenawee County roads',
    note: 'From gravel-road dust to winter salt — everything your vehicle needs to look right and last longer.',
    items: detailedServices,
  },
  whyUs: {
    title: 'Why the county trusts us',
    note: 'Local, honest, and detailed by hand — the way it should be.',
    items: whyUs,
  },
  cta: {
    eyebrow:
      'Adrian · Tecumseh · Blissfield · Hudson · Morenci · Clinton · Onsted',
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
  areaType: 'AdministrativeArea',
  areaName: 'Lenawee County',
  slug: 'car-detailing-lenawee-county',
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
