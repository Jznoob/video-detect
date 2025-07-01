import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useDetection from '../hooks/useDetection';
import VideoPlayerWithOverlay from '../components/ResultPage/VideoPlayerWithOverlay';
import ProbabilityTimeline from '../components/ResultPage/ProbabilityTimeline';
import DetectionSummaryCard from '../components/ResultPage/DetectionSummaryCard';
import FakeSegmentList from '../components/ResultPage/FakeSegmentList';
import VideoForgeryTracePanel from '../components/ResultPage/VideoForgeryTracePanel';
import VideoForgeryTypeReferenceTable from '../components/ResultPage/VideoForgeryTypeReferenceTable';
import VideoDetectionFrameGallery from '../components/ResultPage/VideoDetectionFrameGallery'; // ✅ 新增
import html2canvas from 'html2canvas'; // ✅ 导出功能用
import jsPDF from 'jspdf';
import { useFrameExtractor } from "../hooks/useFrameExtractor";

const VideoResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useDetection(id ?? "demo");
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reportRef = useRef<HTMLDivElement | null>(null); // ✅ 报告区域
  const frames = useFrameExtractor({
    videoUrl: "/uploads/video.mp4",
    probTimeline: data?.probTimeline ?? [],
    threshold: 0.8,
  });
  console.log("🧪 抽帧结果", frames);
  
  if (isLoading) return <div className="p-6">加载中...</div>;
  if (error || !data) return <div className="p-6 text-red-500">加载失败</div>;
  const handleExportReport = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save(`检测报告_${data.fileName}.pdf`);
  };

  return (
    <div className="p-6 space-y-8">
      {/* 报告主体区域 */}
      <div ref={reportRef} id="report-area">
        <h1 className="text-2xl font-bold mb-4">视频检测报告</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-7/12 space-y-6">
            <VideoPlayerWithOverlay
              videoUrl="/uploads/video.mp4"
              fakeSegments={data.fakeSegments}
              onTimeChange={setCurrentTime}
              ref={videoRef}
            />
            <ProbabilityTimeline
              points={data.probTimeline}
              currentTime={currentTime}
              onSelect={t => {
                if (videoRef.current) videoRef.current.currentTime = t;
              }}
            />
          </div>
          <div className="lg:w-5/12 space-y-6">
            <DetectionSummaryCard
              fileName={data.fileName}
              model={data.model}
              threshold={data.threshold}
              forgedProbability={data.forgedProbability}
              detectionTime={data.detectionTime}
              fakeSegments={data.fakeSegments}
              onExport={handleExportReport}
            />
            <FakeSegmentList
              segments={data.fakeSegments}
              currentTime={currentTime}
              onJump={t => {
                if (videoRef.current) videoRef.current.currentTime = t;
              }}
            />
            <VideoForgeryTracePanel attribution={data.attribution} />
            <VideoForgeryTypeReferenceTable />
          </div>
        </div>

        {/* ✅ 帧图集展示 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">异常帧图集</h2>
          <VideoDetectionFrameGallery
  frames={frames}
  onClickFrame={(t) => {
    if (videoRef.current) {
      videoRef.current.currentTime = t;
    }
  }}
/>
        </div>
      </div>

    </div>
  );
};

export default VideoResultPage;
