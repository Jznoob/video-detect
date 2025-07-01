import React from "react";
import { useHistoryRecords } from "../../../hooks/useHistoryRecords";

const HistoryList: React.FC = () => {
  const { records, loading } = useHistoryRecords();

  if (loading) {
    return <p>加载中...</p>;
  }

  return (
    <ul>
      {records.map((record) => (
        <li key={record.id}>{record.fileName}</li>
      ))}
    </ul>
  );
};

export default HistoryList;
