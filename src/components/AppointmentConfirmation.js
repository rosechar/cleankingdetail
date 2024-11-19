import React from 'react';
import { CalendarCheck } from 'lucide-react';

export const AppointmentConfirmation = ({ submittedData }) => {
  return (
    <div className="mx-auto min-h-screen max-w-md text-center text-lg text-gray-600 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-center justify-center gap-6">
        <CalendarCheck className="h-32 w-32 text-customRed" />
        <p>Thank you! We will reach out to confirm your detail service.</p>
        <div className="italic">
          <p>{submittedData.service}</p>
          <p>
            {new Date(submittedData.date).toLocaleDateString()}{' '}
            {submittedData.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
