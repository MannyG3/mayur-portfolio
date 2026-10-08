/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'IBM Plex Mono', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#f04e15',
          soft: 'rgba(240, 78, 21, 0.12)',
        },
        accent: {
          DEFAULT: '#f04e15',
          dim: '#c83e0e',
          glow: '#ff6229',
          muted: 'rgba(240, 78, 21, 0.12)',
        },
        surface: {
          50: '#fbfaf8',
          100: '#f4f2ef',
          200: '#eae8e3',
          300: '#dfdcd6',
          400: '#a19e99',
          500: '#75716b',
          600: '#625d56',
          700: '#343432',
          800: '#232322',
          900: '#1c1c1a',
          950: '#111110',
        },
        ink: {
          DEFAULT: '#1e1b18',
          muted: '#625d56',
          faint: '#a19e99',
        },
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          '2xl': '720px',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 6px 12px rgba(0, 0, 0, 0.08), 0 12px 28px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
