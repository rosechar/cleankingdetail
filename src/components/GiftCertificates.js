import React from 'react';
import { Gift } from 'lucide-react';

export const GiftCertificates = () => {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 pb-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-evenly gap-2 px-4 text-center text-gray-200 md:flex-row md:justify-center md:gap-4">
        <Gift className="size-12 text-customRed" />
        <div className="flex flex-col items-center gap-4 md:gap-2">
          <h2 className="text-xl font-semibold">Gift Certificates Available</h2>
          <div className="h-1 w-24 bg-red-600" />
        </div>
        {/* <p className="max-w-xs text-base font-semibold uppercase">
          Give the gift of a pristine vehicle this holiday season
        </p> */}
      </div>
    </section>
  );
};
