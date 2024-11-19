/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['var(--font-poppins)'],
    },
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      customRed: '#ba000d',
    },
    keyframes: {
      'slide-in': {
        '0%': {
          opacity: '0',
          transform: 'translateY(1rem)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
      'fade-out': {
        '0%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateY(1rem)',
        },
      },
    },
    animation: {
      'slide-in': 'slide-in 0.3s ease-out',
      'fade-out': 'fade-out 0.3s ease-out',
    },
  },
};
export const plugins = [];
