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
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">📝 检测报告</h2>
      <div className="text-base text-gray-300 leading-relaxed">
        <div className="border-t pt-4 space-y-4 border-gray-700/50">
          <p className="text-gray-100">图片信息:</p>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-300">文件名: <span className="text-gray-100">{fileName || '未知'}</span></li>
            <li className="text-gray-300">检测模型: <span className="text-gray-100">{model}</span></li>
            <li className="text-gray-300">阈值: <span className="text-gray-100">{threshold.toFixed(2)}</span></li>
            <li className="text-gray-300">图像增强: <span className="text-gray-100">{enhancementEnabled ? '启用' : '未启用'}</span></li>
            <li className="text-gray-300">检测时间: <span className="text-gray-100">{detectionTime}</span></li>
          </ul>
        </div>
        <div className="border-t pt-4 space-y-4 border-gray-700/50">
          <p className={`${conclusion.color} font-semibold text-lg bg-gray-700/50 border border-gray-600/50 p-3 rounded-lg transition-colors duration-200`}>
            {conclusion.text}
          </p>
        </div>
        <div className="border-t pt-4 space-y-4 border-gray-700/50">
          <p className="text-gray-100">检测摘要:</p>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-300">伪造概率: <span className="text-gray-100">{forgedProbability.toFixed(2)}</span></li>
            <li className="text-gray-300">区域分布:</li>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pl-6">
              {heatmapSpots.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 text-sm">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-300">{s.position}，概率 <span className="text-gray-100">{(s.spotProbability * 100).toFixed(2)}%</span></span>
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