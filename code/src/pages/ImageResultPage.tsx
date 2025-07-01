import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, Download, Image as ImageIcon, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultControlPanel from '../components/ResultPage/ResultControlPanel';
import GradientAxisLegend from '../components/ResultPage/GradientAxisLegend';
import DetectionReport from '../components/ResultPage/DetectionReport';
import ForgeryTracePanel from '../components/ResultPage/ForgeryTracePanel';
import ForgeryTypeReferenceTable from '../components/ResultPage/ForgeryTypeReferenceTable';
import jsPDF from 'jspdf';
import '../fonts/NotoSansSC-Regular-normal.js';
import domtoimage from 'dom-to-image-more';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { useMockPacificImageResult } from '../hooks/useMockPacificImageResult';
// 本地化文本
const texts = {
  pageTitle: "图像检测结果",
  viewHeatmap: "热力图",
  download: "下载图片",
};
const ImageResultPage: React.FC = () => {
  const {
    fileName,
    model: detectionModel,
    threshold: detectionThreshold,
    enhancementEnabled,
    forgedProbability,
    detectionTime,
    heatmapSpots,
    forgeryTypes
  } = useMockPacificImageResult();

  const reportRef = React.useRef<HTMLDivElement>(null);
  const heatmapRef = React.useRef<HTMLDivElement>(null);

  const [showHeatmap, setShowHeatmap] = React.useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = React.useState(0.7);

  const uploadedImage = "/uploads/image.png";

  const getForgeryConclusion = (probability: number) => {
    if (probability > 0.8) return { text: '明显存在伪造', color: 'text-red-600' };
    if (probability > 0.5) return { text: '疑似存在伪造', color: 'text-yellow-600' };
    return { text: '未检测到明显伪造', color: 'text-green-600' };
  };

  const handleExportPDF = async () => {
    try {
      if (!reportRef.current) return;
      const fileBaseName = fileName.replace(/\.[^/.]+$/, "");
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const padding = 32;
      let y = padding;

      pdf.setFont('NotoSansSC', 'normal');
      pdf.setFontSize(22);
      pdf.text('LuxTrace 检测报告', pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });
      y += 36;

      pdf.setFontSize(12);
      pdf.setTextColor('#666');
      pdf.text('报告由 LuxTrace 系统生成', pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });
      y += 32;

      pdf.setTextColor('#222');
      pdf.setFontSize(14);
      pdf.text(`检测时间：${detectionTime}`, padding, y);
      y += 24;
      pdf.text(`文件名：${fileName}`, padding, y);
      y += 24;
      pdf.text(`检测模型：${detectionModel}`, padding, y);
      y += 24;
      pdf.text(`检测阈值：${detectionThreshold}`, padding, y);
      y += 24;
      pdf.text(`增强功能：${enhancementEnabled ? '已启用' : '未启用'}`, padding, y);
      y += 24;
      pdf.text(`总体伪造概率：${(forgedProbability * 100).toFixed(2)}%`, padding, y);
      y += 32;

      const imgData = await domtoimage.toPng(reportRef.current);
      const img = new Image();
      img.src = imgData;
      await new Promise(resolve => (img.onload = resolve));
      const imgWidth = pdf.internal.pageSize.getWidth() - padding * 2;
      const imgHeight = imgWidth * (img.height / img.width);
      pdf.addImage(imgData, 'PNG', padding, y, imgWidth, imgHeight);
      pdf.save(`检测报告_${fileBaseName}.pdf`);
    } catch (error) {
      console.error('Error while exporting PDF:', error);
      toast.error('导出失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">{texts.pageTitle}</h1>
          <p className="mt-2 text-gray-400">文件名：{fileName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <DetectionReport
              fileName={fileName}
              model={detectionModel}
              threshold={detectionThreshold}
              enhancementEnabled={enhancementEnabled}
              forgedProbability={forgedProbability}
              heatmapSpots={heatmapSpots}
              getForgeryConclusion={getForgeryConclusion}
            />

            <ResultControlPanel
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              heatmapOpacity={heatmapOpacity}
              setHeatmapOpacity={setHeatmapOpacity}
            />

            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">操作</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/80 text-gray-100 rounded-lg"
                >
                  {showHeatmap ? <EyeOff className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  {showHeatmap ? "隐藏热力图" : texts.viewHeatmap}
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/90 hover:bg-blue-700/90 text-white rounded-lg"
                >
                  <Download className="w-5 h-5" />
                  {texts.download}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2" ref={reportRef}>
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
              <div className="flex justify-end mb-2">
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow"
                >
                  <Download className="w-4 h-4" />
                  导出报告
                </button>
              </div>
              <div className="relative w-full aspect-video bg-gray-700/50 rounded-lg overflow-hidden">
                {uploadedImage && (
                  <>
                    <img
                      src={uploadedImage}
                      alt="检测图片"
                      className="w-full h-full object-contain"
                    />
                    {showHeatmap && (
                      <div
                        ref={heatmapRef}
                        className="absolute inset-0 pointer-events-none"
                        style={{ opacity: heatmapOpacity }}
                      >
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          {heatmapSpots.map((spot) => (
                            <path
                              key={spot.id}
                              d={spot.path}
                              fill={spot.color}
                              opacity={spot.opacity}
                            />
                          ))}
                        </svg>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mt-6">
              <ForgeryTracePanel
                forgedProbability={forgedProbability}
                forgeryTypes={forgeryTypes}
                heatmapSpots={heatmapSpots}
              />
            </div>

            <div className="mt-6">
              <ForgeryTypeReferenceTable forgeryTypes={forgeryTypes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResultPage;
// 随机不规则图形生成器
// const generateFluidBlobPath = (x: number, y: number, size: number) => {
//   const points: { x: number; y: number }[] = [];
//   const numPoints = 8;
//   for (let i = 0; i < numPoints; i++) {
//     const angle = (i / numPoints) * 2 * Math.PI;
//     const randomFactor = 0.7 + Math.random() * 0.6;
//     const px = x + Math.cos(angle) * size * randomFactor;
//     const py = y + Math.sin(angle) * size * randomFactor;
//     points.push({ x: px, y: py });
//   }
//   let pathData = `M${points[0].x},${points[0].y}`;
//   for (let i = 1; i < numPoints; i++) {
//     const midX = (points[i - 1].x + points[i].x) / 2;
//     const midY = (points[i - 1].y + points[i].y) / 2;
//     pathData += ` Q${points[i - 1].x},${points[i - 1].y} ${midX},${midY}`;
//   }
//   pathData += ` Q${points[numPoints - 1].x},${points[numPoints - 1].y} ${(points[numPoints - 1].x + points[0].x) / 2},${(points[numPoints - 1].y + points[0].y) / 2} Z`;
//   return pathData;
// };

// // 色彩池
// const colorPool = [
//   '#EF4444', '#F97316', '#F59E0B', '#22C55E', '#3B82F6', '#6366F1', '#8B5CF6',
// ];

// interface Heatspot {
//   id: string;
//   path: string;
//   color: string;
//   opacity: number;
//   position?: string;
//   spotProbability: number;
// }
// // 修改热力图部分，确保各区域不重叠或交叉，并使用渐变色
// const generateGradientColor = (probability: number) => {
//   const r = Math.floor(255 * probability);
//   const g = 0;
//   const b = Math.floor(255 * (1 - probability));
//   return `rgba(${r},${g},${b},0.5)`;
// };

// const ImageResultPage: React.FC = () => {
//   const location = useLocation();
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [showHeatmap, setShowHeatmap] = useState(true);
//   const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);
//   const [heatmapSpots, setHeatmapSpots] = useState<Heatspot[]>([]);
//   const [forgedProbability, setForgedProbability] = useState<string | null>(null);
//   const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
//   const reportRef = React.useRef<HTMLDivElement>(null);
//   const heatmapRef = React.useRef<HTMLDivElement>(null);

//   // 使用真实文件名
//   const imageFile = location.state?.imageFile as File | undefined;
//   const fileName = imageFile ? imageFile.name : '未知文件名';

//   // 从 location.state 中获取图像信息
//   const detectionModel = location.state?.model || '未知模型';
//   const detectionThreshold = location.state?.threshold || 0.7;
//   const enhancementEnabled = location.state?.enhancementEnabled || false;

//   // 根据图片 URL 生成随机热点
//   // useEffect(() => {
//   //   if (!uploadedImage) return;
//   //   const newSpots: Heatspot[] = [];
//   //   const numSpots = Math.floor(8 + Math.random() * 8); // 8-15个点
//   //   for (let i = 0; i < numSpots; i++) {
//   //     const probability = Math.random();
//   //     newSpots.push({
//   //       id: `spot-${i}`,
//   //       path: generateFluidBlobPath(
//   //         Math.random() * 100,
//   //         Math.random() * 100,
//   //         10 + Math.random() * 10
//   //       ),
//   //       color: generateGradientColor(probability),
//   //       opacity: 0.4 + Math.random() * 0.4,
//   //       spotProbability: probability,
//   //     });
//   //   }
//   //   setHeatmapSpots(newSpots);
//   // }, [uploadedImage]);

//   // 从路由状态中获取 File 对象，生成 Blob URL
//   // useEffect(() => {
//   //   const imageFile = location.state?.imageFile as File | undefined;
//   //   console.log("📦 Received imageFile:", imageFile);
  
//   //   if (imageFile) {
//   //     const imageUrl = URL.createObjectURL(imageFile);
//   //     console.log("🧩 Created imageUrl for <img>:", imageUrl);
//   //     setUploadedImage(imageUrl);
  
//   //     return () => {
//   //       console.log("🔓 Revoke imageUrl:", imageUrl);
//   //       URL.revokeObjectURL(imageUrl);
//   //     };
//   //   }
//   // }, [location.state?.imageFile]);
  
//   // 生成伪造概率
//   // useEffect(() => {
//   //   if (uploadedImage) {
//   //     const probability = (Math.random()).toFixed(2);
//   //     setForgedProbability(probability);
//   //   }
//   // }, [uploadedImage]);

//   // 更新区域分布逻辑，控制概率范围在页面顶部伪造概率的上下10%范围内
//   // useEffect(() => {
//   //   if (forgedProbability) {
//   //     const probability = parseFloat(forgedProbability);
//   //     const numSpots = probability > 0.8 ? Math.floor(6 + Math.random() * 3) :
//   //                      probability > 0.5 ? Math.floor(3 + Math.random() * 3) :
//   //                      Math.floor(1 + Math.random() * 2);
//   //     const newSpots: Heatspot[] = [];
//   //     const positions = ['左上角', '右上角', '右下角', '左下角', '中心'];
//   //     for (let i = 0; i < numSpots; i++) {
//   //       const spotProbability = Math.random() * (Math.min(1, probability + 0.1) - Math.max(0, probability - 0.1)) + Math.max(0, probability - 0.1);
//   //       newSpots.push({
//   //         id: `spot-${i}`,
//   //         path: generateFluidBlobPath(
//   //           Math.random() * 100,
//   //           Math.random() * 100,
//   //           10 + Math.random() * 10
//   //         ),
//   //         color: generateGradientColor(spotProbability),
//   //         opacity: 0.4 + Math.random() * 0.4,
//   //         position: positions[i % positions.length],
//   //         spotProbability: spotProbability,
//   //       });
//   //     }
//   //     setHeatmapSpots(newSpots);
//   //   }
//   // }, [forgedProbability]);

//   // 在 useEffect 中获取图像的实际尺寸
//   // useEffect(() => {
//   //   const img = new Image();
//   //   img.src = uploadedImage || '';
//   //   img.onload = () => {
//   //     const width = img.width;
//   //     const height = img.height;
//   //     setImageDimensions({ width, height });
//   //   };
//   // }, [uploadedImage]);

//   // 获取当前时间
//   const detectionTime = new Date().toLocaleString();

//   // 修复伪造概率判断逻辑
//   const getForgeryConclusion = (probability: number) => {
//     if (probability > 0.8) {
//       return { text: '明显存在伪造', color: 'text-red-600' };
//     } else if (probability > 0.5) {
//       return { text: '疑似存在伪造', color: 'text-yellow-600' };
//     } else {
//       return { text: '未检测到明显伪造', color: 'text-green-600' };
//     }
//   };

//   // 伪造类型预测（从 ForgeryTracePanel 模拟数据获取）
//   const forgeryTypes = [
//     { type: 'FaceSwap', desc: '图片换脸，融合边界模糊', feature: '面部轮廓边缘模糊，肤色/光照不一致' },
//     { type: 'ExpressionEdit', desc: '表情修改，如愤怒变笑', feature: '表情变化突兀，嘴型与语音不同步' },
//     { type: 'GAN Synthesis', desc: 'AI 生成整脸，细节异常', feature: '背景/饰品/发丝等细节异常' },
//   ];

//   // 导出 PDF
//   const handleExportPDF = async () => {
//     try {
//       if (!reportRef.current) return;
//       const fileBaseName = fileName.replace(/\.[^/.]+$/, "");
//       const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
//       const padding = 32;
//       let y = padding;
  
//       pdf.setFont('NotoSansSC', 'normal');
//       pdf.setFontSize(22);
//       pdf.text('LuxTrace 检测报告', pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });
//       y += 36;
  
//       pdf.setFontSize(12);
//       pdf.setTextColor('#666');
//       pdf.text('报告由 LuxTrace 系统生成', pdf.internal.pageSize.getWidth() / 2, y, { align: 'center' });
//       y += 32;
  
//       pdf.setTextColor('#222');
//       pdf.setFontSize(14);
//       pdf.text(`检测时间：${detectionTime}`, padding, y);
//       y += 24;
//       pdf.text(`文件名：${fileName}`, padding, y);
//       y += 24;
//       pdf.text(`检测模型：${detectionModel}`, padding, y);
//       y += 24;
//       pdf.text(`检测阈值：${detectionThreshold}`, padding, y);
//       y += 24;
//       pdf.text(`增强功能：${enhancementEnabled ? '已启用' : '未启用'}`, padding, y);
//       y += 24;
//       pdf.text(`总体伪造概率：${forgedProbability ? (parseFloat(forgedProbability) * 100).toFixed(2) : '0.00'}%`, padding, y);
//       y += 32;
  
//       // 图片截图（使用 dom-to-image-more）
//         const imgData = await domtoimage.toPng(reportRef.current);
//         const img = new Image();
//         img.src = imgData;
//         await new Promise(resolve => {
//           img.onload = resolve;
//         });
//         const imgWidth = pdf.internal.pageSize.getWidth() - padding * 2;
//         const imgHeight = imgWidth * (img.height / img.width);
//         pdf.addImage(imgData, 'PNG', padding, y, imgWidth, imgHeight);
//       // 下载
//       pdf.save(`检测报告_${fileBaseName}.pdf`);
//     } catch (error) {
//       console.error('Error while exporting PDF:', error);
//       toast.error('导出失败，请重试');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* 页面标题 */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-100">
//             {texts.pageTitle}
//           </h1>
//           <p className="mt-2 text-gray-400">
//             文件名：{fileName}
//           </p>
//         </div>

//         {/* 主要内容区域 */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* 左侧：检测报告和控制面板 */}
          
//           <div className="lg:col-span-1 space-y-6">
//             <DetectionReport
//               fileName={fileName}
//               model={detectionModel}
//               threshold={detectionThreshold}
//               enhancementEnabled={enhancementEnabled}
//               forgedProbability={forgedProbability ? parseFloat(forgedProbability) : 0}
//               heatmapSpots={heatmapSpots}
//               getForgeryConclusion={getForgeryConclusion}
//             />

//             <ResultControlPanel
//               showHeatmap={showHeatmap}
//               setShowHeatmap={setShowHeatmap}
//               heatmapOpacity={heatmapOpacity}
//               setHeatmapOpacity={setHeatmapOpacity}
//             />

//             <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
//               <h3 className="text-xl font-semibold text-gray-100 mb-4">操作</h3>
//               <div className="space-y-4">
//                 <button
//                   onClick={() => setShowHeatmap(!showHeatmap)}
//                   className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700/80 text-gray-100 rounded-lg transition-colors duration-200"
//                 >
//                   {showHeatmap ? <EyeOff className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
//                   {showHeatmap ? "隐藏热力图" : texts.viewHeatmap}
//                 </button>

//                 <button
//                   onClick={() => handleExportPDF()}
//                   className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/90 hover:bg-blue-700/90 text-white rounded-lg transition-colors duration-200"
//                 >
//                   <Download className="w-5 h-5" />
//                   {texts.download}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* 右侧：图片预览区域 */}
//           <div className="lg:col-span-2" ref={reportRef}>
//             <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/50">
//             <div className="flex justify-end mb-2">
//       <button
//         onClick={handleExportPDF}
//         className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow"
//       >
//         <Download className="w-4 h-4" />
//         导出报告
//       </button>
//             </div>
//               <div className="relative w-full aspect-video bg-gray-700/50 rounded-lg overflow-hidden">
//                 {uploadedImage && (
//                   <>
//                     <img
//                       src={uploadedImage}
//                       alt="检测图片"
//                       className="w-full h-full object-contain"
//                     />
//                     {showHeatmap && (
//                       <div
//                         ref={heatmapRef}
//                         className="absolute inset-0 pointer-events-none"
//                         style={{ opacity: heatmapOpacity }}
//                       >
//                         <svg
//                           width="100%"
//                           height="100%"
//                           viewBox="0 0 100 100"
//                           preserveAspectRatio="none"
//                         >
//                           {heatmapSpots.map((spot) => (
//                             <path
//                               key={spot.id}
//                               d={spot.path}
//                               fill={spot.color}
//                               opacity={spot.opacity}
//                             />
//                           ))}
//                         </svg>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* 伪造痕迹面板 */}
//             <div className="mt-6">
//               <ForgeryTracePanel
//                 forgedProbability={forgedProbability ? parseFloat(forgedProbability) : 0}
//                 forgeryTypes={forgeryTypes}
//                 heatmapSpots={heatmapSpots}
//               />
//             </div>

//             {/* 伪造类型参考表 */}
//             <div className="mt-6">
//               <ForgeryTypeReferenceTable forgeryTypes={forgeryTypes} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageResultPage;
