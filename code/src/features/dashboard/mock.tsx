import React from "react";

// mock.ts
import { Clock, CheckCircle2, Video } from "lucide-react";

const mockStats = [
  {
    title: "今日检测次数",
    value: 56,
    iconBg: "bg-indigo-100 dark:bg-indigo-700",
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


const mockRecentTasks = [
  {
    filename: "meeting.mp4",
    type: "视频",
    status: "成功",
    time: "2024-06-01 10:23",
  },
  {
    filename: "cat.jpg",
    type: "图片",
    status: "失败",
    time: "2024-06-01 09:58",
  },
  {
    filename: "nature.png",
    type: "图片",
    status: "成功",
    time: "2024-06-01 09:30",
  },
  {
    filename: "news.mp4",
    type: "视频",
    status: "成功",
    time: "2024-06-01 08:50",
  },
  {
    filename: "portrait.jpg",
    type: "图片",
    status: "成功",
    time: "2024-06-01 08:20",
  },
];

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

export const getRecentTasks = async () => {
//  if (USE_MOCK) {
    return mockRecentTasks;
  // } else {
  //   // TODO: 替换为后端接口请求
  //   // const res = await fetch('/api/dashboard/recent-tasks');
  //   // return await res.json();
  //   return [];
  // }
}; 