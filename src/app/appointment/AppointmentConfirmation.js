import React from 'react';
import { CalendarCheck, Car, Calendar, Phone } from 'lucide-react';

export const AppointmentConfirmation = ({ submittedData }) => {
  return (
    <div className="mx-auto min-h-screen max-w-xl text-gray-900">
      <div className="rounded-xl">
        <div className="mb-4 flex flex-col items-center justify-center gap-4">
          <div className="rounded-full p-2">
            <CalendarCheck className="size-20 text-red-600" />
          </div>
          <p className="text-center text-lg font-medium">
            Thank you for choosing our detail service, we will reach out shortly
            to confirm your appointment.
          </p>
        </div>

        <div className="mb-1 divide-y divide-gray-100 rounded-lg border border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 p-4">
            <Car className="size-5 text-customRed" />
            <div>
              <p className="text-sm font-medium text-gray-500">Service</p>
              <p className="font-medium text-gray-900">
                {submittedData.service}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4">
            <Calendar className="size-5 text-customRed" />
            <div>
              <p className="text-sm font-medium text-gray-500">
                Requested Date
              </p>
              <p className="font-medium text-gray-900">
                {new Date(submittedData.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-lg p-2 text-center text-base">
          To deliver the best possible detail, we kindly ask for vehicle
          drop-offs between 9:30 AM - 10:00 AM
        </div>

        <div className="flex items-center justify-between gap-2 rounded-lg bg-white p-6 py-4 text-lg font-medium">
          Questions?
          <a href="tel:+(517) 682-1919" className="flex items-center gap-2">
            <Phone className="size-6 shrink-0 text-red-600" />
            <span className="text-gray-700">(517) 682-1919</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
