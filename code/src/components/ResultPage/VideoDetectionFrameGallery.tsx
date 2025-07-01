import React from "react";
export interface VideoDetectionFrame {
  frameIndex: number;
  probability: number;
  imageUrl: string;
  maskUrl?: string;
}
interface FrameItem {
  frameIndex: number;
  probability: number;
  imageUrl: string;
  maskUrl?: string;
}

interface Props {
  frames: FrameItem[];
  onClickFrame?: (time: number) => void;  
}

const VideoDetectionFrameGallery: React.FC<Props> = ({ frames, onClickFrame }) => {
  if (frames.length === 0) {
    return (
      <div className="text-gray-400 text-sm">暂无帧图数据</div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {frames.map((frame) => (
        <div
          key={frame.frameIndex}
          onClick={() => {
            if (onClickFrame) {
              const time = frame.frameIndex / 30; // 假设 30fps
              onClickFrame(time);
            }
          }}
          className={`relative rounded-lg overflow-hidden shadow-md border-2 ${
            frame.probability > 0.8
              ? "border-red-500"
              : "border-gray-700"
          }`}
        >
          <div className="relative w-full aspect-video">
            {/* 帧图 */}
            <img
              src={frame.imageUrl}
              alt={`Frame ${frame.frameIndex}`}
              className="w-full h-full object-cover"
            />
            {/* 掩码图（可选） */}
            {frame.maskUrl && (
              <img
                src={frame.maskUrl}
                alt="mask"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
              />
            )}
          </div>
          {/* 帧信息 */}
          <div className="p-2 bg-gray-800 text-xs text-gray-200 flex justify-between items-center">
            <span>帧号: {frame.frameIndex}</span>
            <span className="text-right">概率: {(frame.probability * 100).toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default VideoDetectionFrameGallery;
