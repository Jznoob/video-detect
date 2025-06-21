import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard";
import DetectPage from "../features/video-detect";
import ResultPage from "../features/result";
import { useLocation } from "react-router-dom";

// 占位历史页面
const HistoryPage = () => <div className="p-8 text-center text-lg">历史记录页面建设中...</div>;

// 历史记录详情页面
const HistoryDetailPage = () => {
  const { state } = useLocation();
  return (
    <div className="min-h-screen bg-[#f7f8fa] dark:bg-[#181A20] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">历史记录详情</h1>
        <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/video-detect" element={<DetectPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/history/:id" element={<HistoryDetailPage />} />
    </Routes>
  );
}
