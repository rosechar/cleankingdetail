'use client';
import React, { useState, useEffect } from 'react';
import AppointmentForm from '../../components/AppointmentForm';
import { AppointmentConfirmation } from '../../components/AppointmentConfirmation';

export const metadata = {
  title:
    'Book Appointment - Clean King Detailing | Car Wash & Window Tinting Blissfield, MI',
  description:
    'Schedule your car detailing and window tinting appointment online. Book interior, exterior, or full detail services from $35-$160. Quick and easy online booking for Blissfield, Adrian, Tecumseh areas.',
  keywords:
    'book car wash appointment, schedule car detailing, online booking car wash, appointment car detailing Blissfield MI, book window tinting appointment, schedule auto detail',
  openGraph: {
    title: 'Book Your Car Detailing Appointment - Clean King Detailing',
    description:
      'Schedule your car wash, detailing, or window tinting service online. Easy booking system for Blissfield, Adrian, and Tecumseh areas.',
    url: 'https://cleankingdetail.com/appointment',
  },
  alternates: {
    canonical: 'https://cleankingdetail.com/appointment',
  },
};

const Appointment = () => {
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (submittedData) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submittedData]);

  const handleSubmit = (formData) => {
    setSubmittedData(formData);
  };

  return (
    <div className="min-h-screen p-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="space-y-6 border-red-700 p-4 text-gray-800">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              {submittedData
                ? 'Appointment Request Received'
                : 'Request Appointment'}
            </h1>
            <div className="mx-auto mt-4 h-1 w-24 bg-red-600"></div>
          </div>

          {submittedData ? (
            <AppointmentConfirmation submittedData={submittedData} />
          ) : (
            <AppointmentForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
