import React from 'react';

interface VideoDetectionReportProps {
  fileName: string;
  model: string;
  threshold: number;
  forgedProbability: number;
  detectionTime: string;
  fakeSegments: Array<{ start: number; end: number; probability: number }>;
}

const VideoDetectionReport: React.FC<VideoDetectionReportProps> = ({
  fileName,
  model,
  threshold,
  forgedProbability,
  detectionTime,
  fakeSegments,
}) => {
  const getForgeryConclusion = (probability: number) => {
    if (probability >= 0.8) {
      return { text: "明显伪造", color: "text-red-500" };
    } else if (probability >= 0.5) {
      return { text: "疑似伪造", color: "text-yellow-500" };
    }
    return { text: "未发现明显伪造", color: "text-green-500" };
  };

  const { text: conclusionText, color: conclusionColor } = getForgeryConclusion(forgedProbability);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      {/* 基本检测信息 */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4">检测报告</h2>
        <div className="space-y-3 text-gray-300">
          <p><span className="font-semibold">文件名：</span>{fileName}</p>
          <p><span className="font-semibold">检测模型：</span>{model}</p>
          <p><span className="font-semibold">检测阈值：</span>{threshold.toFixed(2)}</p>
          <p><span className="font-semibold">检测时间：</span>{detectionTime}</p>
          <p><span className="font-semibold">伪造概率：</span>{(forgedProbability * 100).toFixed(2)}%</p>
          <p>
            <span className="font-semibold">检测结论：</span>
            <span className={`font-bold ${conclusionColor}`}>{conclusionText}</span>
          </p>
        </div>
      </div>

      {/* 伪造时间段 */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-3">伪造时间段</h3>
        <div className="space-y-2 text-gray-300">
          {fakeSegments.map((segment, index) => (
            <p key={index} className="flex items-center space-x-2">
              <span className="text-gray-500">•</span>
              <span>
                {formatTime(segment.start)} - {formatTime(segment.end)}
                <span className="ml-2 text-yellow-500">
                  伪造概率：{(segment.probability * 100).toFixed(2)}%
                </span>
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* 伪造溯源分析 */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-3">伪造溯源分析</h3>
        <div className="space-y-3 text-gray-300">
          <p className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            视频存在帧间不连续现象，显示可能为拼接合成。
          </p>
          <p className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            关键区域色彩异常，推测应用了深度学习修复算法。
          </p>
          <p className="flex items-start">
            <span className="mr-2 text-gray-500">•</span>
            运动轨迹不自然，疑似伪造轨迹篡改。
          </p>
        </div>
      </div>

      {/* 常见伪造类型参考 */}
      <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">常见伪造类型参考</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "帧插值生成",
              desc: "通过插值合成不存在的帧，使得画面运动更流畅但失真明显。"
            },
            {
              title: "时序拼接",
              desc: "将多个视频片段拼接合成为新视频，时长变更但背景或对象连续性丢失。"
            },
            {
              title: "语义合成",
              desc: "利用深度伪造模型更改人物动作、嘴型或语义，常用于篡改发言内容。"
            },
            {
              title: "全帧重建",
              desc: "使用神经渲染或 GAN 生成整段视频，外观一致但物理逻辑不合理。"
            },
            {
              title: "运动轨迹伪造",
              desc: "对视频中运动物体轨迹进行篡改，导致异常运动表现。"
            },
            {
              title: "声音篡改",
              desc: "同步生成或替换音轨，造成口型与声音不匹配。"
            },
            {
              title: "背景替换",
              desc: "通过抠图技术更换视频背景，常见于虚假新闻视频。"
            },
            {
              title: "细节增强",
              desc: "对视频局部进行增强处理，掩盖真实伪造痕迹。"
            }
          ].map((type, index) => (
            <div
              key={index}
              className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
            >
              <h4 className="font-semibold text-white mb-2">{type.title}</h4>
              <p className="text-sm text-gray-300">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetectionReport; 