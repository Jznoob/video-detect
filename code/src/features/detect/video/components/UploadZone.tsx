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
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // revoke object url when file changed
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    const valid =
      allowedTypes.includes(f.type) || /\.(mp4|mkv|avi)$/i.test(f.name);
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
    setVideoUrl(url);
    setDuration(0);
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
      {file ? (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="mx-auto mb-2 max-h-64"
            onLoadedMetadata={() =>
              setDuration(videoRef.current?.duration ?? 0)
            }
          />
          <p className="text-gray-800 dark:text-gray-100">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB,
            {" "}
            {duration.toFixed(2)}s)
          </p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">拖拽或点击上传视频</p>
      )}
    </div>
  );
};

export default UploadZone;
