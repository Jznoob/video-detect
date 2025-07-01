import React from "react";

export type StatCardProps = {
  title: string;
  value: string | number;
  bgColor?: string; // Tailwind 背景色类名，可选
  icon?: React.ReactNode;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  bgColor = "bg-gray-800/90",
  icon,
}) => (
  <div
    className={`group flex items-center gap-4 rounded-xl shadow-lg p-6 ${bgColor} transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-800`}
  >
    {icon && (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700/50 text-gray-300 transition-all duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100">
        {icon}
      </div>
    )}
    <div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-gray-100">{value}</div>
    </div>
  </div>
);

export default StatCard;

// 在全局 index.css 中添加如下动画：
// @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1); } 