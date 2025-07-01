import React from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryRecords } from "../../../hooks/useHistoryRecords"; // ✅ 只使用 hook
import FileTypeIcon from "../../../components/FileTypeIcon";

const RecentTaskTable: React.FC = () => {
  const navigate = useNavigate();
  const { records, loading } = useHistoryRecords(); // ✅ 从 hook 中获取记录数据

  const recentTasks = records.slice(0, 5); // ✅ 取前 5 条
  const handleRowClick = (record: any) => {
    navigate(`/history/${record.id}`);
  };

  const getResultColor = (result: string) => {
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

  if (loading) return <p className="text-gray-400 px-4 py-2">加载中...</p>;

  return (
    <div className="overflow-x-auto rounded-xl bg-gray-800/90 p-1">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-700">文件名</th>
            <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-700">类型</th>
            <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-700">结果</th>
            <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-700">检测时间</th>
          </tr>
        </thead>
        <tbody>
          {recentTasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200 cursor-pointer"
              onClick={() => handleRowClick(task)}
            >
              <td className="px-4 py-3 text-gray-100 flex items-center gap-2">
                <FileTypeIcon type={task.type} />
                <span className="truncate max-w-[200px]" title={task.fileName}>
                  {task.fileName}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-300 capitalize">
                {task.type === "video" ? "视频" : "图片"}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(task.result)}`}>
                  {task.result}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-400">{task.time}</td>
            </tr>
          ))}
          {recentTasks.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                暂无检测记录
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTaskTable;
