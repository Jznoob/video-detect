import React from 'react';

// 本地化文本
const texts = {
    legendTitle: "伪造概率",
};

const GradientAxisLegend: React.FC = () => {
    return (
        <div className="flex items-center h-full">
            <div className="flex flex-col items-center justify-center h-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-full py-4 px-2 shadow-lg">
                <span className="text-xs font-semibold text-gray-800 dark:text-white transform -rotate-90 whitespace-nowrap mb-4">{texts.legendTitle}</span>
                <div className="relative w-1 h-48 bg-gradient-to-t from-blue-400 via-green-400 to-red-500 rounded-full">
                    {/* 刻度线 */}
                    {[0, 25, 50, 75, 100].map(val => (
                        <div key={val} className="absolute w-full left-0" style={{ bottom: `${val}%` }}>
                            <div className="w-4 h-px bg-gray-500 dark:bg-gray-300 absolute -left-3.5 top-1/2"></div>
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-600 dark:text-gray-300">
                                {val}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GradientAxisLegend; 