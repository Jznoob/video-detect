import { useQuery } from '@tanstack/react-query';
import type { DetectionResult } from '../types/detection';

const mockMap: Record<string, DetectionResult> = {
  demo: {
    fileName: "demo.mp4",
    model: "ResNet",
    threshold: 0.75,
    forgedProbability: 0.82,
    detectionTime: new Date().toISOString(),
    fakeSegments: [
      { start: 15, end: 20, probability: 0.85 },
      { start: 45, end: 50, probability: 0.92 },
    ],
    probTimeline: [
      { t: 15, p: 0.2 },
      { t: 18, p: 0.8 },
      { t: 50, p: 0.9 },
    ],
    attribution: [
      { method: "StyleGAN2", prob: 0.6 },
      { method: "unknown", prob: 0.4 },
    ],
  },
  video: {
    fileName: "video.mp4",
    model: "VideoDetector",
    threshold: 0.6,
    forgedProbability: 0.9,
    detectionTime: new Date().toISOString(),
    fakeSegments: [
      { start: 2, end: 5, probability: 0.13 },
      { start: 6, end: 10, probability: 0.11 },
      { start: 11, end: 14, probability: 0.15 },
      { start: 15, end: 30, probability: 0.92 },
    ],
    probTimeline: Array.from({ length: 290 }, (_, i) => {
      const t = i / 10;
      const p = (t > 14 ? 0.8 + Math.random() * 0.2 : Math.random() * 0.2);
      return { t, p };
    }),
    attribution: [
      { method: "Deepfakes", prob: 0.93 },
      { method: "Voicemask", prob: 0.73 },
    ],
  },
};

export default function useDetection(id: string) {
  return useQuery<DetectionResult>({
    queryKey: ['detect', id],
    queryFn: async () => {
      if (mockMap[id]) return mockMap[id];
      throw new Error(`未找到 mock 数据：${id}`);
    }
  });
}