import React from 'react';

const HeatmapLegend: React.FC = () => {
    return (
        <div className="flex flex-col items-center ml-4">
            <span className="text-xs text-gray-600 dark:text-gray-400">多</span>
            <div className="w-4 h-32 my-1 bg-gradient-to-t from-blue-200 to-blue-600 rounded-full border border-gray-200 dark:border-gray-700"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">少</span>
        </div>
    );
};

export default HeatmapLegend; 