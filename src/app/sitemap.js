import { SITE_URL } from '@/data/site';
import { AREA_LINKS } from '@/data/nav';

// Every indexable route. `lastModified` is the build time (the site is fully
// static, so a deploy is the only time content can change).
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
  const lastModified = new Date();
  return ROUTES.map(({ path, ...rest }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    ...rest,
  }));
}
