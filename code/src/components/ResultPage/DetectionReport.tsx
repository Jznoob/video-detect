import React from 'react';

interface DetectionReportProps {
  fileName: string | undefined;
  model: string;
  threshold: number;
  enhancementEnabled: boolean;
  forgedProbability: number;
  heatmapSpots: Array<{ id: string; path: string; color: string; opacity: number; position?: string; spotProbability: number }>;
  getForgeryConclusion: (probability: number) => { text: string; color: string; };
}

const DetectionReport: React.FC<DetectionReportProps> = ({ fileName, model, threshold, enhancementEnabled, forgedProbability, heatmapSpots, getForgeryConclusion }) => {
  const detectionTime = new Date().toLocaleString();
  const conclusion = getForgeryConclusion(forgedProbability);

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📝 检测报告</h2>
      <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <div className="border-t pt-4 space-y-4 border-gray-200 dark:border-gray-700">
          <p>图片信息:</p>
          <ul className="list-disc list-inside">
            <li>文件名: {fileName || '未知'}</li>
            <li>检测模型: {model}</li>
            <li>阈值: {threshold.toFixed(2)}</li>
            <li>图像增强: {enhancementEnabled ? '启用' : '未启用'}</li>
            <li>检测时间: {detectionTime}</li>
          </ul>
        </div>
        <div className="border-t pt-4 space-y-4 border-gray-200 dark:border-gray-700">
          <p className={`${conclusion.color} font-semibold text-lg border p-2 rounded transition-colors duration-300`}>{conclusion.text}</p>
        </div>
        <div className="border-t pt-4 space-y-4 border-gray-200 dark:border-gray-700">
          <p>检测摘要:</p>
          <ul className="list-disc list-inside">
            <li>伪造概率: {forgedProbability.toFixed(2)}</li>
            <li>区域分布:</li>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {heatmapSpots.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: s.color }} />
                  <span>{s.position}，概率 {(s.spotProbability * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetectionReport; 