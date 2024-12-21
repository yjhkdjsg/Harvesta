/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#99a28e",
        darkGreen: "#335a02",
        darkGray: "#1A1A19",
        paleYellow: "#F6FCDF",
        lightBeige: "#ECE3CE",
        darkBrown: "#493628",
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif']
      }
    },
  },
  plugins: [],
}
