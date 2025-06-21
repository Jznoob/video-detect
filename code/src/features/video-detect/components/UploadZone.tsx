import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface UploadZoneProps {
  onFileChange: (file: File | null) => void;
  onDelete: () => void;
  file: File | null;
}

const allowedTypes = [
  "video/mp4",
  "video/x-matroska",
  "video/x-msvideo",
  "video/avi",
];

const UploadZone: React.FC<UploadZoneProps> = ({ onFileChange, onDelete, file }) => {
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
    const valid = allowedTypes.includes(f.type) || /\.(mp4|mkv|avi)$/i.test(f.name);
    if (!valid) {
      toast.error("只支持 MP4/MKV/AVI 格式");
      return;
    }
    if (f.size > 100 * 1024 * 1024) {
      toast.error("文件大小不可超过 100MB");
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
      className="relative border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp4,.mkv,.avi"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      {file && previewUrl ? (
        <div className="relative">
          <video
            className="w-full h-auto aspect-video rounded shadow-md"
            src={previewUrl}
            controls
            preload="metadata"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg"
            title="删除视频"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v8.25M3 16.5A2.25 2.25 0 005.25 18.75h13.5A2.25 2.25 0 0021 16.5M3 16.5l4.72-4.72a2.25 2.25 0 013.18 0l.85.85a2.25 2.25 0 003.18 0l4.72-4.72" /></svg>
          <p className="text-gray-500 dark:text-gray-400">拖拽或点击上传视频（MP4/AVI/MKV，≤100MB）</p>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
