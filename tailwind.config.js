/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'drawer-open': 'drawer-open 0.5s ease-in-out',
        'show-overlay': 'show-overlay 0.5s ease-in-out'
      },
      keyframes: {
        'drawer-open': {
          '0%': {
            left: '-100%'
          },
          '50%': {
            left: '-50%'
          },
          '100%': {
            left: '0px',
            opacity: 0.8
          }
        },
        'show-overlay': {
          '0%': { opacity: 0 },
          '50%': { opacity: 0 },
          '100%': { opacity: 0.8 },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
