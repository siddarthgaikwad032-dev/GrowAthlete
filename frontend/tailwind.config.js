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
          DEFAULT: '#1a73e8', // Standard GrowAthlete blue
          dark: '#1557b0',
          light: '#e8f0fe',
        },
        grow: {
          navy: '#1a365d', // Logo color "Athlete"
          orange: '#ea580c', // Logo color "Grow"
          bg: '#f8fafc', // Background color for layout
          border: '#e2e8f0', // Border color
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
