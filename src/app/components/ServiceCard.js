import React from 'react';
import { Check } from 'lucide-react';

const ServiceCard = ({ selectedService }) => {
    const { name, price, details, includes = "" } = selectedService;
    
    return (
        <div className="bg-white rounded-lg p-6 mx-4 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{name}</h2>
            <span className="text-2xl font-bold">{price}</span>
          </div>
          <span className="italic text-lg font-semibold">{includes}</span>
          <ul className="flex flex-col gap-1">
            {details?.map((detail, index) => (
              <li key={index} className="flex items-center text-lg">
                <Check className="h-5 w-5 mr-3 text-red-600 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default ServiceCard;