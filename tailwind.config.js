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
        mainSecondary: {
          main: "#0560A7",
          light: "#0A7ABF",
        },
        offWhite: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
