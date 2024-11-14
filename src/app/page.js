"use client";
import React from 'react';
import Image from 'next/image';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { SocialLinks } from './components/SocialLinks';
import AppointmentButton from './components/AppointmentButton';
import OfferToast from './components/OfferToast';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-72 bg-black flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="/tire.jpg"
            alt="Detailed car"
            fill
            sizes="(max-width: 768px) 100vw, 1920px"
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center uppercase font-semibold">
          <p className="text-4xl mb-4">The King of Clean</p>
          <p className="text-xl">Blissfield, MI</p>
        </div>
      </section>

      <Services />
      <AppointmentButton />
      <Testimonials />
      <SocialLinks />
      <OfferToast />
    </div>
  );
};

export default Home;