/** @type {import('tailwindcss').Config} */
module.exports = {
  // Gece/Gündüz modu için bu ayar şart
  darkMode: 'class', 

  // Tailwind'in tarayacağı dosyalar
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern font ayarı
      }
    },
  },
  plugins: [],
}