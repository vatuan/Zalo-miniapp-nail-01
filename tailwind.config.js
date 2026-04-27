/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: 'var(--color-brand-pink)',
          'pink-soft': 'var(--color-brand-pink-soft)',
          gold: 'var(--color-brand-gold)',
          cream: 'var(--color-brand-cream)',
          green: 'var(--color-brand-green)',
          'green-soft': 'var(--color-brand-green-soft)',
        },
        app: {
          bg: 'var(--color-bg-app)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          muted: 'var(--color-surface-muted)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          default: 'var(--color-border-default)',
          soft: 'var(--color-border-soft)',
        },
        nav: {
          surface: 'var(--color-nav-surface)',
          border: 'var(--color-nav-border)',
          'item-active-bg': 'var(--color-nav-item-active-bg)',
          'text-default': 'var(--color-nav-text-default)',
          'text-active': 'var(--color-nav-text-active)',
        },
        card: {
          surface: 'var(--color-card-surface)',
          border: 'var(--color-card-border)',
        },
        button: {
          'primary-bg': 'var(--color-button-primary-bg)',
          'primary-fg': 'var(--color-button-primary-fg)',
          'secondary-bg': 'var(--color-button-secondary-bg)',
          'secondary-fg': 'var(--color-button-secondary-fg)',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'add-to-cart': 'add-to-cart 0.5s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'add-to-cart': {
          '0%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(1.05)' },
          '90%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
