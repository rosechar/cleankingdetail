'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const currentPath = usePathname();

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-evenly">
          <div className="py-2 md:py-4">
            <Link
              href="/"
              className="flex items-center justify-evenly md:justify-start md:gap-4"
            >
              <div className="relative size-[80px]">
                <Image
                  src="/cleanking.svg"
                  alt="Clean King Auto Detailing"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="text-right md:text-left">
                <h1 className="text-2xl">THE KING OF CLEAN</h1>
              </div>
            </Link>
          </div>

          <nav className="flex justify-evenly border-t border-slate-600 py-1 md:gap-6 md:border-t-0 md:py-4">
            {[
              { path: '/services', label: 'Services' },
              { path: '/contact', label: 'Contact' },
              { path: '/appointment', label: 'Book Now' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`relative block rounded-lg px-3 py-2 font-semibold tracking-wide transition-all duration-200 md:py-2 ${
                  currentPath === path
                    ? 'bg-red-600/10 after:scale-x-100'
                    : 'hover:bg-red-600/10'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-200 after:content-['']`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
