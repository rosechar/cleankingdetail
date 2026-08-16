import { PRICE_BOUNDS, SITE_URL } from './site';

// Per-page structured data for the city / county service-area pages.
// Declares the detailing service offered in a specific area and links it back
// to the single Clean King business entity defined in the root layout
// (@id `${SITE_URL}/#business`), so search engines treat these as
// service-area pages for one business rather than separate listings.
export function locationSchema({ areaType, areaName, slug, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Car detailing & window tinting',
    name: `Car Detailing in ${areaName}`,
    description,
    url: `${SITE_URL}/${slug}`,
    areaServed: { '@type': areaType, name: areaName },
    provider: { '@id': `${SITE_URL}/#business` },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: String(PRICE_BOUNDS[0]),
      highPrice: String(PRICE_BOUNDS[1]),
      priceCurrency: 'USD',
    },
  };
}
