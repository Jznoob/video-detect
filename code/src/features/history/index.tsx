import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useHistoryRecords, HistoryRecord } from "../../hooks/useHistoryRecords";
import FileTypeIcon from "../../components/FileTypeIcon";

// 本地定义颜色函数（原来从 service 里导入）
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

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { records: historyData, loading } = useHistoryRecords();

  const [filteredData, setFilteredData] = useState<HistoryRecord[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let filtered = historyData;

    if (filter !== "all") {
      filtered = filtered.filter(record => record.type === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [historyData, filter, searchTerm]);

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

  const getStats = () => {
    const total = historyData.length;
    const videos = historyData.filter(r => r.type === "video").length;
    const images = historyData.filter(r => r.type === "image").length;
    const fake = historyData.filter(r => r.result === "篡改").length;
    const real = historyData.filter(r => r.result === "未篡改").length;
    const processing = historyData.filter(r => r.result === "检测中").length;
    return { total, videos, images, fake, real, processing };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* 页面标题 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">历史记录</h1>
          <p className="text-gray-400">查看所有检测记录和结果</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "总记录", value: stats.total, color: "text-blue-400" },
            { label: "视频", value: stats.videos, color: "text-purple-400" },
            { label: "图片", value: stats.images, color: "text-green-400" },
            { label: "伪造", value: stats.fake, color: "text-red-400" },
            { label: "真实", value: stats.real, color: "text-green-400" },
            { label: "检测中", value: stats.processing, color: "text-yellow-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-gray-800/90 rounded-xl shadow-lg p-4 border border-gray-700/50">
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* 筛选和搜索 */}
        <div className="bg-gray-800/90 rounded-xl shadow-lg p-6 border border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜索文件名或模型..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {["all", "video", "image"].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === type
                      ? "bg-blue-600/90 text-white shadow-sm shadow-blue-500/20"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:text-gray-100"
                  }`}
                >
                  {type === "all" ? "全部" : type === "video" ? "视频" : "图片"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 加载中处理 */}
        {loading ? (
          <div className="text-center text-gray-400">正在加载中...</div>
        ) : (
          <div className="bg-gray-800/90 rounded-xl shadow-lg overflow-hidden border border-gray-700/50">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    {["文件信息", "类型", "结果", "模型", "置信度", "检测时间"].map(col => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredData.map((record) => (
                    <tr
                      key={record.id}
                      onClick={() => handleRecordClick(record)}
                      className="hover:bg-gray-700/30 cursor-pointer transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FileTypeIcon type={record.type} />
                          <div>
                            <div className="text-sm font-medium text-gray-100">{record.fileName}</div>
                            <div className="text-xs text-gray-400">{record.fileSize}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                        {record.type === "video" ? "视频" : "图片"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(record.result)}`}>
                          {getResultText(record.result)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {record.model}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {record.result !== "检测中" ? `${(record.confidence * 100).toFixed(1)}%` : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {record.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">暂无记录</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
