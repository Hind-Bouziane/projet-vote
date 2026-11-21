/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emsi: {
          green: '#107c41',
          darkgreen: '#0b592e',
          lightgreen: '#e8f5e9',
          accent: '#2e7d32'
        }
      }
    },
  },
  plugins: [],
}
