import React, { useState } from 'react';
import VideoDetectionReport from '../components/ResultPage/VideoDetectionReport';

interface FakeSegment {
  start: number;
  end: number;
  probability: number;
}

const VideoResultPage: React.FC = () => {
  // 获取当前时间
  const currentTime = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  // 固定的示例数据
  const detectionData = {
    fileName: "drone_surveillance_2025_07_01.mp4",
    model: "ResNet",
    threshold: 0.75,
    forgedProbability: 0.7625,
    detectionTime: currentTime,
    fakeSegments: [
      { start: 15, end: 20, probability: 0.85 },
      { start: 45, end: 50, probability: 0.92 },
      { start: 90, end: 95, probability: 0.78 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题和文件信息 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            视频检测结果
          </h1>
          <p className="text-gray-400">
            文件名：{detectionData.fileName}
          </p>
        </div>

        {/* 文件信息和伪造概率 */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="text-gray-300">
                检测时间：<span className="text-gray-100">{detectionData.detectionTime}</span>
              </div>
              <div className="text-gray-300">
                检测模型：<span className="text-gray-100">{detectionData.model}</span>
              </div>
            </div>
            <div className="text-xl font-bold">
              <span className="text-gray-300">伪造概率：</span>
              <span className="text-yellow-400">
                {(detectionData.forgedProbability * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* 完整检测报告 */}
        <VideoDetectionReport {...detectionData} />
      </div>
    </div>
  );
};

export default VideoResultPage;