import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, Download, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResultControlPanel from '../components/ResultPage/ResultControlPanel';
import GradientAxisLegend from '../components/ResultPage/GradientAxisLegend';

// 本地化文本
const texts = {
  pageTitle: "图像检测结果",
  viewHeatmap: "热力图",
  download: "下载图片",
};

// 随机不规则图形生成器
const generateFluidBlobPath = (x: number, y: number, size: number) => {
  const points: { x: number; y: number }[] = [];
  const numPoints = 8;
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const randomFactor = 0.7 + Math.random() * 0.6;
    const px = x + Math.cos(angle) * size * randomFactor;
    const py = y + Math.sin(angle) * size * randomFactor;
    points.push({ x: px, y: py });
  }
  let pathData = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < numPoints; i++) {
    const midX = (points[i - 1].x + points[i].x) / 2;
    const midY = (points[i - 1].y + points[i].y) / 2;
    pathData += ` Q${points[i - 1].x},${points[i - 1].y} ${midX},${midY}`;
  }
  pathData += ` Q${points[numPoints - 1].x},${points[numPoints - 1].y} ${(points[numPoints - 1].x + points[0].x) / 2},${(points[numPoints - 1].y + points[0].y) / 2} Z`;
  return pathData;
};

// 色彩池
const colorPool = [
  '#EF4444', '#F97316', '#F59E0B', '#22C55E', '#3B82F6', '#6366F1', '#8B5CF6',
];

interface Heatspot {
  id: string;
  path: string;
  color: string;
  opacity: number;
}

// 修改热力图部分，确保各区域不重叠或交叉，并使用渐变色
const generateGradientColor = (probability: number) => {
  const r = Math.floor(255 * probability);
  const g = 0;
  const b = Math.floor(255 * (1 - probability));
  return `rgba(${r},${g},${b},0.5)`;
};

const ImageResultPage: React.FC = () => {
  const location = useLocation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);
  const [heatmapSpots, setHeatmapSpots] = useState<Heatspot[]>([]);
  const [forgedProbability, setForgedProbability] = useState<string | null>(null);

  // 使用真实文件名
  const imageFile = location.state?.imageFile as File | undefined;
  const fileName = imageFile ? imageFile.name : '未知文件名';

  // 根据图片 URL 生成随机热点
  useEffect(() => {
    if (!uploadedImage) return;
    const newSpots: Heatspot[] = [];
    const numSpots = Math.floor(8 + Math.random() * 8); // 8-15个点
    for (let i = 0; i < numSpots; i++) {
      const probability = Math.random();
      newSpots.push({
        id: `spot-${i}`,
        path: generateFluidBlobPath(
          Math.random() * 100,
          Math.random() * 100,
          10 + Math.random() * 10
        ),
        color: generateGradientColor(probability),
        opacity: 0.4 + Math.random() * 0.4,
      });
    }
    setHeatmapSpots(newSpots);
  }, [uploadedImage]);

  // 从路由状态中获取 File 对象，生成 Blob URL
  useEffect(() => {
    const imageFile = location.state?.imageFile as File | undefined;
    console.log("📦 Received imageFile:", imageFile);
  
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      console.log("🧩 Created imageUrl for <img>:", imageUrl);
      setUploadedImage(imageUrl);
  
      return () => {
        console.log("🔓 Revoke imageUrl:", imageUrl);
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [location.state?.imageFile]);
  
  // 在照片上传时生成伪造概率
  useEffect(() => {
    if (uploadedImage) {
      const probability = (Math.random() * 100).toFixed(1);
      setForgedProbability(probability);
    }
  }, [uploadedImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{texts.pageTitle}</h1>
      <div className="flex justify-between items-center mb-6 max-w-full">
        <span className="text-xl font-semibold text-gray-800 dark:text-white">文件名: {fileName}</span>
        <span className="text-xl font-semibold text-gray-800 dark:text-white">伪造概率: <span className="text-red-500">{forgedProbability}%</span></span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 图片和热力图 */}
        <div className="flex-grow bg-gray-900/50 rounded-xl shadow-lg p-4 flex items-center justify-center">
          <div className="relative w-full h-auto max-w-full">
            {uploadedImage && (
              <img src={uploadedImage} alt="Detection result" className="w-full h-auto object-contain" />
            )}
            <AnimatePresence>
              {showHeatmap && uploadedImage && (
                <motion.svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5 } }}
                  exit={{ opacity: 0 }}
                >
                  <g style={{ opacity: heatmapOpacity }}>
                    {heatmapSpots.map(spot => (
                      <path key={spot.id} d={spot.path} fill={spot.color} style={{ opacity: spot.opacity }} />
                    ))}
                  </g>
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 图例 */}
        <div className="flex-shrink-0 w-full md:w-24">
          <GradientAxisLegend />
        </div>
      </div>

      {/* 控制面板 */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center">
        <ResultControlPanel
          showHeatmap={showHeatmap}
          setShowHeatmap={setShowHeatmap}
          heatmapOpacity={heatmapOpacity}
          setHeatmapOpacity={setHeatmapOpacity}
        />
      </div>
    </div>
  );
};

export default ImageResultPage;
