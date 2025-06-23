import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { modelUsageData } from '../mock';

const ModelFrequencyChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={modelUsageData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            contentStyle={{
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#f8fafc'
            }}
          />
          <Legend />
          <Bar dataKey="usage" name="使用次数" >
            {modelUsageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelFrequencyChart; 