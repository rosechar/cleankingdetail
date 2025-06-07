'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import services from '../../data/services';
import { ServiceCard } from '@/components/ServiceCard';
import { AppointmentButton } from '@/components/AppointmentButton';

export const ServicesPage = () => {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState('interior-detail');

  useEffect(() => {
    const selected = searchParams.get('selected');
    if (selected) {
      setSelectedService(selected);
    }
  }, [searchParams]);

  const handleServiceSelection = (serviceId) => {
    setSelectedService(serviceId);
  };

  const selectedServiceDetails = services.find(
    (service) => service.id === selectedService
  );

  return (
    <>
      <div className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 grid grid-cols-2 justify-center gap-2 sm:flex sm:flex-wrap">
            {services.map((service) => (
              <button
                key={service.id}
                className={`relative rounded-lg px-3 py-2 text-lg font-semibold tracking-wide transition-all duration-200 ${
                  selectedService === service.id
                    ? 'bg-red-600/10 text-red-600 after:scale-x-100'
                    : 'text-gray-800 hover:bg-red-600/5 hover:text-red-600'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-200 after:content-['']`}
                onClick={() => handleServiceSelection(service.id)}
              >
                {service.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <ServiceCard selectedService={selectedServiceDetails} />
            <p className="mt-4 text-center text-sm text-gray-600">
              *Large SUV/VANS & Pet Hair Extra
            </p>
          </div>
        </div>
      </div>
      <AppointmentButton />
    </>
  );
};
