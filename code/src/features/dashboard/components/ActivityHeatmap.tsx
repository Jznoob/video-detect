import React, { useState, useEffect } from 'react';
import HeatMap from 'react-heatmap-grid';
import { getActivityHeatmapData } from '../mock';
import HeatmapLegend from './HeatmapLegend';

const ActivityHeatmap: React.FC = () => {
    const { xLabels, yLabels, data } = getActivityHeatmapData();
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    const cellStyle = (background: string, value: number, min: number, max: number, data: any, x: number, y: number) => ({
        background: `rgba(59, 130, 246, ${1 - (max - value) / (max - min)})`,
        fontSize: "11px",
        color: "#fff",
        border: isDarkMode ? "1px solid #1f2937" : "1px solid #fff",
        borderRadius: "4px"
    });

    const cellRender = (value: number) => value > 0 && <div>{value}</div>;
    
    const labelStyle = { 
        color: isDarkMode ? '#9ca3af' : '#6b7281', 
        fontSize: '12px' 
    };

    return (
        <div className="flex items-center">
            <div className="w-full overflow-x-auto">
                <HeatMap
                    xLabels={xLabels}
                    yLabels={yLabels}
                    data={data}
                    xLabelWidth={50}
                    yLabelWidth={50}
                    xLabelsLocation={"top"}
                    cellStyle={cellStyle}
                    cellRender={cellRender}
                    yLabelTextAlign="left"
                    xLabelsTextStyle={labelStyle}
                    yLabelsTextStyle={labelStyle}
                />
            </div>
            <HeatmapLegend />
        </div>
    );
};

export default ActivityHeatmap; 