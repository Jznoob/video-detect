import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHistoryRecordById, getResultColor } from "../../../services/historyData";
import FileTypeIcon from "../../../components/FileTypeIcon";

interface HistoryDetailProps {
  fileName: string;
  detectionTime: string;
  forgedProbability: number;
  model: string;
  status: 'success' | 'warning' | 'error';
}

const HistoryDetail: React.FC<HistoryDetailProps> = ({
  fileName,
  detectionTime,
  forgedProbability,
  model,
  status
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 从统一数据源获取记录
  const record = id ? getHistoryRecordById(id) : undefined;
  
  if (!record) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">记录未找到</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700/90 transition-colors duration-200"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

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

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="status-success">检测完成</span>;
      case 'warning':
        return <span className="status-warning">疑似伪造</span>;
      case 'error':
        return <span className="status-error">检测失败</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回
          </button>
        </div>
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            检测详情
          </h1>
          <p className="text-gray-400">
            记录 ID: {record.id}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：基本信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 文件信息卡片 */}
            <div className="bg-gray-800/90 rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">文件信息</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileTypeIcon type={record.type} className="w-6 h-6" />
                  <div>
                    <h3 className="font-medium text-gray-100">
                      {record.fileName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {record.type === "video" ? "视频文件" : "图片文件"}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">文件大小:</span>
                    <span className="ml-2 font-medium text-gray-200">{record.fileSize}</span>
                  </div>
                  {record.type === "video" && record.duration && (
                    <div>
                      <span className="text-gray-400">时长:</span>
                      <span className="ml-2 font-medium text-gray-200">{record.duration}</span>
                    </div>
                  )}
                  {record.type === "image" && record.imageSize && (
                    <div>
                      <span className="text-gray-400">尺寸:</span>
                      <span className="ml-2 font-medium text-gray-200">{record.imageSize}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 检测结果卡片 */}
            <div className="bg-gray-800/90 rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">检测结果</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">检测结果:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getResultColor(record.result)}`}>
                    {getResultText(record.result)}
                  </span>
                </div>
                
                {record.result !== "检测中" && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">置信度:</span>
                    <span className="font-medium text-blue-400">
                      {(record.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">检测时间:</span>
                  <span className="font-medium text-gray-200">{record.time}</span>
                </div>
              </div>
            </div>

            {/* 检测参数卡片 */}
            <div className="bg-gray-800/90 rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">检测参数</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">检测模型:</span>
                  <span className="ml-2 font-medium text-gray-200">{record.model}</span>
                </div>
                <div>
                  <span className="text-gray-400">检测阈值:</span>
                  <span className="ml-2 font-medium text-gray-200">{record.threshold}</span>
                </div>
                {record.type === "image" && (
                  <div>
                    <span className="text-gray-400">图像增强:</span>
                    <span className="ml-2 font-medium text-gray-200">
                      {record.enhance ? "启用" : "禁用"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：预览区域 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/90 rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">文件预览</h2>
              <div className="aspect-video bg-gray-700/50 rounded-lg flex items-center justify-center overflow-hidden">
                {record.type === "video" ? (
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-400">视频文件</p>
                    <p className="text-xs text-gray-500 mt-1">{record.fileName}</p>
                  </div>
                ) : record.thumbnail ? (
                  <img 
                    src={record.thumbnail} 
                    alt={record.fileName}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-400">图片文件</p>
                    <p className="text-xs text-gray-500 mt-1">{record.fileName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail; 