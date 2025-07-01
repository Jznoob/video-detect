import React from "react";

// mock.ts
import { Clock, CheckCircle2, Video } from "lucide-react";

const mockStats = [
  {
    title: "今日检测次数",
    value: 56,
    iconBg: "bg-grey-800 dark:bg-green-700",
    icon: <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-200" />,
    to: "/history", // 可选跳转路径
  },
  {
    title: "成功检测率",
    value: "92.4%",
    iconBg: "bg-purple-100 dark:bg-purple-700",
    icon: <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-200" />,
    to: "/result", // 示例路径
  },
  {
    title: "视频伪造数量",
    value: 8,
    iconBg: "bg-blue-100 dark:bg-blue-700",
    icon: <Video className="w-6 h-6 text-blue-600 dark:text-blue-200" />,
    to: "/video-detect", // 示例路径
  },
];

// 检测类型占比 - 环形图
export const detectionTypeData = [
  { name: '视频检测', value: 400, fill: '#3b82f6' },
  { name: '图片检测', value: 300, fill: '#8b5cf6' },
];

// 平均检测时长 (ms) - 柱状图
export const avgDetectionTimeData = [
  { name: 'Day 1', '图片(ms)': 120, '视频(ms)': 200 },
  { name: 'Day 2', '图片(ms)': 150, '视频(ms)': 230 },
  { name: 'Day 3', '图片(ms)': 100, '视频(ms)': 180 },
  { name: 'Day 4', '图片(ms)': 180, '视频(ms)': 280 },
  { name: 'Day 5', '图片(ms)': 130, '视频(ms)': 210 },
  { name: 'Day 6', '图片(ms)': 160, '视频(ms)': 250 },
  { name: 'Day 7', '图片(ms)': 140, '视频(ms)': 220 },
];

// 模型使用频率 - 条形图
export const modelUsageData = [
    { name: 'EfficientNet-B7', usage: 120, fill: '#22c55e' },
    { name: 'ResNet-50', usage: 98, fill: '#14b8a6' },
    { name: 'Vision Transformer', usage: 75, fill: '#0ea5e9' },
    { name: 'MobileNetV2', usage: 50, fill: '#6366f1' },
    { name: 'InceptionV3', usage: 32, fill: '#8b5cf6' },
];

// 活跃度热图 - 7天 x 24小时
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => `${i}`);
const heatmapData = new Array(7).fill(0).map(() => 
  new Array(24).fill(0).map(() => Math.floor(Math.random() * 50) + 10)
);

export const getActivityHeatmapData = () => {
    return {
        xLabels: hours,
        yLabels: days,
        data: heatmapData
    }
}

// const USE_MOCK = process.env.USE_MOCK === 'true';

export const getStats = async () => {
  // if (USE_MOCK) {
    return mockStats;
  // } else {
  //   // TODO: 替换为后端接口请求
  //   // const res = await fetch('/api/dashboard/stats');
  //   // return await res.json();
  //   return [];
  // }
}; 