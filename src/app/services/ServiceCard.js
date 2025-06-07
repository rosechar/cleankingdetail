import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export const ServiceCard = ({ selectedService }) => {
  const {
    name,
    price,
    details,
    includesText = '',
    includes = [],
  } = selectedService;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Service Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        <span className="text-xl font-bold text-blue-600">{price}</span>
      </div>

      {/* Includes Section (Collapsible) */}
      {includesText && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100"
          >
            <span className="text-gray-700">{includesText}</span>
            <ChevronDown
              className={`size-5 shrink-0 text-red-500 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="rounded-lg bg-gray-50 p-4">
              <ul className="flex flex-col gap-2">
                {includes?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-3 mt-0.5 size-5 shrink-0 text-red-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Service Details */}
      <div>
        <ul className="flex flex-col gap-2">
          {details?.map((detail, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-3 mt-0.5 size-5 shrink-0 text-red-500" />
              <span className="text-gray-700 md:text-lg">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
