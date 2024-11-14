"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';
import { SocialLinks } from '../components/SocialLinks';
import AppointmentButton from '../components/AppointmentButton';

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const hours = [
    { day: 'Monday-Friday', time: '9:00 AM - 6:00 PM' },
    { day: 'Saturday-Sunday', time: 'Closed' },
  ];

  const faqs = [
    {
      id: 1,
      question: "What forms of payment do you accept?",
      answer: "We accept all major credit cards, cash, and digital payments including Apple Pay and Google Pay."
    },
    {
      id: 2,
      question: "Do I need to prepare my car before the service?",
      answer: "Please remove all personal belongings from your vehicle. We recommend emptying the trunk and interior of any items not part of the car."
    },
    {
      id: 3,
      question: "What is your cancellation policy?",
      answer: "We require 24-hour notice for cancellations. Late cancellations may be subject to a fee."
    }
  ];

  return (
    <><div className="py-8 px-4">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
              <h1 className="text-4xl font-bold text-center text-gray-800">Contact Us
                  <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
              </h1>

              {/* Contact Info Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="space-y-4">
                      <a href="tel:+1234567890" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <Phone className="w-6 h-6 text-red-600 mr-3" />
                          <span className="text-gray-700">(123) 456-7890</span>
                      </a>

                      <a href="mailto:info@detailing.com" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <Mail className="w-6 h-6 text-red-600 mr-3" />
                          <span className="text-gray-700">info@detailing.com</span>
                      </a>

                      <a href="https://maps.google.com" target="_blank" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <MapPin className="w-6 h-6 text-red-600 mr-3" />
                          <span className="text-gray-700">123 Detail Street, Car City, ST 12345</span>
                      </a>
                  </div>
              </div>

              {/* Hours Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                      <Clock className="w-6 h-6 text-red-600 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-800">Business Hours</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                      {hours.map((item, index) => (
                          <div key={index} className="p-2">
                              <div className="font-medium text-gray-700">{item.day}</div>
                              <div className="text-gray-600">{item.time}</div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Policies & FAQs</h2>
                  <div className="space-y-4">
                      {faqs.map((faq) => (
                          <div key={faq.id} className="border-b border-gray-200 last:border-0">
                              <button
                                  className="w-full py-4 flex justify-between items-center text-left"
                                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                              >
                                  <span className="font-medium text-gray-700">{faq.question}</span>
                                  <ChevronDown
                                      className={`w-5 h-5 text-red-500 transition-transform ${openFaq === faq.id ? 'transform rotate-180' : ''}`} />
                              </button>
                              {openFaq === faq.id && (
                                  <div className="pb-4 text-gray-600">
                                      {faq.answer}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div><AppointmentButton /><SocialLinks /></>
  );
};

export default Contact;