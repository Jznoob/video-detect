// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 这个路径能覆盖 features、components、routes 等
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
