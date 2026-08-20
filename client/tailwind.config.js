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
        sans: ['Lora', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      colors: {
        surface: {
          50: '#FFFDF9',
          100: '#F7F3ED',
          200: '#EDE4D8',
          300: '#D9CCBA',
          400: '#B8A898',
          500: '#8A7968',
          600: '#6B5E4F',
          700: '#4A4035',
          800: '#2E2720',
          900: '#221C16',
          950: '#1A1612',
        },
        ink: '#2C2416',
        'ink-muted': '#6B5E4F',
        'ink-faint': '#9A8B78',
        accent: {
          DEFAULT: '#C9A961',
          dim: '#A68B4B',
          glow: '#D4BA7A',
          muted: 'rgba(201, 169, 97, 0.14)',
        },
        burgundy: {
          DEFAULT: '#7B2D3B',
          light: '#9A3D4E',
          muted: 'rgba(123, 45, 59, 0.12)',
        },
      },
      container: {
        center: true,
        padding: '1.25rem',
        screens: {
          '2xl': '1080px',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(44, 36, 22, 0.06), 0 4px 16px rgba(44, 36, 22, 0.04)',
        'card-hover': '0 8px 32px rgba(44, 36, 22, 0.12)',
        frame: 'inset 0 0 0 1px rgba(201, 169, 97, 0.35), 0 4px 20px rgba(44, 36, 22, 0.08)',
        'frame-dark': 'inset 0 0 0 1px rgba(201, 169, 97, 0.25), 0 4px 24px rgba(0, 0, 0, 0.35)',
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
