import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { FakeSegment } from '../../types/detection';

interface VideoPlayerWithOverlayProps {
  videoUrl: string;
  fakeSegments: FakeSegment[];
  onTimeChange?: (t: number) => void;
}

const VideoPlayerWithOverlay = forwardRef<HTMLVideoElement, VideoPlayerWithOverlayProps>(
  ({ videoUrl, fakeSegments, onTimeChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      const handleLoadedMetadata = () => setDuration(video.duration || 0);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Check if currentTime is in a fake segment
      const inFake = fakeSegments.some(seg => currentTime >= seg.start && currentTime <= seg.end);
      if (inFake) {
        ctx.fillStyle = 'rgba(255,0,0,0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // TODO: 读取真实掩码并渲染
      }
    }, [currentTime, fakeSegments]);

    const handleTimeUpdate = () => {
      const t = videoRef.current?.currentTime || 0;
      setCurrentTime(t);
      onTimeChange?.(t);
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const t = Number(e.target.value);
      if (videoRef.current) {
        videoRef.current.currentTime = t;
      }
      setCurrentTime(t);
      onTimeChange?.(t);
    };

    return (
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          controls
          onTimeUpdate={handleTimeUpdate}
          style={{ display: 'block' }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={handleRangeChange}
          className="w-full absolute bottom-2 left-0 z-10"
        />
      </div>
    );
  }
);

export default VideoPlayerWithOverlay; 