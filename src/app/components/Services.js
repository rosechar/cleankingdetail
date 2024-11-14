import React from 'react';
import { useRouter } from 'next/navigation';
import services from '@/data/services';

export const Services = () => {
  const router = useRouter();

  const handleServiceClick = (serviceId) => {
    router.push(`/services?selected=${serviceId}`);
  };

  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Services
        <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => handleServiceClick(service.id)}
            className="bg-white rounded-lg shadow-lg p-3 cursor-pointer md:hover:scale-105 md:transition-transform md:duration-300 md:ease-in-out"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{service.name}</h3>
              <span className="text-lg font-semibold text-customRed">{service.price}</span>
            </div>
            <p className="text-gray-600 italic">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};