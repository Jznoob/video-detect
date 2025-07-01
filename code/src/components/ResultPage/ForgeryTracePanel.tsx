import React from 'react';
import { Lightbulb, Sparkles, ScanEye } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Heatspot {
  id: string;
  path: string;
  color: string;
  opacity: number;
  position?: string;
  spotProbability: number;
}

export interface ForgeryType {
  type: string;
  desc: string;
  feature: string;
  suggestion: string;
  iconType: "Lightbulb" | "Sparkles" | "ScanEye";
}

interface Props {
  forgedProbability: number;
  forgeryTypes: ForgeryType[];
  heatmapSpots: Heatspot[];
}

// 图标映射表
const iconMap: Record<ForgeryType["iconType"], JSX.Element> = {
  Lightbulb: <Lightbulb className="w-6 h-6 text-purple-400" />,
  Sparkles: <Sparkles className="w-6 h-6 text-blue-400" />,
  ScanEye: <ScanEye className="w-6 h-6 text-blue-400" />,
};

const ForgeryTracePanel: React.FC<Props> = ({
  forgedProbability,
  forgeryTypes,
  heatmapSpots
}) => (
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
            {iconMap[item.iconType]}
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
