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
const generateFluidBlobPath = (x: number, y: number, size: number, existingCenters: { x: number; y: number }[]) => {
  const points: { x: number; y: number }[] = [];
  const numPoints = 8;
  let pathData = '';
  let isOverlapping = true;

  while (isOverlapping) {
    points.length = 0; // 清空点
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const randomFactor = 0.7 + Math.random() * 0.6;
      const px = x + Math.cos(angle) * size * randomFactor;
      const py = y + Math.sin(angle) * size * randomFactor;
      points.push({ x: px, y: py });
    }
    pathData = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < numPoints; i++) {
      const midX = (points[i-1].x + points[i].x) / 2;
      const midY = (points[i-1].y + points[i].y) / 2;
      pathData += ` Q${points[i-1].x},${points[i-1].y} ${midX},${midY}`;
    }
    pathData += ` Q${points[numPoints-1].x},${points[numPoints-1].y} ${(points[numPoints-1].x + points[0].x)/2},${(points[numPoints-1].y + points[0].y)/2} Z`;

    // 检查是否与现有中心点重叠
    const centerX = x;
    const centerY = y;
    isOverlapping = existingCenters.some(center => {
      const distance = Math.sqrt((centerX - center.x) ** 2 + (centerY - center.y) ** 2);
      return distance < size * 2; // 确保中心点之间的距离足够大
    });
  }

  return pathData;
};

// 色彩池
const colorPool = [
  '#EF4444', '#F97316', '#F59E0B', '#22C55E', '#3B82F6', '#6366F1', '#8B5CF6'
];

interface Heatspot {
  id: string;
  path: string;
  color: string;
  opacity: number;
}

const ImageResultPage: React.FC = () => {
  const location = useLocation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);
  const [heatmapSpots, setHeatmapSpots] = useState<Heatspot[]>([]);

  useEffect(() => {
    if (!uploadedImage) return;
    const newSpots: Heatspot[] = [];
    const existingCenters: { x: number; y: number }[] = [];
    const numSpots = Math.floor(8 + Math.random() * 8); // 8-15个点
    for (let i = 0; i < numSpots; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = 10 + Math.random() * 10;
      const path = generateFluidBlobPath(x, y, size, existingCenters);
      existingCenters.push({ x, y });
      newSpots.push({
        id: `spot-${i}`,
        path: path,
        color: `url(#gradient-${i})`,
        opacity: 0.4 + Math.random() * 0.4 // 0.4-0.8 opacity
      });
    }
    setHeatmapSpots(newSpots);
  }, [uploadedImage]); // 当图片改变时重新生成热点

  // *** 关键修改：从路由状态接收 File 对象并生成 Blob URL ***
  useEffect(() => {
    const imageFile: File | undefined = location.state?.imageFile;
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setUploadedImage(imageUrl);

      // 清理函数，当组件卸载时释放内存
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  }, [location.state?.imageFile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{texts.pageTitle}</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content: Image + Heatmap */}
        <div className="flex-grow bg-gray-900/50 rounded-xl shadow-lg p-4 flex items-center justify-center">
          <div className="relative w-full aspect-video">
            {uploadedImage && <img src={uploadedImage} alt="Detection result" className="w-full h-full object-contain" />}
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
                  {heatmapSpots.map((spot, index) => (
                    <>
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.4)', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: 'rgba(239, 68, 68, 0.8)', stopOpacity: 1 }} />
                        </linearGradient>
                      </defs>
                      <path key={spot.id} d={spot.path} fill={spot.color} style={{ opacity: spot.opacity }} />
                    </>
                  ))}
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Side Panel: Legend */}
        <div className="flex-shrink-0 w-full md:w-24">
          <GradientAxisLegend />
        </div>
      </div>

      {/* Bottom Control Panel */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-4 flex items-center justify-between gap-6">
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
