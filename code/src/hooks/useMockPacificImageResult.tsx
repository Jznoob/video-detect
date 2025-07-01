import { useState, useEffect } from "react";
import { ReactNode } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
export interface Heatspot {
  id: string;
  path: string;
  color: string;
  opacity: number;
  spotProbability: number;
  position?: string;
}

export interface ForgeryType {
    type: string;
    desc: string;
    feature: string;
    suggestion: string;
    iconType: "Lightbulb" | "Sparkles"; // ✅ 可选的 React 组件图标
  }

export interface MockPacificImageResult {
  fileName: string;
  model: string;
  threshold: number;
  enhancementEnabled: boolean;
  forgedProbability: number;
  detectionTime: string;
  heatmapSpots: Heatspot[];
  forgeryTypes: ForgeryType[];
}

export function useMockPacificImageResult(): MockPacificImageResult {
  const [data, setData] = useState<MockPacificImageResult>({
    fileName: "monkey_riding_horse_pacific.jpg",
    model: "CPLNet",
    threshold: 0.72,
    enhancementEnabled: true,
    forgedProbability: 0.87,
    detectionTime: "2025-07-01 20:31:00",
    heatmapSpots: [],
    forgeryTypes: []
  });

  useEffect(() => {
    // 模拟加载数据
    const heatmapSpots: Heatspot[] = [
      {
        id: "spot-1",
        path: "M65,20 Q75,30 70,40 Q60,50 55,30 Z",
        color: "rgba(255,0,0,0.5)",
        opacity: 0.6,
        spotProbability: 0.9,
        position: "马背位置"
      },
      {
        id: "spot-2",
        path: "M30,50 Q40,60 35,70 Q25,65 20,55 Z",
        color: "rgba(255,165,0,0.4)",
        opacity: 0.5,
        spotProbability: 0.7,
        position: "猴子面部"
      },
      {
        id: "spot-3",
        path: "M75,80 Q85,90 80,95 Q70,85 72,82 Z",
        color: "rgba(255,0,0,0.4)",
        opacity: 0.5,
        spotProbability: 0.85,
        position: "水面波纹"
      }
    ];
    const forgeryTypes: ForgeryType[] = [
      {
        type: "GAN Synthesis",
        desc: "整图 AI 生成或大面积替换",
        feature: "背景融合异常，细节缺乏真实感",
        suggestion: "检查背景与前景之间的物理一致性",
        iconType: "Lightbulb",
      },
      {
        type: "Object Insertion",
        desc: "主体与背景不一致",
        feature: "光照方向错位，边缘融合生硬",
        suggestion: "放大观察插入物边缘是否自然",
        iconType: "Sparkles",
      }
    ];
    

    setData(prev => ({
      ...prev,
      heatmapSpots,
      forgeryTypes
    }));
  }, []);

  return data;
}
