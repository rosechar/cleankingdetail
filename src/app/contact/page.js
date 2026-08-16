import ContactPage from './ContactPage';
import { faqs, faqJsonLd } from '@/data/faqs';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'Contact Clean King Detailing | Blissfield, MI',
  description:
    'Contact Clean King Detailing for car wash, auto detailing, and window tinting services. Located at 610 W Adrian St, Blissfield, MI. Call (517) 682-1919 for quotes and questions.',
  openGraph: {
    title: 'Contact Clean King Detailing | Blissfield, MI',
    description:
      'Get in touch with Clean King Detailing. Located in Blissfield, MI serving Adrian, Tecumseh, and Lenawee County.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

const faqSchema = faqJsonLd(faqs);

export default function Contact() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <ContactPage />
    </>
  );
}
