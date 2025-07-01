export interface FakeSegment {
  start: number;
  end: number;
  probability: number;
}

export interface DetectionResult {
  fileName: string;
  model: string;
  threshold: number;
  forgedProbability: number;
  detectionTime: string;
  fakeSegments: FakeSegment[];
  probTimeline: { t: number; p: number }[];
  attribution: { method: string; prob: number }[];
} 