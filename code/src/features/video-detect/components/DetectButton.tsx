import React from "react";
import { toast } from "sonner";

export interface DetectButtonProps {
  disabled?: boolean;
  onClick: () => Promise<void>;
}

const DetectButton: React.FC<DetectButtonProps> = ({ disabled, onClick }) => {
  const handleClick = async () => {
    try {
      await onClick();
    } catch (err) {
      console.error(err);
      toast.error("检测出错");
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
    >
      开始检测
    </button>
  );
};

export default DetectButton;
