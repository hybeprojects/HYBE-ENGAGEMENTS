/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hybePurple: "#5b21b6",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
