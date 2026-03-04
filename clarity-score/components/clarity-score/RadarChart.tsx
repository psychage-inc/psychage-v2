'use client';

import { motion } from 'framer-motion';

interface RadarChartProps {
    scores: {
        emotional: number;
        vitality: number;
        social: number;
        cognitive: number;
        functioning: number;
    };
}

export default function RadarChart({ scores }: RadarChartProps) {
    const maxScore = 20;
    const cx = 150;
    const cy = 150;
    const r = 100;
    const points = 5;

    const data = [
        { label: 'Emotional', value: scores.emotional, color: '#0D9488' }, // Teal
        { label: 'Vitality', value: scores.vitality, color: '#6366F1' },   // Indigo
        { label: 'Social', value: scores.social, color: '#EC4899' },      // Pink
        { label: 'Cognitive', value: scores.cognitive, color: '#F59E0B' }, // Amber
        { label: 'Function', value: scores.functioning, color: '#10B981' } // Emerald
    ];

    const getCoordinatesForAngle = (angle: number, radius: number) => {
        const angleInRadians = (angle - 90) * (Math.PI / 180);
        return {
            x: cx + radius * Math.cos(angleInRadians),
            y: cy + radius * Math.sin(angleInRadians)
        };
    };

    const calculatePentagonPoints = (radiusScale: number) => {
        return Array.from({ length: points }).map((_, i) => {
            const angle = (360 / points) * i;
            const { x, y } = getCoordinatesForAngle(angle, r * radiusScale);
            return `${x},${y}`;
        }).join(' ');
    };

    const dataPointsCoordinates = data.map((d, i) => {
        const angle = (360 / points) * i;
        const valueRatio = Math.max(0, Math.min(1, d.value / maxScore));
        const safeRatio = valueRatio < 0.1 ? 0.1 : valueRatio;
        return getCoordinatesForAngle(angle, r * safeRatio);
    });

    const pathData = dataPointsCoordinates.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
            <svg viewBox="0 0 300 300" className="h-full w-full drop-shadow-[0_0_15px_rgba(13,148,136,0.2)]" role="img" aria-label={`Radar chart showing scores: Emotional ${scores.emotional}, Vitality ${scores.vitality}, Social ${scores.social}, Cognitive ${scores.cognitive}, Functioning ${scores.functioning}`}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
                    <polygon
                        key={scale}
                        points={calculatePentagonPoints(scale)}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}

                {Array.from({ length: points }).map((_, i) => {
                    const angle = (360 / points) * i;
                    const { x, y } = getCoordinatesForAngle(angle, r);
                    return (
                        <line
                            key={`axis-${i}`}
                            x1={cx}
                            y1={cy}
                            x2={x}
                            y2={y}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    );
                })}

                <motion.polygon
                    initial={{ opacity: 0, scale: 0.5, transformOrigin: 'calc(150px) calc(150px)' }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: 'spring' }}
                    points={pathData}
                    fill="rgba(13,148,136,0.2)"
                    stroke="#0D9488"
                    strokeWidth="2"
                />

                {dataPointsCoordinates.map((p, i) => (
                    <motion.circle
                        key={`point-${i}`}
                        initial={{ r: 0 }}
                        animate={{ r: 4 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        cx={p.x}
                        cy={p.y}
                        fill={data[i].color}
                        stroke="#0F172A"
                        strokeWidth="2"
                    />
                ))}

                {Array.from({ length: points }).map((_, i) => {
                    const angle = (360 / points) * i;
                    const isTop = angle === 0;
                    const { x, y } = getCoordinatesForAngle(angle, r + 25);
                    return (
                        <text
                            key={`label-${i}`}
                            x={x}
                            y={y + (isTop ? -5 : 5)}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            className="font-bold uppercase tracking-wider text-[10px]"
                            fill="rgba(255,255,255,0.6)"
                        >
                            {data[i].label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}
