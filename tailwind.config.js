module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3B82F6",
          dark: "#60A5FA",
        },
        secondary: {
          light: "#10B981",
          dark: "#34D399",
        },
      },
    },
  },
  plugins: [],
};
