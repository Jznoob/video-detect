import React, { useEffect, useState, lazy, Suspense } from "react";
import StatCard from "./components/StatCard";
import RecentTaskTable from "./components/RecentTaskTable";
import { getStats } from "./mock";
import { toast } from "sonner";
import HistoryChart from "./components/HistoryChart";
import DetectionTypeChart from "./components/DetectionTypeChart";
import AvgDetectionTimeChart from "./components/AvgDetectionTimeChart";
import ModelFrequencyChart from "./components/ModelFrequencyChart";
import ErrorBoundary from "../../components/ErrorBoundary";

const ActivityHeatmap = lazy(() => import('./components/ActivityHeatmap'));

type Stat = {
  title: string;
  value: string | number;
  iconBg: string;
  icon: React.ReactNode;
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    toast.success("欢迎使用多媒体篡改检测系统！");
    // 获取数据
    const fetchData = async () => {
      setIsLoading(true);
      const s = await getStats();
      setStats(s);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-10">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        多媒体篡改检测总览
      </h1>

      {/* 统计卡片区或骨架 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-20 w-full min-w-[160px] max-w-[320px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
                style={{ height: 80 }}
              />
            ))
          : stats.map((item) => (
              <StatCard key={item.title} {...item} />
            ))}
      </section>

      {/* 最近任务区或骨架 */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          最近检测记录
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <RecentTaskTable />
        )}
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          检测数据可视化
        </h2>
        <HistoryChart />
      </section>

      {/* 新增图表区 */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            检测类型占比
          </h2>
          <DetectionTypeChart />
        </div>
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            平均检测时长 (近7日)
          </h2>
          <AvgDetectionTimeChart />
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          模型使用频率
        </h2>
        <ModelFrequencyChart />
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          检测活跃度 (近7日)
        </h2>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-48 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />}>
            <ActivityHeatmap />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Dashboard;
