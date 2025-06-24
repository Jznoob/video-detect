import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import VideoDetectionReport from '../components/ResultPage/VideoDetectionReport';

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

function generateFakeSegments(duration: number) {
  const segments = [];
  const count = Math.floor(2 + Math.random() * 3); // 2~4段
  let used = new Set<number>();

  while (segments.length < count) {
    let start = Math.floor(Math.random() * (duration - 10));
    let end = start + Math.floor(3 + Math.random() * 5);
    if (end > duration) continue;

    // 避免重叠
    if ([...used].some(u => (start <= u && u <= end))) continue;
    for (let i = start; i <= end; i++) used.add(i);

    segments.push({
      start,
      end,
      probability: parseFloat((0.7 + Math.random() * 0.3).toFixed(2)),
    });
  }

  return segments;
}

const VideoResultPage: React.FC = () => {
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [forgedProbability, setForgedProbability] = useState<number>(Math.random());
  const [fakeSegments, setFakeSegments] = useState<Array<{ start: number; end: number; probability: number }>>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoFile = location.state?.videoFile as File | undefined;
  const fileName = videoFile ? videoFile.name : '未知文件名';

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [videoFile]);

  useEffect(() => {
    if (videoDuration > 0) {
      const segments = generateFakeSegments(videoDuration);
      setFakeSegments(segments);
    }
  }, [videoDuration]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">视频检测结果</h1>
      <div className="flex justify-between items-center mb-6 max-w-full">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">文件名: {fileName}</span>
        <span className="text-xl font-semibold text-gray-800 dark:text-white">时长: {formatTime(videoDuration)}</span>
        <span className="text-xl font-semibold text-gray-800 dark:text-white">伪造概率: <span className="text-red-500">{(forgedProbability * 100).toFixed(2)}%</span></span>
      </div>

      <div className="flex-grow bg-gray-900/50 rounded-xl shadow-lg p-4 flex items-center justify-center">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-[360px] flex items-center justify-center text-gray-500">视频加载中...</div>
        )}
      </div>

      <VideoDetectionReport
        fileName={fileName}
        model={location.state?.model}
        threshold={location.state?.threshold}
        enhancementEnabled={location.state?.enhancementEnabled}
        forgedProbability={forgedProbability}
        detectionTime={new Date().toLocaleString()}
        fakeSegments={fakeSegments}
      />
    </div>
  );
};

export default VideoResultPage; 