import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});

export const metadata = {
  metadataBase: new URL('https://cleankingdetail.com'),
  title:
    'Clean King Detailing | Professional Car Detailing Services in Blissfield, MI',
  description:
    'Premier car detailing in Blissfield, MI. From quick $35 Spiffy Details to comprehensive $160 Deluxe Details. Professional interior, exterior, engine bay cleaning & more. Serving Lenawee County.',
  keywords:
    'car detailing Blissfield MI, auto detailing, interior detailing, exterior detailing, Clean King Detailing, engine bay cleaning, clay bar service, car waxing, car buffing, Lenawee County car detailing, car cleaning near me',
  openGraph: {
    title: 'Clean King Detailing - Professional Car Detailing in Blissfield',
    description:
      'Expert car detailing services from $35-$160. Interior, exterior, and full-service packages available. Serving Blissfield and Lenawee County.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.cleankingdetail.com/cleanking.jpg',
        width: 1200,
        height: 630,
        alt: 'Clean King Detailing - Professional Car Detailing Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean King Detailing - Professional Car Detailing Services',
    description: 'Expert car detailing services in Blissfield, MI',
    images: ['https://www.cleankingdetail.com/cleanking.jpg'],
  },
  other: {
    'geo.region': 'US-MI',
    'geo.placename': 'Blissfield',
  },
  icons: {
    icon: [{ rel: 'icon', url: '/favicon.ico' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoWash',
              name: 'Clean King Detailing',
              image: 'https://cleankingdetail.com/images/cleanking.jpg',
              url: 'https://cleankingdetail.com',
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
                latitude: '41.832791',
                longitude: '-83.873159',
              },
              openingHours: ['Mo-Fr 09:00-17:00', 'Sa 10:00-15:00'],
              priceRange: '$35-$160',
              description:
                'Premier car detailing services in Blissfield, MI offering interior, exterior, and full-service packages. Professional car cleaning, waxing, and protection services.',
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Blissfield',
                },
                {
                  '@type': 'County',
                  name: 'Lenawee County',
                },
              ],
              sameAs: [
                'https://www.facebook.com/people/Clean-King/100063915012506/',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                bestRating: '5',
              },
              paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
              currenciesAccepted: 'USD',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Car Detailing Services',
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
                        description:
                          'Complete interior and exterior detailing service',
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
              ],
              potentialAction: {
                '@type': 'ReserveAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://cleankingdetail.com/appointment',
                },
                result: {
                  '@type': 'Reservation',
                  name: 'Car Detailing Appointment',
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} bg-gray-100 font-sans text-black antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <SpeedInsights />
      </body>
    </html>
  );
}
