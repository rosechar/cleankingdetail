import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const services = [
  {
    id: 'spiffy-detail',
    name: 'Spiffy Detail',
    price: '$35',
    description: 'Quick but thorough cleaning service',
    icon: '🚗',
    highlights: [
      'Interior vacuum',
      'Exterior wash',
      'Windows cleaned',
      'Quick & affordable',
    ],
    details: ['Exterior Wash', 'Interior Vacuum', 'Interior Glass Cleaned'],
  },
  {
    id: 'interior-detail',
    name: 'Interior Detail',
    price: '$110',
    description: 'Deep cleaning of all interior surfaces',
    icon: '🧽',
    highlights: [
      'Deep interior cleaning',
      'Seat & carpet cleaning',
      'Dashboard detailing',
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
    id: 'full-detail',
    name: 'Full Detail',
    price: '$140',
    description: 'Complete interior and exterior detailing',
    icon: '⭐',
    highlights: [
      'Complete interior detail',
      'Exterior wash & wax',
      'Clean wheels & tires',
    ],
    isPopular: true,
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
  },
  {
    id: 'deluxe-detail',
    name: 'Deluxe Detail',
    price: '$160',
    description: 'Premium detail with trunk and engine bay cleaning',
    icon: '💎',
    highlights: [
      'Premium full detail',
      'Engine bay cleaning',
      'Trunk cleaning',
      'Ultimate service',
    ],
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
    name: 'A La Carte',
    price: '$70-$110',
    description: 'Clay Bar / Buff / Wax',
    icon: '🪣',
    highlights: [
      'Clay bar treatment',
      'Paint buffing',
      'Premium wax',
      'Custom service',
    ],
    details: ['Clay Bar / Wax', 'Clay Bar / Buff / Wax'],
  },
];

export const Services = () => {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Services
        <div className="mx-auto mt-4 h-1 w-24 bg-red-600" />
      </h2>
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => router.push(`/services?selected=${service.id}`)}
            className={`cursor-pointer rounded-lg bg-white p-3 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md ${
              service.isPopular ? 'border-2 border-yellow-400' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="shrink-0 text-3xl">{service.icon}</div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <span className="text-lg font-bold text-blue-600">
                    {service.price}
                  </span>
                </div>

                <div className="mt-1 text-base font-thin leading-tight text-gray-600">
                  {service.highlights.join(' | ')}
                </div>

                {service.isPopular && (
                  <div className="mt-0.5 text-sm font-medium text-yellow-600">
                    Most popular!
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
