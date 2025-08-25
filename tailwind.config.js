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
        },
        goldPrimary: '#FFD966',
        goldSecondary: '#B8860B',
        darkBg: '#0A0F1C'
      },
      gradientColorStops: {
        accentFrom: '#800000',
        accentTo: '#FF9A3E'
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,.25)',
        glow: '0 0 0 2px rgba(255,215,0,.25)',
        goldGlow: '0 0 6px 2px #FFD966, 0 0 12px 4px #B8860B'
      },
      borderRadius: { 
        xl2: '1.25rem' 
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFD966, #B8860B)',
        'dark-fill': 'linear-gradient(#0A0F1C, #0A0F1C)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.golden-border': {
          'border': '2px solid transparent',
          'border-radius': '12px',
          'background': 'linear-gradient(var(--dark-bg), var(--dark-bg)) padding-box, linear-gradient(135deg, var(--gold-primary), var(--gold-secondary)) border-box',
          'box-shadow': '0 0 6px 2px var(--gold-primary), 0 0 12px 4px var(--gold-secondary)',
        },
      })
    }
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
} 