import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface HistoryRecord {
  id: string;
  timestamp: string;
  fileName: string;
  fileType: "video" | "image";
  result: "fake" | "real" | "processing";
  model: string;
  confidence: number;
}

// Mock 数据
const mockHistoryData: HistoryRecord[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:25",
    fileName: "sample_video_001.mp4",
    fileType: "video",
    result: "fake",
    model: "ResNet",
    confidence: 0.87,
  },
  {
    id: "2",
    timestamp: "2024-01-15 13:45:12",
    fileName: "photo_2024.jpg",
    fileType: "image",
    result: "real",
    model: "EfficientNet",
    confidence: 0.92,
  },
  {
    id: "3",
    timestamp: "2024-01-15 12:20:08",
    fileName: "test_video.mp4",
    fileType: "video",
    result: "fake",
    model: "Transformer",
    confidence: 0.78,
  },
  {
    id: "4",
    timestamp: "2024-01-15 11:15:33",
    fileName: "document.png",
    fileType: "image",
    result: "real",
    model: "VisionTransformer",
    confidence: 0.95,
  },
  {
    id: "5",
    timestamp: "2024-01-15 10:30:45",
    fileName: "demo_video.avi",
    fileType: "video",
    result: "processing",
    model: "Ensemble",
    confidence: 0.0,
  },
];

const HistoryPanel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const navigate = useNavigate();

  // 自动轮播
  useEffect(() => {
    if (!isAutoScroll) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockHistoryData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoScroll]);

  const handleRecordClick = (record: HistoryRecord) => {
    navigate(`/history/${record.id}`, { state: { record } });
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "fake":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "real":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "processing":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getResultText = (result: string) => {
    switch (result) {
      case "fake":
        return "伪造";
      case "real":
        return "真实";
      case "processing":
        return "检测中";
      default:
        return "未知";
    }
  };

  const getFileTypeIcon = (type: string) => {
    return type === "video" ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">历史记录</h3>
        <button
          onClick={() => setIsAutoScroll(!isAutoScroll)}
          className={`px-2 py-1 text-xs rounded transition ${
            isAutoScroll
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20"
              : "bg-gray-100 text-gray-600 dark:bg-gray-700"
          }`}
        >
          {isAutoScroll ? "自动滚动" : "手动模式"}
        </button>
      </div>

      {/* 记录列表 */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {mockHistoryData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRecordClick(record)}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getFileTypeIcon(record.fileType)}
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
                      {record.fileName}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getResultColor(
                      record.result
                    )}`}
                  >
                    {getResultText(record.result)}
                  </span>
                </div>
                
                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>时间：{record.timestamp}</span>
                    <span>模型：{record.model}</span>
                  </div>
                  {record.result !== "processing" && (
                    <div className="flex justify-between">
                      <span>置信度：{(record.confidence * 100).toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-1 mt-4">
        {mockHistoryData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel; 