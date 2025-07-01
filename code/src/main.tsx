import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Toaster } from "react-hot-toast";
/* ✅ 1. ➜ 新增：引入 QueryClient */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/* ✅ 2. ➜ 创建全局单例 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,          // 1 分钟内不重新请求
      refetchOnWindowFocus: false,
    },
  },
});
initParticlesEngine(async (engine) => {
  await loadSlim(engine);
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
