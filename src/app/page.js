'use client';
import React from 'react';
import Image from 'next/image';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { SocialLinks } from '@/components/SocialLinks';
import { AppointmentButton } from '@/components/AppointmentButton';
import { GiftCertificates } from '@/components/GiftCertificates';

const Home = () => {
  return (
    <div className="mb-2 min-h-screen">
      <section className="relative flex h-64 items-center justify-center bg-black text-white md:h-80 lg:h-96">
        <div className="absolute inset-0">
          <Image
            src="/tire.webp"
            alt="Detailed car"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="relative z-10">
          <div className="relative size-[175px] md:size-[250px]">
            <Image
              src="/cleanking.svg"
              alt="Clean King Detailing"
              fill
              priority
              className="object-contain"
            />
          </div>
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
