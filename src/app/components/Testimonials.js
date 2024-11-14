"use client";
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentTestimonial((prev) => 
            prev === testimonials.length - 1 ? 0 : prev + 1
          );
          setIsAnimating(false);
        }, 300); // Match this with the transition duration
      }, 5000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <section className="py-8 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 h-auto max-w-lg mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400 w-6 h-6"
                  />
                ))}
              </div>
              <div className="h-32 flex items-center justify-center">
                <div
                  className={`transition-all duration-300 ${
                    isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <p className="text-lg mb-4 italic">
                    {`"${testimonials[currentTestimonial].description}"`}
                  </p>
                  <p className="font-semibold">
                    - {testimonials[currentTestimonial].author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };