import React from 'react';

const forgeryTypeList = [
  { type: 'DeepFake', desc: '视频换脸，可能嘴型光照不一致', suggestion: '逐帧对比嘴型、光照' },
  { type: 'FaceSwap', desc: '图片换脸，融合边界模糊', suggestion: '放大边缘、查找融合痕迹' },
  { type: 'ExpressionEdit', desc: '表情修改（愤怒变笑等）', suggestion: '逐帧查看表情变化' },
  { type: 'AttributeEdit', desc: '年龄/性别等属性变更', suggestion: '对比原始属性' },
  { type: 'GAN Synthesis', desc: 'AI 生成整脸，细节异常', suggestion: '关注耳饰、发丝、背景等细节' },
  { type: 'IdentitySwap', desc: '身份完全伪造', suggestion: '核查身份信息' },
  { type: 'FaceRetouch', desc: '面部美化修饰，真实性下降', suggestion: '查找美颜痕迹' },
  { type: 'FaceInpainting', desc: '遮挡区域填补伪造', suggestion: '对比原图、查找填补区域' },
  { type: 'PuppetMaster', desc: '对原视频面部动作进行操控', suggestion: '分析动作与语音同步性' },
  { type: 'StyleGAN Merge', desc: '多风格人脸拼接合成', suggestion: '关注风格边界' },
];

const ForgeryTypeReferenceTable: React.FC = () => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold mb-4 text-[#e5e7eb]">常见人脸伪造类型参考</h2>
    <div className="overflow-x-auto rounded-xl shadow border border-divider bg-[#232B55]">
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="bg-[#181A20] text-[#e5e7eb] border-b border-divider">
            <th className="px-4 py-3 font-semibold">伪造类型</th>
            <th className="px-4 py-3 font-semibold">描述</th>
            <th className="px-4 py-3 font-semibold">建议验证方式</th>
          </tr>
        </thead>
        <tbody>
          {forgeryTypeList.map((row) => (
            <tr key={row.type} className="border-b border-divider last:border-0 hover:bg-hover transition">
              <td className="px-4 py-2 text-[#e5e7eb] whitespace-nowrap">{row.type}</td>
              <td className="px-4 py-2 text-muted">{row.desc}</td>
              <td className="px-4 py-2 text-[#38bdf8]">{row.suggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ForgeryTypeReferenceTable; 