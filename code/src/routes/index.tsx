import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard";
import Result from "../features/result";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
