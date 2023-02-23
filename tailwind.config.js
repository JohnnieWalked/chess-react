/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'skyrim-night': "url('/src/assets/img/night2.webp')",
        'skyrim-bar': "url('/src/assets/img/promotionBar.webp')",
      }
    },
  },
  plugins: [],
}
