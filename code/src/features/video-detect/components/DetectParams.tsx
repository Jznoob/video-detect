import React, { useEffect } from "react";

export interface DetectParamsProps {
  model: string;
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
  useEffect(() => {
    if (defaultModel) {
      onModelChange(defaultModel);
    }
  }, [defaultModel, onModelChange]);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <label className="block text-sm font-medium">检测模型</label>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
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
          onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
          className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">帧抽样间隔</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => onIntervalChange(parseInt(e.target.value))}
          className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
    </div>
  );
};

export default DetectParams;
