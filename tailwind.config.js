/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlack: "#10131A",
        mainPrimary: "#583DA1",
        mainSecondary: "#0560A7",
        offWhite: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
