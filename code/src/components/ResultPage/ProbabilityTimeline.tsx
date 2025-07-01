import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

interface Point {
  t: number;
  p: number;
}

interface ProbabilityTimelineProps {
  points: Point[];
  currentTime: number;
  onSelect: (t: number) => void;
}

const ProbabilityTimeline: React.FC<ProbabilityTimelineProps> = ({ points, currentTime, onSelect }) => {
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg shadow p-4">
      <h3 className="font-bold mb-2">伪造概率时间线</h3>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={points} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="t" tickFormatter={t => `${t}s`} />
          <YAxis domain={[0, 1]} tickFormatter={p => `${Math.round(p * 100)}%`} />
          <Tooltip formatter={v => `${Math.round(Number(v) * 100)}%`} labelFormatter={l => `${l}s`} />
          <Line
            type="monotone"
            dataKey="p"
            stroke="#f87171"
            dot={{ r: 4, onClick: (e: any) => onSelect(e.payload.t) }}
            activeDot={{ r: 7 }}
            isAnimationActive={false}
          />
          {points.map((pt, idx) =>
            Math.abs(pt.t - currentTime) < 0.5 ? (
              <ReferenceDot
                key={idx}
                x={pt.t}
                y={pt.p}
                r={8}
                fill="#f87171"
                stroke="#fff"
                strokeWidth={2}
                isFront
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProbabilityTimeline; 