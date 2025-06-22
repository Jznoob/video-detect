import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard";
import DetectPage from "../features/video-detect";
import ResultPage from "../features/result";
import HistoryPage from "../features/history";
import HistoryDetail from "../features/history/components/HistoryDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/video-detect" element={<DetectPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/history/:id" element={<HistoryDetail />} />
    </Routes>
  );
}
