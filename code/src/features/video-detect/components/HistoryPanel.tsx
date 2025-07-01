import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useHistoryRecords, HistoryRecord } from "../../../hooks/useHistoryRecords";
import FileTypeIcon from "../../../components/FileTypeIcon";

// 用于本地判断颜色
const getResultColor = (result: string): string => {
  switch (result) {
    case "篡改":
      return "text-red-600 bg-red-100 dark:bg-red-900/20";
    case "未篡改":
      return "text-green-600 bg-green-100 dark:bg-green-900/20";
    case "检测中":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
  }
};

const HistoryPanel: React.FC = () => {
  const { records: historyData, loading } = useHistoryRecords();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const navigate = useNavigate();

  // 自动轮播
  useEffect(() => {
    if (!isAutoScroll || historyData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % historyData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoScroll, historyData.length]);

  const handleRecordClick = (record: HistoryRecord) => {
    navigate(`/history/${record.id}`);
  };

  const getResultText = (result: string) => {
    switch (result) {
      case "篡改":
        return "伪造";
      case "未篡改":
        return "真实";
      case "检测中":
        return "检测中";
      default:
        return "未知";
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        正在加载历史记录...
      </div>
    );
  }

  if (historyData.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">历史记录</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">暂无历史记录</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white dark:text-white">历史记录</h3>
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
            {historyData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRecordClick(record)}
                className="p-3 bg-gray-800 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileTypeIcon type={record.type} />
                    <span className="text-sm font-medium text-white dark:text-white truncate max-w-32">
                      {record.fileName}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getResultColor(record.result)}`}
                  >
                    {getResultText(record.result)}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>时间：{record.time}</span>
                    <span>模型：{record.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>大小：{record.fileSize}</span>
                    {record.result !== "检测中" && (
                      <span>置信度：{(record.confidence * 100).toFixed(1)}%</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 指示器 */}
      <div className="flex justify-center gap-1 mt-4">
        {historyData.map((_, index) => (
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
