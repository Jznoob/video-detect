import React from "react";

export type RecentTask = {
  filename: string;
  type: string;
  status: string;
  time: string;
};

export type RecentTaskTableProps = {
  tasks: RecentTask[];
};

const statusColor = (status: string) =>
  status === "成功"
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";

const RecentTaskTable: React.FC<RecentTaskTableProps> = ({ tasks }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50 dark:bg-gray-700">
          <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">文件名</th>
          <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">类型</th>
          <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">状态</th>
          <th className="px-4 py-2 text-left font-medium text-gray-600 dark:text-gray-300">上传时间</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, idx) => (
          <tr
            key={idx}
            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{task.filename}</td>
            <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{task.type}</td>
            <td className={`px-4 py-2 font-semibold ${statusColor(task.status)}`}>{task.status}</td>
            <td className="px-4 py-2 text-gray-500 dark:text-gray-400">{task.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecentTaskTable; 