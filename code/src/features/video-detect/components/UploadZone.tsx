import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface UploadZoneProps {
  onFileChange?: (file: File | null) => void;
}

const allowedTypes = [
  "video/mp4",
  "video/x-matroska",
  "video/x-msvideo",
  "video/avi",
];

const UploadZone: React.FC<UploadZoneProps> = ({ onFileChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreviewUrl(url);
    onFileChange?.(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const openFile = () => inputRef.current?.click();

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={openFile}
      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".mp4,.mkv,.avi"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {file && previewUrl ? (
        <video className="mx-auto max-h-60" src={previewUrl} controls />
      ) : (
        <p className="text-gray-500 dark:text-gray-400">拖拽或点击上传视频</p>
      )}
    </div>
  );
};

export default UploadZone;
