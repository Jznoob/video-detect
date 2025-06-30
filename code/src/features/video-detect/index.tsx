import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import clsx from "clsx";
import { Tab } from "@headlessui/react";
import UploadZone from "./components/UploadZone";
import ImageDetect from "./components/ImageDetect";
import HistoryPanel from "./components/HistoryPanel";

const VIDEO_MODELS = [
  "VideoDetector",
  "ResNet",
  "Transformer",
  "Ensemble",
  "YOLO-Fake",
  "DeepFake-1",
  "ViT-Detect",
];

const IMAGE_MODELS = [
  "CPLNet",
  "ResNet-Image",
  "EfficientNet",
  "VisionTransformer",
  "ConvNeXt",
  "SwinTransformer",
];

// localStorage 工具函数
const getLocal = (key: string, fallback: any) => {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    if (typeof fallback === "number") return parseFloat(v);
    if (typeof fallback === "boolean") return v === "true";
    return v;
  } catch {
    return fallback;
  }
};

const setLocal = (key: string, value: any) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
};

const DetectPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // 0: 视频检测, 1: 照片检测
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoMeta, setVideoMeta] = useState<{ name: string; duration: number } | null>(null);
  
  // 视频检测参数
  const [videoModel, setVideoModel] = useState<string>(() => getLocal("video_model", VIDEO_MODELS[0]));
  const [videoThreshold, setVideoThreshold] = useState<number>(() => getLocal("video_threshold", 0.7));
  
  // 图片检测参数
  const [imageModel, setImageModel] = useState<string>(() => getLocal("image_model", IMAGE_MODELS[0]));
  const [imageThreshold, setImageThreshold] = useState<number>(() => getLocal("image_threshold", 0.7));
  const [imageEnhance, setImageEnhance] = useState<boolean>(() => getLocal("image_enhance", false));
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 记忆参数到 localStorage
  useEffect(() => setLocal("video_model", videoModel), [videoModel]);
  useEffect(() => setLocal("video_threshold", videoThreshold), [videoThreshold]);
  useEffect(() => setLocal("image_model", imageModel), [imageModel]);
  useEffect(() => setLocal("image_threshold", imageThreshold), [imageThreshold]);
  useEffect(() => setLocal("image_enhance", imageEnhance), [imageEnhance]);

  // Tab 切换时清空对应状态
  useEffect(() => {
    if (activeTab === 0) { // 切换到视频
      setImageFile(null);
    } else { // 切换到图片
      setVideoFile(null);
    }
  }, [activeTab]);

  // 处理视频文件上传和元数据
  const handleVideoFileChange = (f: File | null) => {
    setVideoFile(f);
    setVideoMeta(null);
    if (f) {
      const url = URL.createObjectURL(f);
      const v = document.createElement("video");
      v.preload = "metadata";
      v.src = url;
      v.onloadedmetadata = () => {
        setVideoMeta({ name: f.name, duration: v.duration });
        URL.revokeObjectURL(url);
      };
    }
  };

  const handleVideoDelete = () => {
    setVideoFile(null);
    setVideoMeta(null);
  }

  // 处理图片文件上传
  const handleImageFileChange = (f: File | null) => {
    setImageFile(f);
  };
  
  const handleImageDelete = () => {
    setImageFile(null);
  }

  // 检测按钮处理
  const handleDetect = async () => {
    if (activeTab === 0) {
      // 视频检测
      if (!videoFile) return toast.error("请上传视频文件");
      if (!videoModel) return toast.error("请选择检测模型");
      if (!videoThreshold || videoThreshold < 0.5 || videoThreshold > 1) {
        return toast.error("请输入有效阈值 (0.5-1.0)");
      }
    } else {
      // 图片检测
      if (!imageFile) return toast.error("请上传图片文件");
      if (!imageModel) return toast.error("请选择检测模型");
      if (!imageThreshold || imageThreshold < 0.5 || imageThreshold > 1) {
        return toast.error("请输入有效阈值 (0.5-1.0)");
      }
    }

    toast.dismiss();
    toast.loading("检测中...");
    setLoading(true);
    
    setTimeout(() => {
      toast.dismiss();
      toast.success("检测完成，正在跳转...");
      
      const detectData = activeTab === 0 ? {
        type: "video",
        fileName: videoFile?.name,
        duration: videoMeta?.duration,
        model: videoModel,
        threshold: videoThreshold,
      } : {
        type: "image",
        fileName: imageFile?.name,
        model: imageModel,
        threshold: imageThreshold,
        enhance: imageEnhance,
        imageFile: imageFile,
      };
      
      const targetPath = activeTab === 0 ? "/video-result" : "/image-result";
      navigate(targetPath, { state: detectData });
    }, 2000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧主功能区 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab 切换 */}
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-6">
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
              <Tab.List className="flex gap-6 border-b border-gray-200 dark:border-gray-700 mb-6">
                <Tab
                  className={({ selected }) =>
                    clsx(
                      "px-2 pb-2 text-sm font-semibold border-b-2 transition focus:outline-none",
                      selected
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600"
                    )
                  }
                >
                  视频检测
                </Tab>
                <Tab
                  className={({ selected }) =>
                    clsx(
                      "px-2 pb-2 text-sm font-semibold border-b-2 transition focus:outline-none",
                      selected
                        ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600"
                    )
                  }
                >
                  照片检测
                </Tab>
              </Tab.List>
              
              <Tab.Panels>
                {/* 视频检测面板 */}
                <Tab.Panel>
                  <div className="space-y-6">
                    <UploadZone
                      file={videoFile}
                      onFileChange={handleVideoFileChange}
                      onDelete={handleVideoDelete}
                    />
                    {videoFile && videoMeta && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span>文件名：{videoMeta.name}</span>
                        <span className="hidden sm:inline mx-2">|</span>
                        <span>时长：{videoMeta.duration ? videoMeta.duration.toFixed(2) + " 秒" : "-"}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">检测模型</label>
                        <select
                          value={videoModel}
                          onChange={e => setVideoModel(e.target.value)}
                          className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
                        >
                          {VIDEO_MODELS.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">检测阈值</label>
                        <input
                          type="range"
                          min={0.5}
                          max={1}
                          step={0.01}
                          value={videoThreshold}
                          onChange={e => setVideoThreshold(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                        <input
                          type="number"
                          min={0.5}
                          max={1}
                          step={0.01}
                          value={videoThreshold}
                          onChange={e => setVideoThreshold(Number(e.target.value))}
                          className="w-full mt-1 rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                
                {/* 照片检测面板 */}
                <Tab.Panel>
                  <ImageDetect
                    file={imageFile}
                    onFileChange={handleImageFileChange}
                    onDelete={handleImageDelete}
                    model={imageModel}
                    threshold={imageThreshold}
                    enhance={imageEnhance}
                    onModelChange={setImageModel}
                    onThresholdChange={setImageThreshold}
                    onEnhanceChange={setImageEnhance}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          
          {/* 检测按钮 */}
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-6">
            <button
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={loading || (activeTab === 0 ? !videoFile : !imageFile)}
              onClick={handleDetect}
            >
              {loading ? "检测中..." : "开始检测"}
            </button>
          </div>
        </div>
        
        {/* 右侧历史记录区 */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-6 h-[600px]">
            <HistoryPanel />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetectPage;
