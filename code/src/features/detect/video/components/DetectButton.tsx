import React from "react";

export interface DetectButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const DetectButton: React.FC<DetectButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-2 rounded-lg text-white transition ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
  >
    开始检测
  </button>
);

export default DetectButton;
