import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard";
import DetectPage from "../features/video-detect";
import ResultPage from "../features/result";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/video-detect" element={<DetectPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}
