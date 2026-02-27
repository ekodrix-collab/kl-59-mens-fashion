/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        'rich-black': '#0A0A0A',
        dark: '#111111',
        'dark-soft': '#1A1A1A',
        'dark-card': '#141414',
        'dark-border': '#222222',
        white: '#F7F7F5',
        'white-pure': '#FFFFFF',
        muted: '#888888',
        subtle: '#555555',
        gold: {
          DEFAULT: '#C8A97E',
          light: '#D9C4A0',
          dark: '#A08558',
        },
        'offer-red': '#C41E3A',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-up': 'slide-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'loading-bar': 'loading-bar 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
