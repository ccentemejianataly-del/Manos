/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2EFFF',
          100: '#E7E0FF',
          200: '#CFC1FF',
          300: '#B09AFF',
          400: '#8E70FF',
          500: '#6C4CF1',
          600: '#5636D6',
          700: '#4328AE',
          800: '#32207F',
          900: '#24175C',
        },
        coral: {
          400: '#FF8A7A',
          500: '#FF6B6B',
          600: '#E94F55',
        },
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -18px rgba(46, 28, 96, 0.35)',
        card: '0 22px 55px -30px rgba(46, 28, 96, 0.45)',
        lift: '0 18px 40px -20px rgba(76, 49, 158, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(108, 76, 241, 0.3)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 0 0 14px rgba(108, 76, 241, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        popIn: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'pop-in': 'popIn 0.35s ease-out both',
      },
    },
  },
  plugins: [],
};
