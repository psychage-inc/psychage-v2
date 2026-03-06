import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    pressable?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.1)",
    pressable = false,
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handlePointerEnter = () => {
        setOpacity(1);
    };

    const handlePointerLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            whileTap={pressable ? { scale: 0.98 } : undefined}
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 ${className}`}
            {...props}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default InteractiveCard;
