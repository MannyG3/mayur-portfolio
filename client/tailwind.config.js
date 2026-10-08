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
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        surface: {
          50: '#F5F7F8',
          100: '#E8EBED',
          200: '#C8CDD1',
          300: '#737B82',
          400: '#5B646B',
          500: '#454D54',
          600: '#343B41',
          700: '#292F34',
          800: '#202529',
          900: '#171B1E',
          950: '#0B0D0E',
        },
        ink: '#171B1E',
        'ink-muted': '#454D54',
        'ink-faint': '#717B82',
        accent: {
          DEFAULT: '#F59E0B',
          dim: '#B96F05',
          glow: '#FBBF24',
          muted: 'rgba(245, 158, 11, 0.12)',
        },
        burgundy: {
          DEFAULT: '#B42318',
          light: '#EF4444',
          muted: 'rgba(180, 35, 24, 0.12)',
        },
      },
      container: {
        center: true,
        padding: '1.125rem',
        screens: {
          '2xl': '700px',
        },
      },
      boxShadow: {
        card: '0 2px 8px -4px rgba(0, 0, 0, 0.38)',
        'card-hover': '0 12px 32px -12px rgba(0, 0, 0, 0.7)',
        frame: 'inset 0 0 0 1px rgba(245, 158, 11, 0.24), 0 4px 20px rgba(0, 0, 0, 0.3)',
        'frame-dark': 'inset 0 0 0 1px rgba(245, 158, 11, 0.24), 0 4px 24px rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
}
