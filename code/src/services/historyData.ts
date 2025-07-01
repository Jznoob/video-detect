// import { useEffect, useState } from "react";

// export interface HistoryRecord {
//   id: string;
//   fileName: string;
//   type: "video" | "image";
//   result: "篡改" | "未篡改" | "检测中";
//   model: string;
//   threshold: number;
//   enhance: boolean;
//   time: string;
//   thumbnail?: string;
//   coverName?: string;
//   fileSize: string;
//   duration?: string;
//   imageSize?: string;
//   confidence: number;
// }

// export function useHistoryRecords() {
//   const [records, setRecords] = useState<HistoryRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('/history_records_2151.json')
//       .then(res => res.json())
//       .then(data => {
//         setRecords(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ 加载历史记录失败:", err);
//         setLoading(false);
//       });
//   }, []);

//   return { records, loading };
// }

// export const getResultColor = (result: string): string => {
//   switch (result) {
//     case "篡改":
//       return "text-red-600 bg-red-100 dark:bg-red-900/20";
//     case "未篡改":
//       return "text-green-600 bg-green-100 dark:bg-green-900/20";
//     case "检测中":
//       return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
//     default:
//       return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
//   }
// };

