import React from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface DetectButtonProps {
  file: File | null;
  model: string;
  threshold: number;
  interval: number;
}

const DetectButton: React.FC<DetectButtonProps> = ({
  file,
  model,
  threshold,
  interval,
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!file || !model || threshold === undefined || interval === undefined) {
      toast.error("请上传视频并填写检测参数");
      return;
    }

    const id = toast.loading("正在检测...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("检测完成", { id });
    navigate("/result?id=mock123");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
    >
      开始检测
    </button>
  );
};

export default DetectButton;
