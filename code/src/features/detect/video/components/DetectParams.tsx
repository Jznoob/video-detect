import React from "react";
import { toast } from "sonner";

export interface DetectParamsProps {
  model?: string;
  /** 默认选中的模型名称 */
  defaultModel?: string;
  onModelChange: (value: string) => void;
  threshold: number;
  onThresholdChange: (v: number) => void;
  interval: number;
  onIntervalChange: (v: number) => void;
}

const models = ["YOLO-Fake", "DeepFake-1", "ViT-Detect"];

const DetectParams: React.FC<DetectParamsProps> = ({
  model,
  defaultModel,
  onModelChange,
  threshold,
  onThresholdChange,
  interval,
  onIntervalChange,
}) => {

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <label className="block text-sm font-medium">检测模型</label>
        <select
          {...selectProps}
          onChange={(e) => handleModelChange(e.target.value)}
          className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">置信度阈值</label>
        <input
          type="number"
          step="0.01"
          min="0.5"
          max="1"
          required
          value={threshold}

        />
        {thresholdError && (
          <p className="text-xs text-red-600">{thresholdError}</p>
        )}
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">帧抽样间隔</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => handleInterval(e.target.value)}
          className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
        {intervalError && <p className="text-xs text-red-600">{intervalError}</p>}
      </div>
    </div>
  );
};

export default DetectParams;
