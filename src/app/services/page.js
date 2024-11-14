"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import services from '../../data/services';
import ServiceCard from '../components/ServiceCard';
import AppointmentButton from '../components/AppointmentButton';

// Create a separate component for the content that uses useSearchParams
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

  const selectedServiceDetails = services.find((service) => service.id === selectedService);

  return (
    <>
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center mb-6">
            {services.map((service) => (
              <button
                key={service.id}
                className={`relative px-3 py-2 rounded-lg transition-all duration-200 font-semibold tracking-wide text-lg
                  ${selectedService === service.id
                    ? 'text-red-600 bg-red-600/10 after:scale-x-100'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-600/5'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-red-600 after:transform 
                  after:scale-x-0 after:origin-left after:transition-transform 
                  after:duration-200
                `}
                onClick={() => handleServiceSelection(service.id)}
              >
                {service.name}
              </button>
            ))}
          </div>
          <ServiceCard selectedService={selectedServiceDetails} />
        </div>
      </div>
      <AppointmentButton />
    </>
  );
};

// Main page component with Suspense boundary
const ServicesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
};

export default ServicesPage;