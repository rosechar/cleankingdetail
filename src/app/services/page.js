import ServicesPage from './ServicesPage';

export const metadata = {
  title:
    'Car Detailing Services & Pricing - Clean King Detailing | Blissfield, MI',
  description:
    'Professional car wash and detailing services from $35-$160. Interior detail, exterior detail, full detail, window tinting. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.',
  keywords:
    'car detailing services Blissfield MI, car wash pricing, interior detail, exterior detail, full detail, deluxe detail, window tinting services, auto detailing packages',
  openGraph: {
    title: 'Car Detailing Services & Pricing - Clean King Detailing',
    description:
      'View our complete range of car wash, detailing, and window tinting services with transparent pricing from $35-$160.',
    url: 'https://cleankingdetail.com/services',
  },
  alternates: {
    canonical: 'https://cleankingdetail.com/services',
  },
};

export default function Services() {
  return <ServicesPage />;
}
