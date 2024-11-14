"use client";
import React from 'react';
import Link from 'next/link';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { SocialLinks } from './components/SocialLinks';
import AppointmentButton from './components/AppointmentButton';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-black flex items-center justify-center text-white">
        <img
          src="/tire.jpg"
          alt="Detailed car"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center uppercase font-semibold">
          <p className="text-4xl mb-4">The King of Clean</p>
          <p className="text-xl">Blissfield, MI</p>
        </div>
      </section>

      <Services />
      <AppointmentButton />
      <Testimonials />
      <SocialLinks />
    </div>
  );
};

export default Home;