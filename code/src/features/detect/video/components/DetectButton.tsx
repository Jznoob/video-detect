import React from "react";

export interface DetectButtonProps {
  onClick: () => void;
}

const DetectButton: React.FC<DetectButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
  >
    开始检测
  </button>
);

export default DetectButton;
