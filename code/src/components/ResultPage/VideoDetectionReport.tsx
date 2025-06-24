import React from 'react';

interface VideoDetectionReportProps {
  fileName: string;
  model: string;
  threshold: number;
  forgedProbability: number;
  detectionTime: string;
  fakeSegments: Array<{ start: number; end: number; probability: number }>;
}

const VideoDetectionReport: React.FC<VideoDetectionReportProps> = ({
  fileName,
  model,
  threshold,
  forgedProbability,
  detectionTime,
  fakeSegments,
}) => {
  const getForgeryConclusion = (probability: number) => {
    if (probability > 0.8) {
      return '明显伪造';
    } else if (probability > 0.5) {
      return '疑似伪造';
    } else {
      return '未发现明显伪造';
    }
  };

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📝 检测报告</h2>
      <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <div className="border-t pt-4 space-y-4">
          <p>视频信息:</p>
          <ul className="list-disc list-inside">
            <li>文件名: {fileName}</li>
            <li>检测模型: {model}</li>
            <li>阈值: {threshold.toFixed(2)}</li>
            <li>检测时间: {detectionTime}</li>
          </ul>
        </div>
        <div className="border-t pt-4 space-y-4">
          <p className="font-semibold text-lg">伪造概率: {(forgedProbability * 100).toFixed(2)}%</p>
          <p className="font-semibold text-lg">检测结论: {getForgeryConclusion(forgedProbability)}</p>
        </div>
        <div className="border-t pt-4 space-y-4">
          <p>伪造时间段:</p>
          <ul className="list-disc list-inside">
            {fakeSegments.map((segment, index) => (
              <li key={index}>
                {formatTime(segment.start)} - {formatTime(segment.end)}，伪造概率 {(segment.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default VideoDetectionReport; 