// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 这个路径能覆盖 features、components、routes 等
  ],
  theme: {
    extend: {
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  future: {
    // Tailwind 3.3 起默认开启，手动禁用
    disableColorPalettePlugin: true,
  },
  // ✅ fallback 到 sRGB (RGB/HEX)
  experimental: {
    optimizeUniversalDefaults: true,
  },
  darkMode: "class",
  plugins: [],
};
