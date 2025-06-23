import React, { useState, useRef, useEffect } from 'react';
import { ShieldOff, Download, Play, Pause, SkipForward } from 'lucide-react';
import ResultControlPanel from '../components/ResultPage/ResultControlPanel';
import TimelineWithMarkers from '../components/ResultPage/TimelineWithMarkers';

// 本地化文本
const texts = {
    pageTitle: "视频检测结果",
    totalFrames: "总帧数",
    forgedFrames: "伪造帧数",
    detectTime: "检测用时",
};

// 模拟数据
const mockData = {
  fileName: 'meeting_recording.mp4',
  detectTime: '3m 45s',
  totalFrames: 1500,
  forgedFrames: 120,
  isForged: true,
  videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  forgedIntervals: [{start: 5, end: 10}, {start: 15, end: 20}] // 伪造帧的时间段
};


const VideoResultPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showHeatmap, setShowHeatmap] = useState(true);
    const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);
    const [playForgedOnly, setPlayForgedOnly] = useState(false);
    
    // 视频事件监听
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleDurationChange = () => setDuration(video.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    // Canvas 绘制循环
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const isForgedNow = mockData.forgedIntervals.some(interval => currentTime >= interval.start && currentTime <= interval.end);

            if (showHeatmap && isForgedNow) {
                ctx.globalAlpha = heatmapOpacity;
                ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.fillRect(canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.6, canvas.height * 0.6); // 模拟热力区域
            }
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [currentTime, showHeatmap, heatmapOpacity]);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            video.paused ? video.play() : video.pause();
        }
    };
    
    const handleSeek = (time: number) => {
        const video = videoRef.current;
        if(video) video.currentTime = time;
    }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 顶部信息卡片 */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{texts.pageTitle}</h2>
        {/* ... info items ... */}
      </div>

      {/* 主要区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
            {/* 视频播放器 */}
            <div className="relative aspect-video bg-black rounded-lg">
                <video ref={videoRef} src={mockData.videoUrl} className="w-full h-full rounded-lg" />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                     <div className="flex items-center gap-4">
                        <button onClick={handlePlayPause} className="text-white hover:text-blue-400 transition">
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                        <TimelineWithMarkers duration={duration} currentTime={currentTime} markers={mockData.forgedIntervals.map(i => i.start)} onSeek={handleSeek} />
                     </div>
                 </div>
            </div>
            {/* 控制面板 */}
            <ResultControlPanel
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              heatmapOpacity={heatmapOpacity}
              setHeatmapOpacity={setHeatmapOpacity}
              playForgedOnly={playForgedOnly}
              setPlayForgedOnly={setPlayForgedOnly}
            />
        </div>

        <div className="lg:col-span-1">
            {/* 伪造帧列表等 */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow p-6 h-full">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">伪造片段</h3>
                {/* ... list of forged segments ... */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResultPage; 