'use client';
import React, { useState, useEffect } from 'react';
import AppointmentForm from '../../components/AppointmentForm';
import { AppointmentConfirmation } from '../../components/AppointmentConfirmation';

const AppointmentPage = () => {
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

export default AppointmentPage;
