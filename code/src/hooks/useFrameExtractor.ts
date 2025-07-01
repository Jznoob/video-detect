// src/hooks/useFrameExtractor.ts
import { useEffect, useState } from "react";

export interface ExtractedFrame {
  frameIndex: number;
  time: number;
  imageUrl: string;
  probability: number;
  maskUrl?: string;
}

interface Options {
  videoUrl: string;
  probTimeline: { t: number; p: number }[];
  threshold?: number;
}

export function useFrameExtractor({
  videoUrl,
  probTimeline,
  threshold = 0.8
}: Options): ExtractedFrame[] {
  const [frames, setFrames] = useState<ExtractedFrame[]>([]);

  useEffect(() => {
    const extract = async () => {
    const filtered = probTimeline.filter(p => p.p > threshold && p.t >= 12);

      const result: ExtractedFrame[] = filtered.map(({ t, p }) => {
        const frameIndex = Math.floor(t * 10); // ✅ 修正为10fps
        return {
          frameIndex,
          time: t,
          probability: p,
          imageUrl: `/frames/frame_${frameIndex}.jpg`,
          maskUrl: `/masks/frame_${frameIndex}.png`
        };
      });
      setFrames(result);
    };

    extract();
  }, [videoUrl, probTimeline, threshold]);

  return frames;
}
