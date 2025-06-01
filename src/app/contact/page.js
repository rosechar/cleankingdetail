import ContactPage from './ContactPage';

export const metadata = {
  title:
    'Contact Clean King Detailing | Car Wash & Window Tinting Blissfield, MI',
  description:
    'Contact Clean King Detailing for car wash, auto detailing, and window tinting services. Located at 610 W Adrian St, Blissfield, MI. Call (517) 682-1919 for quotes and questions.',
  keywords:
    'contact car detailing Blissfield MI, Clean King phone number, car wash contact, window tinting contact, auto detailing contact Blissfield',
  openGraph: {
    title: 'Contact Clean King Detailing - Car Wash & Window Tinting',
    description:
      'Get in touch with Clean King Detailing. Located in Blissfield, MI serving Adrian, Tecumseh, and Lenawee County.',
    url: 'https://cleankingdetail.com/contact',
  },
  alternates: {
    canonical: 'https://cleankingdetail.com/contact',
  },
};

export default function Contact() {
  return <ContactPage />;
}
