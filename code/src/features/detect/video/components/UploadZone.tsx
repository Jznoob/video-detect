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

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    const valid =
      allowedTypes.includes(f.type) || /\.(mp4|mkv|avi)$/i.test(f.name);
    if (!valid) {
      toast.error("只支持 MP4/MKV/AVI 格式");
      return;
    }
    setFile(f);
    onFileChange?.(f);
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

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
      {file ? (
        <div className="space-y-2">
          {previewUrl && (
            <video
              src={previewUrl}
              controls
              className="max-h-64 mx-auto w-full rounded"
            />
          )}
          <p className="text-gray-800 dark:text-gray-100">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">拖拽或点击上传视频</p>
      )}
    </div>
  );
};

export default UploadZone;
