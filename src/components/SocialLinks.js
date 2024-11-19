import React from 'react';
import { Star, Facebook } from 'lucide-react';

export const SocialLinks = () => {
  return (
    <section className="py-4">
      <div className="m-4 flex justify-center gap-4 text-center font-semibold">
        <a
          href="https://www.facebook.com/people/Clean-King/100063915012506/"
          target="_blank"
          className="flex w-48 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          rel="noreferrer"
        >
          <Facebook className="size-10" />
          Connect on Facebook
        </a>
        <a
          href="https://goo.gl/maps/sUBufwUwrzyeocwJ9"
          target="_blank"
          className="flex w-48 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          rel="noreferrer"
        >
          <Star className="size-10" />
          Review on Google
        </a>
      </div>
    </section>
  );
};
