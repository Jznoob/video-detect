import React, { useRef, useState } from 'react';

interface TimelineWithMarkersProps {
  duration: number;
  markers: number[];
  currentTime: number;
  onSeek: (time: number) => void;
}

const TimelineWithMarkers: React.FC<TimelineWithMarkersProps> = ({ duration, markers, currentTime, onSeek }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState<{ time: number, left: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const seekTime = (clickX / rect.width) * duration;
      onSeek(seekTime);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const hoverX = e.clientX - rect.left;
      const time = (hoverX / rect.width) * duration;
      setHoverTime({ time, left: hoverX });
    }
  }

  return (
    <div 
        className="relative py-2"
        onMouseLeave={() => setHoverTime(null)}
    >
        <div 
            ref={timelineRef}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
            onClick={handleClick}
            onMouseMove={handleMouseMove}
        >
            {/* Progress Bar */}
            <div 
                className="absolute top-0 bottom-0 h-2 bg-blue-500 rounded-full" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            {/* Markers */}
            {markers.map((markerTime, index) => (
                <div
                    key={index}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 border-2 border-white rounded-full"
                    style={{ left: `${(markerTime / duration) * 100}%` }}
                    title={`伪造帧: ${markerTime.toFixed(2)}s`}
                />
            ))}
        </div>
        {/* Hover Tooltip */}
        {hoverTime && (
            <div 
                className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded"
                style={{ left: hoverTime.left, transform: 'translateX(-50%)' }}
            >
                {hoverTime.time.toFixed(2)}s
            </div>
        )}
    </div>
  );
};

export default TimelineWithMarkers; 