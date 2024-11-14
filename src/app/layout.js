import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Clean King Detailing | Professional Car Detailing Services in Blissfield, MI",
  description: "Premier car detailing in Blissfield, MI. From quick $35 Spiffy Details to comprehensive $160 Deluxe Details. Professional interior, exterior, engine bay cleaning & more. Serving Lenawee County.",
  keywords: "car detailing Blissfield MI, auto detailing, interior detailing, exterior detailing, Clean King Detailing, engine bay cleaning, clay bar service, car waxing, car buffing, Lenawee County car detailing",
  openGraph: {
    title: "Clean King Detailing - Professional Car Detailing in Blissfield",
    description: "Expert car detailing services from $35-$160. Interior, exterior, and full-service packages available. Serving Blissfield and Lenawee County.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/cleanking.jpg', // Add your image to public/images/
        width: 1200,
        height: 630,
        alt: 'Clean King Detailing - Professional Car Detailing Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean King Detailing - Professional Car Detailing Services',
    description: 'Expert car detailing services in Blissfield, MI',
    images: ['/cleanking.jpg'],
  },
  other: {
    "geo.region": "US-MI",
    "geo.placename": "Blissfield",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDetailing",
              "name": "Clean King Detailing",
              // "image": "https://yourwebsite.com/images/clean-king-og.jpg", // Replace with your actual domain
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Blissfield",
                "addressRegion": "MI",
                "addressCountry": "US"
              },
              "priceRange": "$35-$160",
              "description": "Premier car detailing services in Blissfield, MI offering interior, exterior, and full-service packages",
              "areaServed": "Lenawee County",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Spiffy Detail",
                  "price": "35",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Interior Detail",
                  "price": "110",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Full Detail",
                  "price": "140",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Deluxe Detail",
                  "price": "160",
                  "priceCurrency": "USD"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased {bg-gray-900} bg-gray-100 text-black`}
      >
        <Header />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}