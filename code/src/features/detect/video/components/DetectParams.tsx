import React from "react";

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
  const [thresholdError, setThresholdError] = React.useState<string>("");
  const [intervalError, setIntervalError] = React.useState<string>("");

  const handleModelChange = (value: string) => {
    onModelChange(value);
  };

  const handleThreshold = (value: string) => {
    const v = parseFloat(value);
    onThresholdChange(v);
    if (v < 0.5 || v > 1) {
      setThresholdError("阈值范围为 0.5~1.0");
    } else {
      setThresholdError("");
    }
  };

  const handleInterval = (value: string) => {
    const v = parseInt(value);
    onIntervalChange(v);
    if (v < 1 || !Number.isInteger(v)) {
      setIntervalError("必须为正整数");
    } else {
      setIntervalError("");
    }
  };

  const selectProps = model
    ? { value: model }
    : { defaultValue: defaultModel || models[0] };

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
          value={threshold}
          onChange={(e) => handleThreshold(e.target.value)}
          className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
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
