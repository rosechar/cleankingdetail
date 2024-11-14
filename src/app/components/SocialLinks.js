import React from 'react';
import { Star, Facebook } from 'lucide-react';

export const SocialLinks = () => {
  return (
    <section className="py-4">
        <div className="flex justify-center gap-4 m-4 text-center font-semibold">
          <a 
            href="https://facebook.com/your-page" 
            target="_blank" 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-48"
          >
            <Facebook className="w-10 h-10" />
            Connect on Facebook
          </a>
          <a 
            href="https://google.com/your-business" 
            target="_blank" 
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-48"
          >
            <Star className="w-10 h-10" />
            Review on Google
          </a>
        </div>
    </section>
  );
};