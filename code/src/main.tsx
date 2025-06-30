import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Toaster } from "react-hot-toast";

initParticlesEngine(async (engine) => {
  await loadSlim(engine);
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <>
        <App />
        <Toaster position="top-right" />
      </>
    </React.StrictMode>
  );
});
