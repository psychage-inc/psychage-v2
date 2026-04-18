import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BloomProps {
    valence: number; // 1-10
}

export const BloomVisualization: React.FC<BloomProps> = ({ valence }) => {
    const colors = useMemo(() => {
        if (valence <= 3) return { primary: '#94a3b8', secondary: '#64748b', glow: 'rgba(148,163,184,0.3)' };
        if (valence <= 7) return { primary: '#5eead4', secondary: '#20B8A6', glow: 'rgba(94,234,212,0.3)' };
        return { primary: '#fdba74', secondary: '#f97316', glow: 'rgba(253,186,116,0.3)' };
    }, [valence]);

    const scale = 0.8 + (valence / 10) * 0.4;
    const gradientId = `bloom-gradient-${Math.round(valence)}`;

    return (
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center my-12 pointer-events-none">
            {/* Outer ambient glow */}
            <motion.div
                animate={{
                    scale: [scale * 1.2, scale * 1.3, scale * 1.2],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ backgroundColor: colors.glow }}
            />

            {/* SVG organic shapes */}
            <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                <defs>
                    <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={colors.primary} stopOpacity="0.6" />
                        <stop offset="70%" stopColor={colors.secondary} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={colors.secondary} stopOpacity="0" />
                    </radialGradient>
                </defs>
                <motion.ellipse
                    cx="100" cy="100"
                    animate={{
                        rx: [70 * scale, 80 * scale, 70 * scale],
                        ry: [60 * scale, 65 * scale, 60 * scale],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    fill={`url(#${gradientId})`}
                />
            </motion.svg>

            {/* Second organic layer, counter-rotating */}
            <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                <motion.ellipse
                    cx="100" cy="100"
                    animate={{
                        rx: [55 * scale, 65 * scale, 55 * scale],
                        ry: [70 * scale, 75 * scale, 70 * scale],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    fill={colors.primary}
                    opacity={0.2}
                    className="blur-sm"
                />
            </motion.svg>

            {/* Blurred background layer */}
            <motion.div
                animate={{
                    scale: [scale, scale * 1.08, scale],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 rounded-full mix-blend-multiply filter blur-2xl opacity-40"
                style={{ backgroundColor: colors.primary }}
            />

            {/* Central core */}
            <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-28 h-28 rounded-full bg-white/50 backdrop-blur-xl shadow-inner border border-white/60 flex items-center justify-center"
            >
                <FaceIcon valence={valence} />
            </motion.div>
        </div>
    );
};

const FaceIcon = ({ valence }: { valence: number }) => {
    const smileAmount = (valence - 5.5) * 8;
    const baseY = 65 - (smileAmount * 0.2);
    const d = `M 30 ${baseY} Q 50 ${baseY + smileAmount} 70 ${baseY}`;

    const getColor = () => {
        if (valence <= 3) return 'text-slate-600 dark:text-neutral-400';
        if (valence <= 7) return 'text-teal-700';
        return 'text-orange-600';
    };

    return (
        <svg viewBox="0 0 100 100" className={`w-14 h-14 opacity-70 transition-colors duration-500 ${getColor()}`}>
            <circle cx="32" cy="40" r="5" fill="currentColor" />
            <circle cx="68" cy="40" r="5" fill="currentColor" />
            <path d={d} stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" className="transition-all duration-300" />
        </svg>
    );
};
