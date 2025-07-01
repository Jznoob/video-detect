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
      colors: {
        // 主要背景色
        'dark-primary': '#121212',
        'dark-secondary': '#1E1E2F',
        'dark-tertiary': '#252538',
        
        // 文字颜色
        'text-primary': '#E0E0E0',
        'text-secondary': '#CCCCCC',
        'text-muted': '#999999',
        
        // 强调色
        'accent-blue': '#3B82F6',
        'accent-green': '#10B981',
        'accent-orange': '#F59E0B',
        
        // 半透明背景
        'dark-card': 'rgba(255,255,255,0.08)',
        'dark-card-hover': 'rgba(255,255,255,0.12)',
      },
      boxShadow: {
        'dark-sm': '0 2px 4px 0 rgba(0,0,0,0.15)',
        'dark': '0 4px 6px -1px rgba(0,0,0,0.2)',
        'dark-lg': '0 10px 15px -3px rgba(0,0,0,0.3)',
      },
      backdropBlur: {
        'xs': '2px',
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
