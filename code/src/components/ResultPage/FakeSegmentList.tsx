import React from 'react';
import { FakeSegment } from '../../types/detection';

interface FakeSegmentListProps {
  segments: FakeSegment[];
  currentTime: number;
  onJump: (t: number) => void;
}

const formatTime = (s: number) => `${s.toFixed(2)}s`;

const FakeSegmentList: React.FC<FakeSegmentListProps> = ({ segments, currentTime, onJump }) => {
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg shadow p-4">
      <h3 className="font-bold mb-2">伪造片段列表</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>起始</th>
            <th>结束</th>
            <th>概率</th>
          </tr>
        </thead>
        <tbody>
          {segments.map((seg, idx) => {
            const isActive = currentTime >= seg.start && currentTime <= seg.end;
            return (
              <tr
                key={idx}
                className={
                  `cursor-pointer ${isActive ? 'bg-red-100 dark:bg-red-900/40 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }
                onClick={() => onJump(seg.start)}
              >
                <td>{formatTime(seg.start)}</td>
                <td>{formatTime(seg.end)}</td>
                <td>{(seg.probability * 100).toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FakeSegmentList; 