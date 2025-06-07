'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import services from '../../data/services';
import { ServiceCard } from '@/app/services/ServiceCard';
import { AppointmentButton } from '@/components/AppointmentButton';

const ServicesContent = () => {
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
      <div className="mx-auto space-y-6 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Services
            <div className="mx-auto mt-4 h-1 w-24 bg-red-600" />
          </h1>

          <div className="my-4 grid grid-cols-2 justify-center gap-1 sm:flex sm:flex-wrap">
            {services.map((service) => (
              <button
                key={service.id}
                className={`relative rounded-lg px-3 py-2 font-semibold tracking-wide transition-all duration-200 md:text-lg ${
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

          <div className="mx-auto mb-8 flex max-w-lg flex-col items-center justify-center rounded-xl bg-white px-6 py-4 shadow-sm">
            <ServiceCard selectedService={selectedServiceDetails} />
          </div>

          <p className="text-center text-sm text-gray-500">
            *Large SUV/VANS & Pet Hair Extra
          </p>
        </div>
      </div>
      <AppointmentButton />
    </>
  );
};

export const ServicesPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
};
