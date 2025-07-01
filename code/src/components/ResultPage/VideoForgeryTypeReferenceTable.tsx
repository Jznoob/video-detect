import React from 'react';

const forgeryTypeList = [
  { type: 'DeepFake', desc: 'AI合成视频，常见于换脸、表情篡改', suggestion: '逐帧对比嘴型与语音、关注表情变化' },
  { type: '视频换脸', desc: '将一人脸部替换为他人，融合边界模糊', suggestion: '放大边缘、对比原视频、查找融合痕迹' },
  { type: '语音伪造', desc: 'AI合成语音，配合视频伪造', suggestion: '分析音轨与口型同步性、辨别音色变化' },
  { type: '时序篡改', desc: '视频片段剪辑拼接，时序被打乱', suggestion: '检查画面/音轨突变、分析时序完整性' },
  { type: '视频合成', desc: '多段视频拼接、虚假场景生成', suggestion: '关注场景切换、光照/色调突变' },
  { type: '动作伪造', desc: '人物动作被AI操控或篡改', suggestion: '分析动作与语音/背景同步性' },
  { type: '字幕篡改', desc: '伪造或篡改视频字幕内容', suggestion: '核查字幕与语音内容一致性' },
];

const VideoForgeryTypeReferenceTable: React.FC = () => (
  <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
    <h2 className="text-2xl font-bold mb-6 text-gray-100">常见视频伪造类型参考</h2>
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-700/50 border-b border-gray-600/50">
            <th className="px-4 py-3 font-semibold text-left text-gray-100">伪造类型</th>
            <th className="px-4 py-3 font-semibold text-left text-gray-100">描述</th>
            <th className="px-4 py-3 font-semibold text-left text-gray-100">建议验证方式</th>
          </tr>
        </thead>
        <tbody>
          {forgeryTypeList.map((row, index) => (
            <tr 
              key={row.type} 
              className={`border-b border-gray-700/30 last:border-0 hover:bg-gray-700/50 transition-colors duration-200
                ${index % 2 === 0 ? 'bg-gray-700/20' : 'bg-gray-700/30'}`}
            >
              <td className="px-4 py-3 text-gray-100 whitespace-nowrap font-medium">{row.type}</td>
              <td className="px-4 py-3 text-gray-300">{row.desc}</td>
              <td className="px-4 py-3 text-blue-400/90">{row.suggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default VideoForgeryTypeReferenceTable; 