import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
