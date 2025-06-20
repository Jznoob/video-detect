import React, { useState } from "react";
import { Toaster } from "sonner";
import UploadZone from "./components/UploadZone";
import DetectParams from "./components/DetectParams";
import DetectButton from "./components/DetectButton";

const DetectPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>("YOLO-Fake");
  const [threshold, setThreshold] = useState<number>(0.7);
  const [interval, setInterval] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181A20] text-gray-900 dark:text-white">
      <Toaster position="top-right" />
      <main className="max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div className="bg-white dark:bg-[#232B55] rounded-xl shadow p-6">
          <UploadZone onFileChange={setFile} />
        </div>
        <div className="bg-white dark:bg-[#232B55] rounded-xl shadow p-6">
          <DetectParams
            model={model}
            onModelChange={setModel}
            threshold={threshold}
            onThresholdChange={setThreshold}
            interval={interval}
            onIntervalChange={setInterval}
          />
        </div>
        <div className="bg-white dark:bg-[#232B55] rounded-xl shadow p-6 text-center">
          <DetectButton
            file={file}
            model={model}
            threshold={threshold}
            interval={interval}
          />
        </div>
      </main>
    </div>
  );
};

export default DetectPage;
