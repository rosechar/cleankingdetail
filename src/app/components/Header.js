"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
    const currentPath = usePathname();

    return (
        <header className="bg-gray-900 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between md:justify-evenly p-6 text-white">
                <h1 className="flex-shrink-0">
                    <Link href="/" className="hover:text-red-600 transition-colors duration-200 flex items-center gap-2">
                        <div className="w-[150px] h-[150px] relative">
                            <Image
                                src="/cleanking.svg"
                                alt="Detailed car"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </h1>

                <nav>
                    <ul className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-8 list-none p-0 m-0 text-right text-xl">
                        {[
                            { path: '/services', label: 'Services' },
                            { path: '/about', label: 'About' },
                            { path: '/appointment', label: 'Appointment' }
                        ].map(({ path, label }) => (
                            <li key={path}>
                                <Link
                                    href={path}
                                    className={`relative px-3 py-2 md:py-2 rounded-lg transition-all duration-200 font-semibold tracking-wide block
                                        ${currentPath === path 
                                            ? 'text-red-600 bg-red-600/10 after:scale-x-100' 
                                            : 'text-gray-100 hover:text-red-600 hover:bg-red-600/5'
                                        }
                                        after:content-[''] after:absolute after:bottom-0 after:left-0 
                                        after:w-full after:h-0.5 after:bg-red-600 after:transform 
                                        after:scale-x-0 after:origin-left after:transition-transform 
                                        after:duration-200
                                    `}
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