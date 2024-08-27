/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Comfortaa", "sans-serif"],
      },
      colors: {
        "bg-primary": "#eBDFD7",
      },
    },
  },
  plugins: [],
};
