import React from 'react';
import { Gift } from 'lucide-react';

const GiftCertificates = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-evenly gap-4 px-4 text-center text-gray-200 md:flex-row">
        <Gift className="size-12 text-customRed" />
        <h2 className="text-2xl font-semibold">Gift Certificates Available</h2>
        <div className="h-1 w-24 bg-red-600" />

        <p className="max-w-xs text-base font-semibold uppercase">
          Give the gift of a pristine vehicle this holiday season
        </p>
      </div>
    </section>
  );
};

export default GiftCertificates;