import React from "react";
import { toast } from "sonner";

export interface DetectParamsProps {
  model: string;
  onModelChange: (value: string) => void;
  threshold: number;
  onThresholdChange: (v: number) => void;
  interval: number;
  onIntervalChange: (v: number) => void;
}

const models = ["YOLO-Fake", "DeepFake-1", "ViT-Detect"];

const DetectParams: React.FC<DetectParamsProps> = ({
  model,
  onModelChange,
  threshold,
  onThresholdChange,
  interval,
  onIntervalChange,
}) => {
  const handleThresholdChange = (value: number) => {
    onThresholdChange(value);
    if (value < 0.5 || value > 1) {
      toast.error("阈值必须在 0.5-1 之间");
    }
  };
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">检测模型</label>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="w-full border rounded p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">置信度阈值</label>
        <input
          type="number"
          step="0.01"
          min="0.5"
          max="1"
          required
          value={threshold}
          onChange={(e) => handleThresholdChange(parseFloat(e.target.value))}
          className="w-full border rounded p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">帧抽样间隔</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => onIntervalChange(parseInt(e.target.value))}
          className="w-full border rounded p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
    </div>
  );
};

export default DetectParams;
