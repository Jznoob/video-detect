import React from 'react';
import { Video, UserCheck, Volume2, Scissors, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const forgeryTypes = [
  {
    type: 'DeepFake',
    icon: <Video className="w-6 h-6 text-blue-400" />,
    desc: 'AI合成视频，常见于换脸、表情篡改',
    feature: '嘴型与语音不同步、表情变化突兀',
    suggestion: '逐帧对比嘴型与语音、关注表情变化',
  },
  {
    type: '视频换脸',
    icon: <UserCheck className="w-6 h-6 text-green-400" />,
    desc: '将一人脸部替换为他人，融合边界模糊',
    feature: '肤色/光照不一致，边缘模糊',
    suggestion: '放大边缘、对比原视频、查找融合痕迹',
  },
  {
    type: '语音伪造',
    icon: <Volume2 className="w-6 h-6 text-yellow-400" />,
    desc: 'AI合成语音，配合视频伪造',
    feature: '语音与口型不同步，音色异常',
    suggestion: '分析音轨与口型同步性、辨别音色变化',
  },
  {
    type: '时序篡改',
    icon: <Scissors className="w-6 h-6 text-red-400" />,
    desc: '视频片段剪辑拼接，时序被打乱',
    feature: '动作/语音突变、背景跳变',
    suggestion: '检查画面/音轨突变、分析时序完整性',
  },
];

const VideoForgeryTracePanel: React.FC = () => (
  <motion.div
    className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-100">伪造溯源分析（视频）</h2>
    <div className="grid md:grid-cols-4 gap-4">
      {forgeryTypes.map((item) => (
        <div
          key={item.type}
          className="bg-gray-700/50 rounded-lg p-5 shadow-lg flex flex-col gap-2 border border-gray-600/50 hover:bg-gray-700/70 transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-1">
            {item.icon}
            <span className="text-lg font-semibold text-gray-100">{item.type}</span>
          </div>
          <div className="text-gray-300 text-sm mb-1">{item.desc}</div>
          <div className="text-xs text-yellow-400/90 mb-1">可疑特征：{item.feature}</div>
          <div className="flex items-center gap-1 text-xs text-blue-400/90">
            <Lightbulb className="w-4 h-4" />
            建议：{item.suggestion}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default VideoForgeryTracePanel; 