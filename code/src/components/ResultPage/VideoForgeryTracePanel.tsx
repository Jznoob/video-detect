import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Attribution {
  method: string;
  prob: number;
}

interface VideoForgeryTracePanelProps {
  attribution: Attribution[];
}

const COLORS = ['#60a5fa', '#fbbf24', '#f87171', '#34d399', '#a78bfa'];

const VideoForgeryTracePanel: React.FC<VideoForgeryTracePanelProps> = ({ attribution }) => {
  const top5 = [...attribution].sort((a, b) => b.prob - a.prob).slice(0, 5);
  return (
    <div className="bg-white/30 dark:bg-gray-800/30 rounded-lg shadow p-4">
      <h3 className="font-bold mb-2">伪造溯源分析</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={top5} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
          <XAxis type="number" domain={[0, 1]} tickFormatter={p => `${Math.round(p * 100)}%`} />
          <YAxis type="category" dataKey="method" tickFormatter={m => m === 'unknown' ? '未知⚠︎' : m} />
          <Tooltip formatter={v => `${Math.round(Number(v) * 100)}%`} labelFormatter={l => l === 'unknown' ? '未知⚠︎' : l} />
          <Bar dataKey="prob" isAnimationActive={false}>
            {top5.map((entry, idx) => (
              <Cell key={entry.method} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VideoForgeryTracePanel; 