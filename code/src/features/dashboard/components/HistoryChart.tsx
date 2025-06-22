import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Label,
} from "recharts";

// 柱状图 mock 数据
const barData = [
  { date: "2024-06-01", value: 12 },
  { date: "2024-06-02", value: 18 },
  { date: "2024-06-03", value: 9 },
  { date: "2024-06-04", value: 22 },
  { date: "2024-06-05", value: 15 },
  { date: "2024-06-06", value: 17 },
  { date: "2024-06-07", value: 13 },
];

// 饼图 mock 数据
const pieData = [
  { name: "成功", value: 72, count: 72 },
  { name: "失败", value: 28, count: 28 },
];
const COLORS = [
  "#3B82F6", // 亮色蓝
  "#6366F1", // 亮色紫蓝
];
const DARK_COLORS = [
  "#60A5FA", // 暗色蓝
  "#818CF8", // 暗色紫蓝
];

// 自定义饼图 Tooltip
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.value / (data.value + (data.name === "成功" ? 28 : 72))) * 100).toFixed(1);
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {data.name}
        </p>
        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {data.count} 次
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {percentage}%
        </p>
      </div>
    );
  }
  return null;
};

const HistoryChart: React.FC<{ className?: string }> = ({ className = "" }) => {
  // 主题适配
  const isDark = typeof window !== "undefined" && document.documentElement.classList.contains("dark");
  const barColor = isDark ? "#60A5FA" : "#3B82F6";
  const pieColors = isDark ? DARK_COLORS : COLORS;
  const total = pieData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={`w-full flex flex-col md:flex-row gap-8 ${className}`}>
      {/* 柱状图 */}
      <div className="flex-1 bg-white dark:bg-[#232B55] rounded-xl shadow p-4 flex flex-col items-center">
        <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2">近7天检测次数</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
            <XAxis dataKey="date" tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip wrapperClassName="!rounded !shadow-lg !bg-white dark:!bg-gray-800 !border-0" labelClassName="text-xs" contentStyle={{ fontSize: 12 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={barColor} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* 饼图 */}
      <div className="flex-1 bg-white dark:bg-[#232B55] rounded-xl shadow p-4 flex flex-col items-center justify-center">
        <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2">检测成功/失败占比</div>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={54}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              isAnimationActive={true}
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
              ))}
              <Label
                value={`总数\n${total}`}
                position="center"
                fontSize={18}
                fill={isDark ? '#fff' : '#232B55'}
                style={{ whiteSpace: 'pre-line', fontWeight: 600 }}
              />
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value, entry, idx) => (
                <span style={{ color: isDark ? '#fff' : '#232B55', fontSize: 14 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart; 