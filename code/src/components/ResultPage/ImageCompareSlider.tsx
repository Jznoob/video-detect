import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageCompareSliderProps {
  original: string;
  forged: string;
}

const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({ original, forged }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const position = (x / rect.width) * 100;
      if (position > 0 && position < 100) {
        setSliderPosition(position);
      }
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
     if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const position = (x / rect.width) * 100;
      if (position > 0 && position < 100) {
        setSliderPosition(position);
      }
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <img src={forged} alt="Forged" className="absolute w-full h-full object-contain" />
      <motion.div
        className="absolute w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        animate={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={original} alt="Original" className="w-full h-full object-contain" />
      </motion.div>
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        animate={{ left: `${sliderPosition}%` }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDrag={(e, info) => {
          if (containerRef.current) {
            const newPos = (info.point.x / containerRef.current.getBoundingClientRect().width) * 100;
            setSliderPosition(newPos);
          }
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-white/80 shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageCompareSlider; 