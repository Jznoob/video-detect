import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface ImageUploadZoneProps {
  onFileChange: (file: File | null) => void;
  onDelete: () => void;
  file: File | null;
}

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ onFileChange, onDelete, file }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
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
    const valid = allowedTypes.includes(f.type) || /\.(jpg|jpeg|png|webp)$/i.test(f.name);
    if (!valid) {
      toast.error("只支持 JPG/PNG/WEBP 格式");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      toast.error("文件大小不可超过 20MB");
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

  return (
    <div
      onDragOver={e => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      onClick={openFile}
      className="relative border-dashed border-2 border-gray-600 dark:border-gray-500 rounded-lg p-6 text-center cursor-pointer bg-gray-800/40 hover:bg-gray-700/50 dark:hover:bg-gray-700/60 hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-200"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      {file && previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="预览图"
            className="w-full h-auto rounded shadow-md object-contain max-h-[400px]"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute -top-3 -right-3 w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
            title="删除图片"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <svg className="w-10 h-10 text-gray-300 dark:text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="text-gray-300 dark:text-gray-400">拖拽或点击上传图片（JPG/PNG/WEBP，≤20MB）</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone; 