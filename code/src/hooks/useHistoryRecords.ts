// src/hooks/useHistoryRecords.ts
import { useEffect, useState } from "react";

export interface HistoryRecord {
  id: string;
  fileName: string;
  type: "video" | "image";
  result: "篡改" | "未篡改" | "检测中";
  model: string;
  threshold: number;
  enhance: boolean;
  time: string;
  thumbnail?: string;
  coverName?: string;
  fileSize: string;
  duration?: string;
  imageSize?: string;
  confidence: number;
}

export function useHistoryRecords() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/history.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("网络响应失败");
        }
        return res.json();
      })
      .then((data: HistoryRecord[]) => {
        setRecords(data);
      })
      .catch((err) => {
        console.error("❌ 加载历史记录失败:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { records, loading };
}
