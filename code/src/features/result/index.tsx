import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface Segment {
  start: number;
  end: number;
}

interface ResultData {
  videoUrl: string;
  segments: Segment[];
  model: string;
  confidence: number;
  time: string;
}

// 模拟异步获取检测结果
async function getResult(taskId: string): Promise<ResultData> {
  await new Promise((r) => setTimeout(r, 800));
  return {
    videoUrl: "/assets/video.mp4",
    segments: [
      { start: 3, end: 5 },
      { start: 12, end: 14 },
    ],
    model: "YOLO-Fake",
    confidence: 0.92,
    time: "2.3s",
  };
}

const ResultPage: React.FC = () => {
  const { search } = useLocation();
  const taskId =
    new URLSearchParams(search).get("taskId") ||
    new URLSearchParams(search).get("id") ||
    "";

  const [data, setData] = useState<ResultData | null>(null);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!taskId) return;
    getResult(taskId).then(setData);
  }, [taskId]);

  const handleLoaded = () => setDuration(videoRef.current?.duration || 0);

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

  const downloadReport = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#181A20] text-gray-900 dark:text-white">
        加载中...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181A20] text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* 顶部视频播放器 */}
        <video
          ref={videoRef}
          src={data.videoUrl}
          controls
          onLoadedMetadata={handleLoaded}
          className="w-full rounded-lg shadow"
        />

        {/* 时间线高亮 */}
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden cursor-pointer">
          {duration > 0 &&
            data.segments.map((s, idx) => {
              const left = `${(s.start / duration) * 100}%`;
              const width = `${((s.end - s.start) / duration) * 100}%`;
              return (
                <div
                  key={idx}
                  onClick={() => seekTo(s.start)}
                  title={`${s.start}s - ${s.end}s`}
                  className="absolute top-0 h-full bg-red-500 hover:bg-red-600"
                  style={{ left, width }}
                />
              );
            })}
        </div>

        {/* 检测详情 */}
        <div className="bg-white dark:bg-[#232B55] rounded-xl shadow p-6 space-y-2">
          <h2 className="text-lg font-semibold">检测详情</h2>
          <p>模型：{data.model}</p>
          <p>置信度：{(data.confidence * 100).toFixed(1)}%</p>
          <p>耗时：{data.time}</p>
          <p>
            伪造片段：{data.segments.map((s) => `[${s.start}-${s.end}]`).join(" , ")}
          </p>
        </div>

        {/* 下载按钮 */}
        <div className="text-center pt-2">
          <button
            onClick={downloadReport}
            className="px-4 py-2 rounded bg-[#232B55] text-white hover:bg-[#1b2140]"
          >
            下载报告
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

