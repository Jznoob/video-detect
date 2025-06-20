import React, { useState } from "react";
import { Toaster } from "sonner";
import UploadZone from "./components/UploadZone";
import DetectParams from "./components/DetectParams";
import DetectButton from "./components/DetectButton";
import { detectVideo } from "../../services/detect";

const DetectPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>("YOLO-Fake");
  const [threshold, setThreshold] = useState<number>(0.7);
  const [interval, setInterval] = useState<number>(1);


  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Toaster position="top-right" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
      )}
      <main className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <UploadZone onFileChange={setFile} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <DetectParams
            model={model}
            onModelChange={setModel}
            threshold={threshold}
            onThresholdChange={setThreshold}
            interval={interval}
            onIntervalChange={setInterval}
            defaultModel="YOLO-Fake"
          />
        </div>

        </div>
      </main>
    </div>
  );
};

export default DetectPage;
