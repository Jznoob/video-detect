import React from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

const ResultPage: React.FC = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  React.useEffect(() => {
    toast.success("检测成功");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#181A20] text-gray-900 dark:text-white flex flex-col items-center justify-center">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">检测结果</h1>
      <p>任务 ID: {id}</p>
    </div>
  );
};

export default ResultPage;
