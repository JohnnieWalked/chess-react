/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'skyrim-logo': "url('/img/skyrim-background.jpg')",
        'skyrim-night': "url('/img/skyrim-night.webp')",
      }
    },
  },
  plugins: [],
}
