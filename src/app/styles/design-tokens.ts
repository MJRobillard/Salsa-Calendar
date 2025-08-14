// Design Tokens from Design.md Section 1.1
// This file provides easy access to all design tokens during development

export const colors = {
  brand: {
    maroon: '#800000',
    charcoal: '#1A1A1A',
    gold: '#FFD700',
    sand: '#F5E6C8',
    paper: '#0F0F10'
  }
} as const;

export const gradients = {
  accentFrom: '#800000',
  accentTo: '#FF9A3E'
} as const;

export const shadows = {
  card: '0 8px 24px rgba(0,0,0,.25)',
  glow: '0 0 0 2px rgba(255,215,0,.25)'
} as const;

export const borderRadius = {
  xl2: '1.25rem'
} as const;

export const typography = {
  headings: {
    fontFamily: 'Montserrat, Poppins, system-ui, sans-serif',
    fontWeight: '700',
    lineHeight: '1.5'
  },
  body: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: 'normal'
  }
} as const;

// Tailwind class references for easy copy-paste
export const tailwindClasses = {
  backgrounds: {
    paper: 'bg-brand-paper',
    charcoal: 'bg-brand-charcoal',
    maroon: 'bg-brand-maroon',
    gold: 'bg-brand-gold',
    sand: 'bg-brand-sand'
  },
  text: {
    white: 'text-white',
    gold: 'text-brand-gold',
    sand: 'text-brand-sand',
    charcoal: 'text-brand-charcoal'
  },
  borders: {
    maroon: 'border-brand-maroon',
    gold: 'border-brand-gold'
  },
  shadows: {
    card: 'shadow-card',
    glow: 'shadow-glow'
  },
  borderRadius: {
    xl2: 'rounded-xl2'
  },
  gradients: {
    accent: 'bg-gradient-to-tr from-accentFrom to-accentTo'
  }
} as const;
