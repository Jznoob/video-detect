import React, { useRef, useEffect, useState } from 'react';
import VideoDetectionFrameGallery, { VideoDetectionFrame } from './VideoDetectionFrameGallery';

interface VideoDetectionReportProps {
  fileName: string;
  model: string;
  threshold: number;
  forgedProbability: number;
  detectionTime: string;
  fakeSegments: Array<{ start: number; end: number; probability: number }>;
  frames: VideoDetectionFrame[];
}

const FPS = 5;

const VideoDetectionReport: React.FC<VideoDetectionReportProps> = ({
  fileName,
  model,
  threshold,
  forgedProbability,
  detectionTime,
  fakeSegments,
  frames: propFrames,
}) => {
  const [frames, setFrames] = useState<VideoDetectionFrame[]>(propFrames || []);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [extracting, setExtracting] = useState(false);

  // 模拟帧抽取逻辑
  useEffect(() => {
    if (frames.length > 0 || !fileName.endsWith('.mp4')) return;
    const videoUrl = `/uploads/${fileName}`;
    setExtracting(true);
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.muted = true;
    video.onloadedmetadata = () => {
      const duration = video.duration;
      const totalFrames = Math.floor(duration * FPS);
      const newFrames: VideoDetectionFrame[] = [];
      let currentFrame = 0;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 180;
      // 递归抽帧
      const extractFrame = () => {
        if (currentFrame >= totalFrames) {
          setFrames(newFrames);
          setExtracting(false);
          return;
        }
        video.currentTime = currentFrame / FPS;
      };
      video.onseeked = () => {
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        // TODO: 真实概率和 mask 需后端/算法支持，这里 mock
        const probability = Math.random();
        newFrames.push({
          frameIndex: currentFrame,
          probability,
          imageUrl,
        });
        currentFrame++;
        setTimeout(extractFrame, 50); // 避免卡死
      };
      extractFrame();
    };
  }, [fileName, frames.length]);

  const handleExportReport = () => {
    // TODO: 实现 PDF 导出，推荐使用 jsPDF/html2canvas
    alert('TODO: 导出 PDF 功能未实现');
  };

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
        <div className="border-t pt-4 space-y-4">
          <p className="font-semibold">帧抽取与异常帧：</p>
          {extracting && <div className="text-blue-500">正在抽取帧...</div>}
          <VideoDetectionFrameGallery frames={frames} />
        </div>
        <div className="pt-6 flex justify-end">
          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            导出 PDF
          </button>
        </div>
      </div>
    </div>
  );
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default VideoDetectionReport; 