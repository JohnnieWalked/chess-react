/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'skyrim-night': "url('/img/night2.webp')",
        'skyrim-bar': "url('/img/promotionBar.webp')",
        'skyrim-modal': "url('/img/modal.webp')",
      }
    },
  },
  plugins: [],
}
