'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AreasServedFooter } from './AreasServedFooter';

export default function Footer() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 py-6 text-white shadow-lg">
      <div className="flex items-center justify-evenly md:justify-center md:gap-16">
        <div className="relative size-[80px]">
          <Image
            src="/cleanking.svg"
            alt="Clean King Auto Detailing"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="text-right">
          <p>610 W Adrian St</p>
          <p>Blissfield, MI 49228</p>
          <p className="font-semibold text-blue-400">(517) 682-1919</p>
        </div>
      </div>
      <AreasServedFooter />
    </header>
  );
}
