import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/dashboard";
import DetectPage from "../features/video-detect";
import ResultPage from "../features/result";
import HistoryPage from "../features/history";
import HistoryDetail from "../features/history/components/HistoryDetail";
import LoginPage from "../features/login";
import ImageResultPage from "../pages/ImageResultPage";
import VideoResultPage from "../pages/VideoResultPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone login route at root */}
      <Route path="/" element={<LoginPage />} />

      {/* Routes with the main layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/video-detect" element={<DetectPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/image-result" element={<ImageResultPage />} />
        <Route path="/video-result/:id" element={<VideoResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<HistoryDetail />} />
        
      </Route>
    </Routes>
  );
}
