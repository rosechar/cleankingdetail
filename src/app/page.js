'use client';
import React from 'react';
import Image from 'next/image';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { SocialLinks } from '../components/SocialLinks';
import AppointmentButton from '../components/AppointmentButton';
import OfferToast from '../components/OfferToast';
import GiftCertificates from '../components/GiftCertificates';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative flex h-64 items-center justify-center bg-black text-white md:h-80 lg:h-96">
        <div className="absolute inset-0">
          <Image
            src="/tire.webp"
            alt="Detailed car"
            fill
            sizes="(max-width: 768px) 768px, 1920px"
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center font-semibold uppercase">
          <p className="mb-4 text-4xl">The King of Clean</p>
          <p className="text-xl">Blissfield, MI</p>
        </div>
      </section>

      <Services />
      <AppointmentButton />
      <Testimonials />
      <GiftCertificates />
      <SocialLinks />
      {/* <OfferToast /> */}
    </div>
  );
};

export default Home;
