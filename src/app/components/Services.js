import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import services from '@/data/services';

export const Services = () => {
  const router = useRouter();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Services
        <div className="mx-auto mt-4 h-1 w-24 bg-red-600" />
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => router.push(`/services?selected=${service.id}`)}
            className="cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-transform hover:scale-105"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">{service.name}</h3>
              {/* <span className="text-lg font-semibold text-customRed">
                {service.price}
              </span> */}
              <ChevronRight className="ml-2 size-5 shrink-0 text-customRed" />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-gray-600">{service.description}</p>
              {/* <ChevronRight className="ml-2 size-5 shrink-0 text-customRed" /> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
