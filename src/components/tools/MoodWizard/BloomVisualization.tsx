import React from 'react';
import { motion } from 'framer-motion';

interface BloomProps {
    valence: number; // 1-10
}

export const BloomVisualization: React.FC<BloomProps> = ({ valence }) => {
    // Map valence to colors
    const getColor = () => {
        if (valence <= 3) return ['#94a3b8', '#64748b']; // Slate/Unpleasant
        if (valence <= 7) return ['#5eead4', '#2dd4bf']; // Teal/Neutral
        return ['#fdba74', '#f97316']; // Orange/Pleasant
    };

    const colors = getColor();
    const scale = 0.8 + (valence / 10) * 0.4; // 0.8 to 1.2

    return (
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center my-12 pointer-events-none">
            <motion.div
                animate={{
                    scale: [scale, scale * 1.05, scale],
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                style={{ backgroundColor: colors[0] }}
            />
            <motion.div
                animate={{
                    scale: [scale * 1.1, scale, scale * 1.1],
                    rotate: [360, 270, 180, 90, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 rounded-full mix-blend-multiply filter blur-2xl opacity-60"
                style={{ backgroundColor: colors[1] }}
            />
            {/* Central core */}
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full bg-white/40 backdrop-blur-md shadow-inner border border-white/50 flex items-center justify-center"
            >
                <FaceIcon valence={valence} />
            </motion.div>
        </div>
    );
};

const FaceIcon = ({ valence }: { valence: number }) => {
    // Map valence 1-10 to a smile curve
    // For valence 5 (neutral), smileAmount is 0 (flat line)
    // For valence 10 (happy), smileAmount is positive (curve down)
    // For valence 1 (sad), smileAmount is negative (curve up)
    const smileAmount = (valence - 5.5) * 8;

    // We adjust the base Y so the mouth stays roughly centered
    const baseY = 65 - (smileAmount * 0.2);
    const d = `M 30 ${baseY} Q 50 ${baseY + smileAmount} 70 ${baseY}`;

    // Get color based on valence
    const getColor = () => {
        if (valence <= 3) return 'text-slate-600';
        if (valence <= 7) return 'text-teal-700';
        return 'text-orange-600';
    };

    return (
        <svg viewBox="0 0 100 100" className={`w-16 h-16 opacity-70 transition-colors duration-500 ${getColor()}`}>
            <circle cx="32" cy="40" r="5" fill="currentColor" />
            <circle cx="68" cy="40" r="5" fill="currentColor" />
            <path d={d} stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" className="transition-all duration-300" />
        </svg>
    );
};
