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
        primary: 'var(--primary)',
        surface: 'var(--surface)',
        appText: 'var(--text)'
      },
      borderRadius: {
        xl: "1rem",
        pill: '45px'
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
        heading: ['Montserrat', 'Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'md-soft': '0 6px 18px rgba(35, 20, 95, 0.08)',
        'lg-soft': '0 12px 40px rgba(35, 20, 95, 0.12)'
      }
    },
  },
  plugins: [],
};
