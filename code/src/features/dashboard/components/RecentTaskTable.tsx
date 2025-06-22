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
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">文件名</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">类型</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">结果</th>
            <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">检测时间</th>
          </tr>
        </thead>
        <tbody>
          {recentTasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
              onClick={() => handleRowClick(task)}
            >
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileTypeIcon type={task.type} />
                <span className="truncate max-w-[200px]" title={task.fileName}>
                  {task.fileName}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-700 dark:text-gray-300 capitalize">
                {task.type === "video" ? "视频" : "图片"}
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(task.result)}`}>
                  {task.result}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{task.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTaskTable; 