import { Anton, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import './garage.css';
import Strip from '@/components/layout/Strip';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata = {
  metadataBase: new URL('https://www.cleankingdetail.com'),
  title: 'Car Detailing & Window Tinting in Blissfield, MI | Clean King',
  description:
    'Professional car detailing, window tinting & paint protection in Blissfield, MI. Hand-detailed packages from $35. Serving Adrian, Tecumseh & Lenawee County.',
  keywords:
    'car wash near me, car detailing near me, best car wash near me, best car detailing near me, auto wash, car cleaning services, window tinting near me, auto detailing near me, detailing near me, mobile car wash, car wash Blissfield MI, car detailing Blissfield MI, window tinting Blissfield MI, ceramic window tint, automotive window tinting, car window film, tint installation, UV protection tinting, car tinting, Clean King autodetail, Clean King carwash, detailer for car, paint correction, headlight restoration, leather cleaning, carpet cleaning, steam cleaning, pressure washing, car detailing Adrian MI, car wash Adrian MI, window tinting Adrian MI, car detailing Tecumseh MI, car wash Tecumseh MI, window tinting Tecumseh MI, Lenawee County car detailing, auto detailing, interior detailing, exterior detailing, engine bay cleaning, clay bar service, car waxing, car buffing',
  openGraph: {
    title: 'Car Detailing & Window Tinting in Blissfield, MI | Clean King',
    description:
      'Expert car wash, auto detailing and ceramic tint services from $35-$160. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.cleankingdetail.com/cleanking.jpg',
        width: 1200,
        height: 630,
        alt: 'Clean King Detailing - Professional Car Detailing & Window Tinting Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Detailing & Window Tinting in Blissfield, MI | Clean King',
    description: 'Car detailing & window tinting in Blissfield, MI',
    images: ['https://www.cleankingdetail.com/cleanking.jpg'],
  },
  other: {
    'geo.region': 'US-MI',
    'geo.placename': 'Blissfield',
  },
  icons: {
    icon: [{ rel: 'icon', url: '/favicon.ico' }],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/cleanking.png' }],
  },
  manifest: '/manifest.json',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  name: 'Clean King Detailing',
  image: 'https://www.cleankingdetail.com/cleanking.jpg',
  url: 'https://www.cleankingdetail.com',
  telephone: '(517) 682-1919',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '610 W Adrian St',
    addressLocality: 'Blissfield',
    addressRegion: 'MI',
    postalCode: '49228',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '41.836244',
    longitude: '-83.876009',
  },
  openingHours: ['Mo-Fr 09:00-18:00'],
  priceRange: '$35-$160',
  description:
    'Premier car wash, detailing and window tinting services in Blissfield, MI offering interior, exterior, full-service packages, professional car washing, and ceramic window tinting. Complete auto care and protection services.',
  areaServed: [
    {
      '@type': 'City',
      name: 'Blissfield',
    },
    {
      '@type': 'City',
      name: 'Adrian',
    },
    {
      '@type': 'City',
      name: 'Tecumseh',
    },
    {
      '@type': 'City',
      name: 'Monroe',
    },
    {
      '@type': 'County',
      name: 'Lenawee County',
    },
  ],
  sameAs: ['https://www.facebook.com/people/Clean-King/100063915012506/'],
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
  currenciesAccepted: 'USD',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Wash, Detailing & Window Tinting Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Interior Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Interior Detail',
            price: '110',
            priceCurrency: 'USD',
            description:
              'Comprehensive interior cleaning and detailing service including deep cleaning of seats, carpets, and all interior surfaces',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Exterior Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Spiffy Detail',
            price: '35',
            priceCurrency: 'USD',
            description:
              'Quick detail service including interior vacuum and exterior wash',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Full Detail',
            price: '140',
            priceCurrency: 'USD',
            description: 'Complete interior and exterior detailing service',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: 'Deluxe Detail',
            price: '160',
            priceCurrency: 'USD',
            description:
              'Premium detailing package including clay bar treatment and engine bay cleaning',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Window Tinting Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Window Tint',
            description:
              'Quality window tinting film installation for cars, trucks, and SUVs.',
            availability: 'https://schema.org/InStock',
            category: 'Window Tinting',
          },
        ],
      },
    ],
  },
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'On-site Service',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Professional Equipment',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Window Tinting Services',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Book Online Car Wash and Detail',
      value: true,
    },
  ],
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.cleankingdetail.com/appointment',
    },
    result: {
      '@type': 'Reservation',
      name: 'Car Detailing & Window Tinting Appointment',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${hanken.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <div className="ck-root" data-density="regular">
          <div className="ck-dir garage is-page" data-theme="dark">
            <Strip />
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
