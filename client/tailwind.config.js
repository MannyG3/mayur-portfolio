/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#636CCB', // primary
          300: '#6E8CFB',
          400: '#636CCB',
          500: '#50589C',
          600: '#3C467B',
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
}



