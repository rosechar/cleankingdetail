import React from 'react';
import { useRouter } from 'next/navigation';
import services from '@/data/services';

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
              <div className="shrink-0 px-1 text-3xl">{service.icon}</div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <span className="text-lg font-semibold text-blue-600">
                    {service.price}
                  </span>
                </div>

                <div className="mt-1 font-thin leading-snug text-gray-600 md:text-lg">
                  {service.highlights.join(' • ')}
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
