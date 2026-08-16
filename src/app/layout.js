import { Anton, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileCTA from '@/components/layout/MobileCTA';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import JsonLd from '@/components/seo/JsonLd';
import { packages, PRICE_BOUNDS, site, SITE_URL } from '@/data/site';

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
  metadataBase: new URL(SITE_URL),
  title: 'Car Detailing & Window Tinting in Blissfield, MI | Clean King',
  description:
    'Professional car detailing, window tinting & paint protection in Blissfield, MI. Hand-detailed packages from $35. Serving Adrian, Tecumseh & Lenawee County.',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: site.name,
    url: '/',
    title: 'Car Detailing & Window Tinting in Blissfield, MI | Clean King',
    description:
      'Expert car wash, auto detailing and ceramic tint services from $35-$160. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Detailing & Window Tinting in Blissfield, MI | Clean King',
    description:
      'Professional car detailing, window tinting & paint protection in Blissfield, MI. Hand-detailed packages from $35.',
  },
  other: {
    'geo.region': 'US-MI',
    'geo.placename': 'Blissfield',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#0d0d0f',
};

// schema.org LocalBusiness entity for the shop. Location pages reference it
// by `@id`, so keep that stable. Business facts come from `site` and prices
// from `packages` so this can never drift from what the pages show.
const offerFor = (p) => ({
  '@type': 'Offer',
  name: p.name,
  description: p.blurb,
  priceCurrency: 'USD',
  availability: 'https://schema.org/InStock',
  ...(Array.isArray(p.amount)
    ? {
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: p.amount[0],
          maxPrice: p.amount[1],
          priceCurrency: 'USD',
        },
      }
    : { price: String(p.amount) }),
});

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoWash',
  '@id': `${SITE_URL}/#business`,
  name: site.name,
  image: [`${SITE_URL}/tire.webp`, `${SITE_URL}/cleanking.jpg`],
  logo: `${SITE_URL}/cleanking.png`,
  url: SITE_URL,
  hasMap: site.google,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  openingHours: site.openingHours,
  priceRange: `$${PRICE_BOUNDS[0]}-$${PRICE_BOUNDS[1]}`,
  description:
    'Premier car wash, detailing and window tinting services in Blissfield, MI offering interior, exterior, full-service packages, professional car washing, and ceramic window tinting. Complete auto care and protection services.',
  areaServed: [
    ...['Blissfield', 'Adrian', 'Tecumseh', 'Monroe', 'Ann Arbor'].map(
      (name) => ({ '@type': 'City', name })
    ),
    ...['Lenawee County', 'Washtenaw County'].map((name) => ({
      '@type': 'County',
      name,
    })),
  ],
  sameAs: [site.facebook, site.google],
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
  currenciesAccepted: 'USD',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Wash, Detailing & Window Tinting Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Detailing Packages',
        itemListElement: packages.map(offerFor),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Add-ons',
        itemListElement: site.addons.map((a) => ({
          '@type': 'Offer',
          name: a.name,
          description: a.desc,
          availability: 'https://schema.org/InStock',
        })),
      },
    ],
  },
  amenityFeature: [
    'On-site Service',
    'Professional Equipment',
    'Window Tinting Services',
    'Book Online Car Wash and Detail',
  ].map((name) => ({
    '@type': 'LocationFeatureSpecification',
    name,
    value: true,
  })),
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/appointment`,
    },
    result: {
      '@type': 'Reservation',
      name: 'Car Detailing & Window Tinting Appointment',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${hanken.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-100 bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <JsonLd data={structuredData} />
        <div className="relative min-h-screen w-full overflow-x-clip">
          {/* faint engineering grid that fades down the page */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-28"
          />
          <div className="relative z-1">
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileCTA />
          </div>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
