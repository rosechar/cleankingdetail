import { SITE_URL } from '@/data/site';
import { AREA_LINKS } from '@/data/nav';

// Every indexable route. No `lastModified`: stamping the build time on every
// URL each deploy just teaches crawlers to ignore the field.
const ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/appointment', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  ...AREA_LINKS.map(({ href }) => ({
    path: href,
    changeFrequency: 'monthly',
    priority: 0.8,
  })),
];

export default function sitemap() {
  return ROUTES.map(({ path, ...rest }) => ({
    url: `${SITE_URL}${path}`,
    ...rest,
  }));
}
