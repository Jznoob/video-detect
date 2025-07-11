import React from 'react';
import { Switch } from '@headlessui/react';
import { Eye, EyeOff, Film, Rows } from 'lucide-react';

// 本地化文本
const texts = {
  showHeatmap: "显示热力图",
  showMask: "显示遮罩",
  playForgedOnly: "仅播放伪造帧",
  heatmapOpacity: "热力图不透明度",
};

interface ResultControlPanelProps {
  // 通用控制
  showHeatmap?: boolean;
  setShowHeatmap?: (value: boolean) => void;
  showMask?: boolean;
  setShowMask?: (value: boolean) => void;
  heatmapOpacity?: number;
  setHeatmapOpacity?: (value: number) => void;
  
  // 视频专用控制
  playForgedOnly?: boolean;
  setPlayForgedOnly?: (value: boolean) => void;
}

const CustomSwitch = ({ checked, onChange, label, IconOn, IconOff }: any) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-300">{label}</span>
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? 'bg-blue-600/90' : 'bg-gray-600/50'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-800`}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </Switch>
  </div>
);

const ResultControlPanel: React.FC<ResultControlPanelProps> = ({
  showHeatmap,
  setShowHeatmap,
  showMask,
  setShowMask,
  heatmapOpacity,
  setHeatmapOpacity,
  playForgedOnly,
  setPlayForgedOnly
}) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
      <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700/50 pb-3 mb-5">控制面板</h3>
      
      <div className="space-y-6">
        {setShowHeatmap && (
          <CustomSwitch checked={showHeatmap} onChange={setShowHeatmap} label={texts.showHeatmap} />
        )}

        {setShowMask && (
          <CustomSwitch checked={showMask} onChange={setShowMask} label={texts.showMask} />
        )}

        {setPlayForgedOnly && (
          <CustomSwitch checked={playForgedOnly} onChange={setPlayForgedOnly} label={texts.playForgedOnly} />
        )}

        {setHeatmapOpacity !== undefined && heatmapOpacity !== undefined && (
          <div className="space-y-2">
            <label htmlFor="opacity-slider" className="text-sm font-medium text-gray-300">
              {texts.heatmapOpacity}: {Math.round(heatmapOpacity * 100)}%
            </label>
            <input
              id="opacity-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={heatmapOpacity}
              onChange={(e) => setHeatmapOpacity(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultControlPanel; 