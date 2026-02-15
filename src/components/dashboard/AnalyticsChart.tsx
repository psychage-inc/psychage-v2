import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { motion } from 'framer-motion';

interface AnalyticsChartProps {
    data: any[];
    title: string;
    color?: string;
    dataKey?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl">
                <p className="font-bold text-gray-900 dark:text-gray-100 mb-1">{label}</p>
                <p className="text-sm font-medium" style={{ color: payload[0].color }}>
                    Score: {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
    data,
    title,
    color = "#0d9488", // teal-600
    dataKey = "score"
}) => {
    return (
        <div className="w-full h-full min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{title}</h3>
                {/* Legend or other controls could go here */}
            </div>

            <div className="flex-grow w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            domain={[0, 100]}
                            width={30}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsChart;
