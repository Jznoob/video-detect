import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Rnd } from "react-rnd";

export interface ImageDetectProps {
  onFileChange: (file: File | null) => void;
  onDelete: () => void;
  onModelChange: (model: string) => void;
  onThresholdChange: (threshold: number) => void;
  onEnhanceChange: (enhance: boolean) => void;
  file: File | null;
  model: string;
  threshold: number;
  enhance: boolean;
}

const IMAGE_MODELS = [
  "ResNet-Image",
  "EfficientNet",
  "VisionTransformer",
  "ConvNeXt",
  "SwinTransformer",
];

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

interface SelectionBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageDetect: React.FC<ImageDetectProps> = ({
  onFileChange,
  onDelete,
  onModelChange,
  onThresholdChange,
  onEnhanceChange,
  file,
  model,
  threshold,
  enhance,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
    ratio: number;
  } | null>(null);
  const [selectionBoxes, setSelectionBoxes] = useState<SelectionBox[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setImageSize(null);
        setSelectionBoxes([]);
      }
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    const valid =
      allowedTypes.includes(f.type) || /\.(jpg|jpeg|png)$/i.test(f.name);
    if (!valid) {
      toast.error("只支持 JPG/PNG 格式");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("文件大小不可超过 10MB");
      return;
    }
    onFileChange(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (file) return;
    handleFiles(e.dataTransfer.files);
  };

  const openFile = () => {
    if (file) return;
    inputRef.current?.click();
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (imageContainerRef.current) {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      const containerWidth = imageContainerRef.current.offsetWidth;
      
      if (containerWidth > 0 && naturalWidth > 0) {
        const ratio = naturalWidth / containerWidth;
        setImageSize({ width: naturalWidth, height: naturalHeight, ratio });
        
        setSelectionBoxes([
          {
            id: "default",
            x: 0,
            y: 0,
            width: containerWidth,
            height: Math.max(50, naturalHeight / ratio),
          },
        ]);
      } else {
        toast.error("图像容器宽度为 0，选择框初始化失败");
      }
    }
  };

  const addSelectionBox = () => {
    if (!imageContainerRef.current) return;
    const container = imageContainerRef.current;
    const newBox: SelectionBox = {
      id: Date.now().toString(),
      x: container.offsetWidth * 0.1,
      y: container.offsetHeight * 0.1,
      width: container.offsetWidth * 0.3,
      height: container.offsetHeight * 0.3,
    };
    setSelectionBoxes([...selectionBoxes, newBox]);
  };

  const removeSelectionBox = (id: string) => {
    setSelectionBoxes(selectionBoxes.filter((box) => box.id !== id));
  };

  const updateBoxState = (id: string, updates: Partial<SelectionBox>) => {
    setSelectionBoxes(
      selectionBoxes.map(box => box.id === id ? { ...box, ...updates } : box)
    );
  };

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={openFile}
        className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {file && previewUrl ? (
          <div className="relative flex gap-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addSelectionBox();
                }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                title="新增选择框"
              >
                ➕
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                title="删除图片"
              >
                🗑️
              </button>
            </div>
            <div ref={imageContainerRef} className="relative w-full">
              <img
                src={previewUrl}
                alt="预览"
                className="w-full h-auto rounded shadow"
                onLoad={handleImageLoad}
              />
              {selectionBoxes.map((box) => (
                <Rnd
                  key={box.id}
                  size={{ width: box.width, height: box.height }}
                  position={{ x: box.x, y: box.y }}
                  bounds="parent"
                  minWidth={30}
                  minHeight={30}
                  onDragStop={(e, d) => {
                    updateBoxState(box.id, { x: d.x, y: d.y });
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    updateBoxState(box.id, {
                      width: parseFloat(ref.style.width),
                      height: parseFloat(ref.style.height),
                      ...position,
                    });
                  }}
                  className="border-2 border-blue-500 bg-blue-500/30 box-border"
                >
                  {box.id !== "default" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectionBox(box.id);
                      }}
                      className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                  )}
                </Rnd>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">
              拖拽或点击上传图片（JPG/PNG，≤10MB）
            </p>
          </div>
        )}
      </div>
      {file && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-700 dark:text-gray-300">
          <span>文件名: {file.name}</span>
          <span>大小: {(file.size / 1024 / 1024).toFixed(2)} MB</span>
          {imageSize && (
            <span>
              尺寸: {imageSize.width} × {imageSize.height}
            </span>
          )}
          <span>检测区域: {selectionBoxes.length} 个</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">检测模型</label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            {IMAGE_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
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
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <input
            type="number"
            min={0.5}
            max={1}
            step={0.01}
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            className="w-full mt-1 rounded-md border p-2 bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="enhance"
          checked={enhance}
          onChange={(e) => onEnhanceChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="enhance" className="text-sm font-medium">
          启用图像增强
        </label>
      </div>
    </div>
  );
};

export default ImageDetect;
