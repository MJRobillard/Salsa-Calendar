/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#800000',
          charcoal: '#1A1A1A',
          gold: '#FFD700',
          sand: '#F5E6C8',
          paper: '#0F0F10'
        }
      },
      gradientColorStops: {
        accentFrom: '#800000',
        accentTo: '#FF9A3E'
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,.25)',
        glow: '0 0 0 2px rgba(255,215,0,.25)'
      },
      borderRadius: { 
        xl2: '1.25rem' 
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
} 