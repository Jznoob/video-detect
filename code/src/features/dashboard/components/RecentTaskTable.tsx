import React from "react";
import { useNavigate } from "react-router-dom";
import { HistoryRecord, getRecentHistoryRecords, getResultColor } from "../../../services/historyData";
import FileTypeIcon from "../../../components/FileTypeIcon";

export type RecentTaskTableProps = {
  tasks?: HistoryRecord[];
};

const RecentTaskTable: React.FC<RecentTaskTableProps> = ({ tasks }) => {
  const navigate = useNavigate();
  const recentTasks = tasks || getRecentHistoryRecords(5);

  const handleRowClick = (record: HistoryRecord) => {
    navigate(`/history/${record.id}`);
  };

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