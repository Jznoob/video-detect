import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { detectionTypeData } from '../mock';

const DetectionTypeChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            contentStyle={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              color: '#333'
            }}
          />
          <Legend iconType="circle" />
          <Pie
            data={detectionTypeData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
          >
            {detectionTypeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DetectionTypeChart; 