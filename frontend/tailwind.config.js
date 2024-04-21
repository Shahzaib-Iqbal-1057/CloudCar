/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      'poppins': ['Poppins', 'sans-serif'], // Adds a 'poppins' key to the fontFamily theme
    }
  },
  },
  plugins: [],
}

