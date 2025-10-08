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
        hybeGradientFrom: "#6d28d9",
        hybeGradientTo: "#4c1d95",
      },
      borderRadius: {
        xl: "1rem",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
        serif: ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        'md-soft': '0 6px 18px rgba(35, 20, 95, 0.08)',
        'lg-soft': '0 12px 40px rgba(35, 20, 95, 0.12)'
      }
    },
  },
  plugins: [],
};
