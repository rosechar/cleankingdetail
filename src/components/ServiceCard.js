import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const ServiceCard = ({ selectedService }) => {
  const {
    name,
    price,
    details,
    includesText = '',
    includes = [],
  } = selectedService;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full max-w-xl flex-col gap-6 rounded-lg bg-white p-6 text-lg shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className="text-2xl">{price}</span>
      </div>

      {includesText && (
        <div className="flex flex-col gap-2 rounded-sm outline outline-offset-8 outline-gray-300">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-1 px-1 text-left"
          >
            {includesText}
            <ChevronDown
              className={`size-5 shrink-0 text-customRed transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <ul className="flex flex-col gap-1">
              {includes?.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-3 size-5 shrink-0 text-customRed" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ul className="flex flex-col gap-1">
        {details?.map((detail, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-3 size-5 shrink-0 text-customRed" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
