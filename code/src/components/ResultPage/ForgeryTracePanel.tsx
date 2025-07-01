import React from 'react';
import { ScanEye, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const forgeryTypes = [
  {
    type: 'FaceSwap',
    icon: <ScanEye className="w-6 h-6 text-blue-400" />,
    desc: '图片换脸，融合边界模糊，肤色/光照不自然',
    feature: '面部轮廓边缘模糊，肤色/光照不一致',
    suggestion: '放大边缘、对比原图、查找融合痕迹',
  },
  {
    type: 'ExpressionEdit',
    icon: <AlertTriangle className="w-6 h-6 text-yellow-400" />,
    desc: '表情修改，如愤怒变笑，嘴型与语音不同步',
    feature: '表情变化突兀，嘴型与语音不同步',
    suggestion: '逐帧查看表情变化，听声音同步性',
  },
  {
    type: 'GAN Synthesis',
    icon: <Lightbulb className="w-6 h-6 text-purple-400" />,
    desc: 'AI 生成整脸，细节异常',
    feature: '背景/饰品/发丝等细节异常',
    suggestion: '关注耳饰、发丝、背景等细节',
  },
];

const ForgeryTracePanel: React.FC = () => (
  <motion.div
    className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-100">伪造溯源分析</h2>
    <div className="grid md:grid-cols-3 gap-4">
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

export default ForgeryTracePanel; 