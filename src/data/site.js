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
    id: 'spiffy-detail',
    name: 'Spiffy Detail',
    price: '$35',
    blurb:
      'Interior vacuum, exterior wash & windows cleaned — quick and affordable.',
    items: ['Interior vacuum', 'Exterior wash', 'Windows cleaned'],
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
  },
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
    popular: true,
  },
  {
    id: 'deluxe-detail',
    name: 'Deluxe Detail',
    price: '$160',
    blurb:
      'Everything in the Full Detail, taken further. Our ultimate service.',
    items: ['Premium full detail', 'Engine bay cleaning', 'Trunk cleaning'],
  },
  {
    id: 'a-la-carte',
    name: 'À La Carte',
    price: '$70–$110',
    blurb: 'Single services, your choice — buff out, clay, or a premium wax.',
    items: ['Clay bar treatment', 'Paint buffing', 'Premium wax'],
  },
];
