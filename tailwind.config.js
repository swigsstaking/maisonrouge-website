/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d7',
          300: '#f4a9b6',
          400: '#ec7a8f',
          500: '#df4d6a',
          600: '#A22136',
          700: '#8b1a2d',
          800: '#751829',
          900: '#641827',
          950: '#380811',
        },
        secondary: {
          50: '#FBFBFB',
          100: '#F6F6F6',
          200: '#F2F2F2',
          300: '#E0E0E0',
          400: '#B1B1B1',
          500: '#898989',
          600: '#666666',
          700: '#404040',
          800: '#2E2925',
          900: '#1A1715',
        },
        accent: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4ddb2',
          300: '#edc581',
          400: '#e5a54e',
          500: '#de8d2e',
          600: '#cf7423',
          700: '#ac591f',
          800: '#8a4720',
          900: '#703b1d',
        },
      },
      fontFamily: {
        display: ['Raleway', 'system-ui', 'sans-serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'extra-wide': '0.1em',
      },
    },
  },
  plugins: [],
}
