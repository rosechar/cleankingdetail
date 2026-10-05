// Site navigation, shared by the header, footer and sitemap so the three can
// never drift apart.

export const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  // Book: shown in the mobile menu only — the desktop header has the
  // "Book Now" button for that.
  { href: '/appointment', label: 'Book', mobileOnly: true },
  { href: '/contact', label: 'Contact' },
];

// City / county landing pages (footer, sitemap, "Proudly serving" chips).
// `label` is the short chip text; `linkText` is the footer link, worded as
// what the page is about — Google builds sitelink titles partly from internal
// link text, and a bare "Adrian" there is what it ends up showing.
export const AREA_LINKS = [
  {
    href: '/car-detailing-adrian-mi',
    label: 'Adrian',
    linkText: 'Adrian car detailing',
  },
  {
    href: '/car-detailing-tecumseh-mi',
    label: 'Tecumseh',
    linkText: 'Tecumseh car detailing',
  },
  {
    href: '/car-detailing-ann-arbor-mi',
    label: 'Ann Arbor',
    linkText: 'Ann Arbor car detailing',
  },
  {
    href: '/car-detailing-lenawee-county',
    label: 'Lenawee County',
    linkText: 'Lenawee County car detailing',
  },
];
