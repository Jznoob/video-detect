import React from 'react';
import { FakeSegment } from '../../types/detection';

interface DetectionSummaryCardProps {
  fileName: string;
  model: string;
  threshold: number;
  forgedProbability: number;
  detectionTime: string;
  fakeSegments: FakeSegment[];
  onExport?: () => void; // ✅ 可选导出功能
}

const getRiskLevel = (p: number) => {
  if (p >= 0.8) return { label: '高', color: 'bg-red-500' };
  if (p >= 0.6) return { label: '中', color: 'bg-yellow-400' };
  return { label: '低', color: 'bg-green-500' };
};

const DetectionSummaryCard: React.FC<DetectionSummaryCardProps> = ({
  fileName,
  model,
  threshold,
  forgedProbability,
  detectionTime,
  fakeSegments,
  onExport,
}) => {
  const risk = getRiskLevel(forgedProbability);

  return (
    <div className="relative bg-white/30 dark:bg-gray-800/30 rounded-lg shadow p-6">
      {/* ✅ 右上角导出按钮 */}
      {onExport && (
        <button
          onClick={onExport}
          className="absolute top-3 right-3 text-xs text-indigo-400 hover:underline"
        >
          导出报告
        </button>
      )}

      <div className="flex items-center gap-3 mb-2">
        <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${risk.color}`}>
          风险：{risk.label}
        </span>
        <span className="text-gray-700 dark:text-gray-200 font-semibold">
          伪造概率: {(forgedProbability * 100).toFixed(2)}%
        </span>
      </div>

      <ul className="text-gray-700 dark:text-gray-300 text-sm mb-2">
        <li>文件名: {fileName}</li>
        <li>检测模型: {model}</li>
        <li>阈值: {threshold.toFixed(2)}</li>
        <li>检测时间: {detectionTime}</li>
      </ul>

      <div className="text-xs text-gray-500">伪造片段数: {fakeSegments.length}</div>
    </div>
  );
};

export default DetectionSummaryCard;
