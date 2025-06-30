import React from 'react';

// 本地化文本
const texts = {
    legendTitle: "伪造概率",
};

const GradientAxisLegend: React.FC = () => {
    return (
        <div className="flex items-center h-full">
            <div className="flex flex-col items-center justify-center h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-full py-4 px-4 shadow-lg transition-colors duration-300">
                <div className="relative w-4 h-48 bg-gradient-to-t from-transparent via-blue-400 to-red-500 rounded-full">
                    {/* 刻度线 */}
                    {[0, 25, 50, 75, 100].map(val => (
                        <div key={val} className="absolute w-full left-0" style={{ bottom: `${val}%` }}>
                            <div className="w-4 h-px bg-gray-500 dark:bg-gray-300 absolute -left-3.5 top-1/2 transition-colors duration-300"></div>
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600 dark:text-gray-300 transition-colors duration-300">
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