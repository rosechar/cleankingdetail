'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const currentPath = usePathname();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="flex flex-row items-center justify-between px-6 py-4 text-white md:justify-evenly md:py-6">
        <h1 className="">
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors duration-200 hover:text-red-600"
          >
            <div className="relative size-[140px]">
              <Image
                src="/cleanking.svg"
                alt="Clean King Detailing"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </h1>

        <nav>
          <ul className="m-0 flex list-none flex-col items-end space-y-1 p-0 text-right text-lg md:flex-row md:space-x-8 md:space-y-0 md:text-xl">
            {[
              { path: '/services', label: 'Services' },
              { path: '/contact', label: 'Contact' },
              { path: '/appointment', label: 'Appointment' },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link
                  href={path}
                  className={`relative block rounded-lg px-3 py-2 font-semibold tracking-wide transition-all duration-200 md:py-2 ${
                    currentPath === path
                      ? 'bg-red-600/10 text-red-600 after:scale-x-100'
                      : 'text-white hover:bg-red-600/5 hover:text-red-600'
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-red-600 after:transition-transform after:duration-200 after:content-['']`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
