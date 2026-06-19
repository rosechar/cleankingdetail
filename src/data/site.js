// Clean King — shared site content used across the Garage design pages.
export const site = {
  phone: '(517) 682-1919',
  phoneHref: 'tel:5176821919',
  address1: '610 W Adrian St',
  address2: 'Blissfield, MI 49228',
  facebook: 'https://www.facebook.com/people/Clean-King/100063915012506/',
  google: 'https://www.google.com/maps?cid=11223607935664648783',
  tagline: 'The King of Clean',
  hoursNote: 'Mon–Fri · 9 AM – 6 PM',
  areas: ['Blissfield', 'Adrian', 'Tecumseh', 'Monroe', 'Lenawee County'],
  // Google review summary shown as the hero trust strip. IMPORTANT: keep these
  // in sync with your live Google Business Profile — `score` is the average
  // rating, `count` is how many reviews you have. Set `count` to null to show
  // just "on Google" without a number (use this until you've confirmed the
  // exact count). Links to `site.google`.
  rating: { score: '5.0', count: null },
  reviews: [
    {
      quote:
        'Did a great job, exceeded my expectations on my Ford Explorer. Would definitely recommend.',
      name: 'Keven',
      car: 'Ford Explorer',
    },
    {
      quote: 'Such a great job!! Will be back! And will pass the word!!',
      name: 'Theresa',
    },
    {
      quote: 'Great experience. They went the extra mile for us. Will be back.',
      name: 'Sarah',
    },
  ],
  // "Our Work" gallery on the home page. Each entry renders a tile.
  //   • Single result photo: set `src` to a file in /public.
  //   • Before/after pair:   set `before` and `after` (each a /public file);
  //     the tile shows the "after" and reveals the "before" on hover/focus.
  //   • No photo yet:        omit images and a labelled placeholder shows, so
  //     the section still looks intentional until real photos are dropped in.
  // `tag` is the small accent label; `label` names the work. Empty this array
  // to hide the whole section. Replace the placeholders below with real shots
  // (your Facebook album is a good source) to make this section convert.
  gallery: [
    { label: 'Wheels & Tires', tag: 'Deluxe Detail', src: '/tire.webp' },
    { label: 'Interior Detail', tag: 'Interior' },
    { label: 'Full Detail', tag: 'Exterior' },
    { label: 'Paint Correction', tag: 'À la carte' },
    { label: 'Engine Bay', tag: 'Deluxe Detail' },
    { label: 'Ceramic Tint', tag: 'Add-on' },
  ],
  alacarte: {
    price: '$70–$110',
    items: ['Clay bar treatment', 'Paint buffing', 'Premium wax'],
  },
  addons: [
    {
      name: 'Ceramic Window Tint',
      desc: 'UV-blocking, heat-rejecting ceramic film that keeps interiors cooler and guards against fade. Priced per vehicle — ask for a quote.',
    },
    {
      name: 'Paint Protection',
      desc: 'A long-lasting sealant that shields your finish from Michigan road salt, sun and grime. Add it to any detail package.',
    },
  ],
};

// Canonical detail packages — shared by the home preview, services page and
// booking picker. Copy from the design handoff.
export const packages = [
  {
    id: 'full-detail',
    name: 'Full Detail',
    price: '$140',
    blurb:
      'The complete package — a spotless interior plus a washed & waxed exterior.',
    items: [
      'Complete interior detail',
      'Exterior wash & wax',
      'Wheels & tires',
    ],
    // Full line-item breakdown shown on the services page.
    details: [
      'Exterior Wash',
      'Chamois Dry',
      'Clean Door Jambs',
      'Clean & Condition Tires',
      'Clean Wheels',
      'All Glass Cleaned (Interior & Exterior)',
      'Spray Wax',
    ],
    includesText: 'Includes interior detail services',
    includes: [
      'Upholstery Vacuumed & Shampooed',
      'Carpets Vacuumed & Shampooed',
      'Dashboard Cleaned & Conditioned',
      'Door Panels Cleaned & Conditioned',
      'Instrument Panel Cleaned',
      'Air Vents Cleaned',
      'Leather Seats Cleaned & Conditioned',
      'All Glass Cleaned (Interior Only)',
      'Vacuum Interior & Trunk',
    ],
    popular: true,
  },
  {
    id: 'spiffy-detail',
    name: 'Spiffy Detail',
    price: '$35',
    blurb:
      'Interior vacuum, exterior wash & windows cleaned — quick and affordable.',
    items: ['Interior vacuum', 'Exterior wash', 'Windows cleaned'],
    details: ['Exterior Wash', 'Interior Vacuum', 'Interior Glass Cleaned'],
  },
  {
    id: 'interior-detail',
    name: 'Interior Detail',
    price: '$110',
    blurb: 'A deep clean inside and out of every surface in the cabin.',
    items: [
      'Deep interior clean',
      'Seat & carpet shampoo',
      'Dashboard detail',
      'Leather treatment',
    ],
    details: [
      'Upholstery Vacuumed & Shampooed',
      'Carpets Vacuumed & Shampooed',
      'Dashboard Cleaned & Conditioned',
      'Door Panels Cleaned & Conditioned',
      'Instrument Panel Cleaned',
      'Air Vents Cleaned',
      'Leather Seats Cleaned & Conditioned',
      'All Glass Cleaned (Interior Only)',
      'Vacuum Interior',
    ],
  },
  {
    id: 'deluxe-detail',
    name: 'Deluxe Detail',
    price: '$160',
    blurb:
      'Everything in the Full Detail, taken further. Our ultimate service.',
    items: ['Premium full detail', 'Engine bay cleaning', 'Trunk cleaning'],
    details: [
      'Vacuum Trunk',
      'Clean Trunk Channels',
      'Clean & Condition Engine Bay',
    ],
    includesText: 'Includes full detail services',
    includes: [
      'Upholstery Vacuumed & Shampooed',
      'Carpets Vacuumed & Shampooed',
      'Dashboard Cleaned & Conditioned',
      'Door Panels Cleaned & Conditioned',
      'Instrument Panel Cleaned',
      'Air Vents Cleaned',
      'Leather Seats Cleaned & Conditioned',
      'All Glass Cleaned (Interior Only)',
      'Vacuum Interior & Trunk',
      'Exterior Wash',
      'Chamois Dry',
      'Clean Door Jambs',
      'Clean & Condition Tires',
      'Clean Wheels',
      'All Glass Cleaned (Interior & Exterior)',
      'Spray Wax',
    ],
  },
  {
    id: 'a-la-carte',
    name: 'À La Carte',
    price: '$70–$110',
    blurb: 'Single services, your choice — buff out, clay, or a premium wax.',
    items: ['Clay bar treatment', 'Paint buffing', 'Premium wax'],
    details: ['Clay Bar Treatment', 'Paint Buffing', 'Premium Wax'],
  },
];
