export interface HistoryRecord {
  id: string;
  fileName: string;
  type: "video" | "image";
  result: "篡改" | "未篡改" | "检测中";
  model: string;
  threshold: number;
  enhance: boolean;
  time: string;
  thumbnail?: string;
  coverName?: string;
  fileSize: string;
  duration?: string;
  imageSize?: string;
  confidence: number;
}

// Mock 历史记录数据
const mockHistoryData: HistoryRecord[] = [
  {
    id: "1",
    fileName: "sample_video_001.mp4",
    type: "video",
    result: "篡改",
    model: "ResNet",
    threshold: 0.87,
    enhance: false,
    time: "2024-01-15 14:30:25",
    coverName: "video_cover_001.jpg",
    fileSize: "15.2 MB",
    duration: "00:02:30",
    confidence: 0.87,
  },
  {
    id: "2",
    fileName: "photo_2024.jpg",
    type: "image",
    result: "未篡改",
    model: "EfficientNet",
    threshold: 0.92,
    enhance: true,
    time: "2024-01-15 13:45:12",
    thumbnail: "https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Photo",
    fileSize: "2.8 MB",
    imageSize: "1920x1080",
    confidence: 0.92,
  },
  {
    id: "3",
    fileName: "test_video.mp4",
    type: "video",
    result: "篡改",
    model: "Transformer",
    threshold: 0.78,
    enhance: false,
    time: "2024-01-15 12:20:08",
    coverName: "video_cover_003.jpg",
    fileSize: "8.5 MB",
    duration: "00:01:45",
    confidence: 0.78,
  },
  {
    id: "4",
    fileName: "document.png",
    type: "image",
    result: "未篡改",
    model: "VisionTransformer",
    threshold: 0.95,
    enhance: false,
    time: "2024-01-15 11:15:33",
    thumbnail: "https://via.placeholder.com/150x100/10B981/FFFFFF?text=Doc",
    fileSize: "1.2 MB",
    imageSize: "800x600",
    confidence: 0.95,
  },
  {
    id: "5",
    fileName: "demo_video.avi",
    type: "video",
    result: "检测中",
    model: "Ensemble",
    threshold: 0.7,
    enhance: false,
    time: "2024-01-15 10:30:45",
    coverName: "video_cover_005.jpg",
    fileSize: "25.1 MB",
    duration: "00:03:15",
    confidence: 0.0,
  },
  {
    id: "6",
    fileName: "screenshot.jpg",
    type: "image",
    result: "篡改",
    model: "ConvNeXt",
    threshold: 0.85,
    enhance: true,
    time: "2024-01-15 09:20:15",
    thumbnail: "https://via.placeholder.com/150x100/EF4444/FFFFFF?text=Screen",
    fileSize: "3.5 MB",
    imageSize: "1366x768",
    confidence: 0.85,
  },
  {
    id: "7",
    fileName: "presentation.mp4",
    type: "video",
    result: "未篡改",
    model: "SwinTransformer",
    threshold: 0.88,
    enhance: false,
    time: "2024-01-15 08:45:30",
    coverName: "video_cover_007.jpg",
    fileSize: "12.8 MB",
    duration: "00:04:20",
    confidence: 0.88,
  },
];

// 获取所有历史记录
export const getAllHistoryRecords = (): HistoryRecord[] => {
  return [...mockHistoryData];
};

// 获取最近的历史记录（用于首页显示）
export const getRecentHistoryRecords = (limit: number = 5): HistoryRecord[] => {
  return mockHistoryData.slice(0, limit);
};

// 根据ID获取特定记录
export const getHistoryRecordById = (id: string): HistoryRecord | undefined => {
  return mockHistoryData.find(record => record.id === id);
};

// 添加新的历史记录
export const addHistoryRecord = (record: Omit<HistoryRecord, 'id'>): HistoryRecord => {
  const newRecord: HistoryRecord = {
    ...record,
    id: Date.now().toString(),
  };
  mockHistoryData.unshift(newRecord);
  return newRecord;
};

// 获取结果颜色样式
export const getResultColor = (result: string): string => {
  switch (result) {
    case "篡改":
      return "text-red-600 bg-red-100 dark:bg-red-900/20";
    case "未篡改":
      return "text-green-600 bg-green-100 dark:bg-green-900/20";
    case "检测中":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
  }
}; 