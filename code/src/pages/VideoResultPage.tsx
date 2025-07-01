import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useDetection from '../hooks/useDetection';
import VideoPlayerWithOverlay from '../components/ResultPage/VideoPlayerWithOverlay';
import ProbabilityTimeline from '../components/ResultPage/ProbabilityTimeline';
import DetectionSummaryCard from '../components/ResultPage/DetectionSummaryCard';
import FakeSegmentList from '../components/ResultPage/FakeSegmentList';
import VideoForgeryTracePanel from '../components/ResultPage/VideoForgeryTracePanel';
import VideoForgeryTypeReferenceTable from '../components/ResultPage/VideoForgeryTypeReferenceTable';
const VideoResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useDetection(id ?? "demo");
  console.log("检测 id:", id);
  console.log("useDetection data:", data, "error:", error);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (isLoading) return <div className="p-6">加载中...</div>;
  if (error || !data) return <div className="p-6 text-red-500">加载失败</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
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
  );
};

export default VideoResultPage;