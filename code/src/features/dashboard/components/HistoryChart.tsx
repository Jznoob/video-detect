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
  { date: "2025-06-26", value: 12 },
  { date: "2025-06-27", value: 18 },
  { date: "2025-06-28", value: 9 },
  { date: "2025-06-29", value: 22 },
  { date: "2025-06-30", value: 15 },
  { date: "2025-07-01", value: 17 },
  { date: "2025-07-02", value: 5 },
];

// 饼图 mock 数据
const pieData = [
  { name: "伪造", value: 2151, count: 2151 },
  { name: "真实", value: 472, count: 472 },
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
    const total = pieData.reduce((sum, d) => sum + d.value, 0);
    const percentage = ((data.value / total) * 100).toFixed(1);
    
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-100">
          {data.name}
        </p>
        <p className="text-lg font-bold text-blue-400">
          {data.count} 次
        </p>
        <p className="text-xs text-gray-400">
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
  const barColor = "#60A5FA";  // 统一使用亮蓝色
  const pieColors = DARK_COLORS;  // 统一使用暗色系列
  const total = 2151;

  return (
    <div className={`w-full flex flex-col md:flex-row gap-8 ${className}`}>
      {/* 柱状图 */}
      <div className="flex-1 bg-gray-800/90 rounded-xl shadow-lg p-6 flex flex-col items-center">
        <div className="font-semibold text-gray-100 mb-4">近7天检测次数</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(55, 65, 81, 0.3)' }}
              contentStyle={{ 
                backgroundColor: '#1F2937',
                borderColor: '#374151',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={barColor} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* 饼图 */}
      <div className="flex-1 bg-gray-800/90 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
        <div className="font-semibold text-gray-100 mb-4">检测成功/失败占比</div>
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
                fill="#F3F4F6"
                style={{ whiteSpace: 'pre-line', fontWeight: 600 }}
              />
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => (
                <span className="text-gray-300 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart; 