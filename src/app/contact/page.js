import ContactPage from './ContactPage';
import { faqs } from '@/data/faqs';

export const metadata = {
  title: 'Contact Clean King Detailing | Blissfield, MI',
  description:
    'Contact Clean King Detailing for car wash, auto detailing, and window tinting services. Located at 610 W Adrian St, Blissfield, MI. Call (517) 682-1919 for quotes and questions.',
  keywords:
    'contact car detailing Blissfield MI, Clean King phone number, car wash contact, window tinting contact, auto detailing contact Blissfield',
  openGraph: {
    title: 'Contact Clean King Detailing | Blissfield, MI',
    description:
      'Get in touch with Clean King Detailing. Located in Blissfield, MI serving Adrian, Tecumseh, and Lenawee County.',
    url: 'https://www.cleankingdetail.com/contact',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/contact',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
};

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactPage />
    </>
  );
}
