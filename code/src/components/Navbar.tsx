import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navs = [
  { label: "首页", path: "/" },
  { label: "检测", path: "/video-detect" },
  { label: "设置", path: "/settings" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(document.documentElement.classList.contains("dark"));
  };

  return (
    <nav className="h-16 w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        {/* Logo/系统名 */}
        <div className="text-xl font-bold text-[#232B55] dark:text-white tracking-wide select-none">
          多媒体篡改检测系统
        </div>
        {/* 右侧导航 */}
        <div className="flex items-center gap-2 md:gap-4">
          {navs.map((nav) => (
            <button
              key={nav.path}
              onClick={() => navigate(nav.path)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors
                ${location.pathname === nav.path
                  ? "bg-[#232B55] text-white dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
              `}
            >
              {nav.label}
            </button>
          ))}
          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className="ml-2 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="切换主题"
          >
            {dark ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.41 1.41l-.7.7a1 1 0 11-1.41-1.41l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.03 4.22a1 1 0 011.41 1.41l-.7.7a1 1 0 11-1.41-1.41l.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.03a1 1 0 00-1.41 1.41l.7.7a1 1 0 001.41-1.41l-.7-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.03-4.22a1 1 0 00-1.41-1.41l-.7.7a1 1 0 001.41 1.41l.7-.7z" /><circle cx="10" cy="10" r="3" /></svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 