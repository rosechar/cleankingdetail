'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SocialLinks } from '../components/SocialLinks';
import AppointmentButton from '../components/AppointmentButton';
import { contactInfo } from '@/data/contact';
import { faqs } from '@/data/faqs';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Contact
          <div className="mx-auto mt-4 h-1 w-24 bg-red-600" />
        </h1>

        <div className="flex flex-col gap-3 rounded-lg bg-white p-7 text-lg shadow-sm">
          {contactInfo.map(({ Icon, href, text }, i) =>
            href ? (
              <a
                key={i}
                href={href}
                className="mb-4 flex items-center gap-8"
                {...(href.startsWith('http') && {
                  target: '_blank',
                  rel: 'noreferrer',
                })}
              >
                <Icon className="size-6 shrink-0 text-red-600" />
                <span className="text-gray-700">{text}</span>
              </a>
            ) : (
              <div key={i} className="flex items-center gap-8">
                <Icon className="size-6 text-red-600" />
                <span className="font-medium text-gray-700">{text}</span>
              </div>
            )
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Frequently Asked Questions
          </h2>
          {faqs.map(({ id, question, answer }) => (
            <div key={id} className="border-b border-gray-200 last:border-0">
              <button
                className="flex w-full items-center justify-between py-4 text-left"
                onClick={() => setOpenFaq(openFaq === id ? null : id)}
              >
                <span className="font-medium text-gray-700">{question}</span>
                <ChevronDown
                  className={`size-8 text-red-600 transition-transform ${openFaq === id ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === id && (
                <div className="ml-3 pb-4 text-gray-600">{answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <AppointmentButton />
      <SocialLinks />
    </>
  );
};

export default Contact;
