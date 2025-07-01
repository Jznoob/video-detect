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
    forgedProbability: 0.94,
    detectionTime: new Date().toISOString(),
    fakeSegments: [
      { start: 5, end: 10, probability: 0.95 },
      { start: 30, end: 35, probability: 0.9 },
    ],
    probTimeline: [
      { t: 5, p: 0.3 },
      { t: 9, p: 0.95 },
      { t: 35, p: 0.85 },
    ],
    attribution: [
      { method: "Deepfakes", prob: 0.8 },
      { method: "FaceSwap", prob: 0.2 },
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