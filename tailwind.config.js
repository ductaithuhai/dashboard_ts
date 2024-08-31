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
      height: {
        niceper: "calc(1100% / 12)",
      },
      backdropBlur: {
        md: "10px",
      },
    },
  },
  plugins: [],
};
