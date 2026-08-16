export const faqs = [
  {
    id: 1,
    question: 'Can I book a detail service appointment online?',
    answer:
      'You can submit a request for an appointment, after which we will contact you to confirm the details of your appointment.',
  },
  {
    id: 2,
    question: 'What time should I drop off my vehicle?',
    answer:
      'To ensure we can deliver the highest quality detail, we ask that you drop off your vehicle between 9:30 AM - 10:00 AM. This allows us enough time to give your vehicle the thorough attention it deserves!',
  },
  {
    id: 3,
    question: 'Do I need to prepare my car before the service?',
    answer:
      'Please remove all personal belongings from your vehicle. We recommend emptying the trunk and interior of any items not part of the car.',
  },
  {
    id: 4,
    question: 'What is your cancellation policy?',
    answer:
      'We ask for at least 24-hour notice for cancellations or reschedules.',
  },
  {
    id: 5,
    question: 'What areas do you serve for car detailing services?',
    answer:
      'We proudly serve Adrian, Blissfield, Tecumseh, Monroe and Lenawee County, Michigan.',
  },
  {
    id: 6,
    question: 'How long does a full car detail take?',
    answer:
      "A complete car detailing service typically takes 3-6 hours depending on your vehicle's size and condition. We serve Adrian, Blissfield, and Tecumseh customers with same-day service when you drop off in the morning.",
  },
  {
    id: 7,
    question: 'How often should I get my car detailed in Michigan?',
    answer:
      "Due to Michigan's harsh winters with road salt and variable weather conditions, we recommend professional detailing every 3-4 months. This helps protect your vehicle from salt damage year-round.",
  },
  {
    id: 8,
    question: 'Do you detail trucks and SUVs in the Tecumseh area?',
    answer:
      'Absolutely! We detail all vehicle types including cars, trucks, SUVs, and vans. Our Tecumseh, Adrian, Monroe, and surrounding area customers love our specialized attention to larger vehicles.',
  },
];

/** Ids of the questions worth answering on the services page. */
export const SERVICES_FAQ_IDS = [6, 2, 3, 1, 4, 7];
export const servicesFaqs = SERVICES_FAQ_IDS.map((id) =>
  faqs.find((f) => f.id === id)
).filter(Boolean);

/**
 * Questions shared by every service-area landing page (booking / drop-off /
 * turnaround), followed by the area's own questions from `areaFaqs`.
 */
const AREA_COMMON_IDS = [1, 2, 6];
const areaCommon = AREA_COMMON_IDS.map((id) =>
  faqs.find((f) => f.id === id)
).filter(Boolean);

export const areaFaqs = {
  '/car-detailing-adrian-mi': [
    {
      id: 'adrian-distance',
      question: 'How far is Clean King from Adrian?',
      answer:
        'About 15 minutes. From downtown Adrian or the Adrian Mall take US-223 east and we are at 610 W Adrian St in Blissfield, right on the way toward Toledo.',
    },
    {
      id: 'adrian-mobile',
      question: 'Do you offer mobile detailing in Adrian?',
      answer:
        'No — every vehicle is detailed by hand at our shop in Blissfield, where we have the water, power and lighting to do the job properly. Drop off between 9:30 and 10:00 AM and most details are ready the same day.',
    },
    {
      id: 'adrian-price',
      question: 'Is pricing the same for Adrian customers?',
      answer:
        'Yes. Every package is flat-priced from $35 to $160 and posted on our services page — the price you see online is the price you pay, wherever you drive in from.',
    },
  ],
  '/car-detailing-tecumseh-mi': [
    {
      id: 'tecumseh-distance',
      question: 'How far is Clean King from Tecumseh?',
      answer:
        'About 25 minutes. Take M-52 south to Adrian and US-223 east to Blissfield, or cut through Britton and Deerfield — either way you are at our door in under half an hour.',
    },
    {
      id: 'tecumseh-mobile',
      question: 'Do you come to Tecumseh for mobile detailing?',
      answer:
        'We detail at our Blissfield shop only, so we can shampoo, steam and buff without cutting corners. Drop off in the morning and most Tecumseh customers pick up the same afternoon.',
    },
    {
      id: 'tecumseh-trucks',
      question: 'Do you detail trucks and SUVs from the Tecumseh area?',
      answer:
        'Absolutely — cars, trucks, SUVs and vans, all at the same flat package price. Just tell us what you drive when you book so we can plan the time.',
    },
  ],
  '/car-detailing-ann-arbor-mi': [
    {
      id: 'a2-worth-it',
      question: 'Is it worth driving from Ann Arbor for a detail?',
      answer:
        'Our Full Detail is $140 and the Deluxe is $160 — typically about half of what the same work costs inside Ann Arbor. It is roughly 45 minutes down US-23 and US-223, and many customers pair the trip with an errand run to Toledo or Cabela’s.',
    },
    {
      id: 'a2-wait',
      question: 'Can I wait while my car is detailed?',
      answer:
        'A full detail takes 3–6 hours, so most Ann Arbor customers drop off between 9:30 and 10:00 AM and pick up in the afternoon. Downtown Blissfield is a short walk from the shop if you would rather stay local.',
    },
    {
      id: 'a2-mobile',
      question: 'Do you offer mobile detailing in Ann Arbor?',
      answer:
        'No — all work is done by hand at our Blissfield shop, which is how we keep quality up and prices where they are.',
    },
  ],
  '/car-detailing-lenawee-county': [
    {
      id: 'lenawee-where',
      question: 'Where in Lenawee County are you located?',
      answer:
        'We are at 610 W Adrian St in Blissfield, on US-223 in the southeast corner of the county — 15 minutes from Adrian, 25 from Tecumseh, and an easy drive from Deerfield, Palmyra, Ottawa Lake, Morenci and Hudson.',
    },
    {
      id: 'lenawee-mobile',
      question: 'Do you offer mobile detailing across Lenawee County?',
      answer:
        'We detail exclusively at our Blissfield shop so every vehicle gets the same equipment, water and lighting. Drop off between 9:30 and 10:00 AM and most vehicles are ready the same day.',
    },
    {
      id: 'lenawee-salt',
      question: 'When should I detail my car after a Lenawee winter?',
      answer:
        'As soon as the salt season ends — usually late March or April. Getting the brine out of the carpets and off the paint before it sits through spring is the single best thing you can do for a Michigan car. We recommend a detail every 3–4 months year-round.',
    },
  ],
};

/** FAQ list for a service-area page: shared questions + that area's own. */
export const faqsForArea = (slug) => [...areaCommon, ...(areaFaqs[slug] || [])];

/** schema.org FAQPage for a list of `{ question, answer }` items. */
export const faqJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});
