import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    { src: '/images/categories/wellness.svg', alt: 'Wellness', color: 'from-amber-500/20 to-orange-500/20' },
    { src: '/images/categories/mindfulness.svg', alt: 'Mindfulness', color: 'from-emerald-500/20 to-teal-500/20' },
    { src: '/images/categories/sleep.svg', alt: 'Sleep', color: 'from-indigo-500/20 to-blue-500/20' },
    { src: '/images/categories/anxiety.png', alt: 'Balance', color: 'from-cyan-500/20 to-sky-500/20' },
];

const GlassCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
            {/* Abstract Background Blobs */}
            <div className={`absolute inset-0 bg-gradient-to-br ${images[currentIndex].color} opacity-30 blur-3xl transition-colors duration-1000`} />

            <div className="relative w-72 h-96 md:w-80 md:h-[450px]">
                <AnimatePresence initial={false}>
                    {images.map((image, index) => {
                        // Calculate relative index for stacking logic
                        const diff = (index - currentIndex + images.length) % images.length;

                        // Only render active and next 2 cards
                        if (diff > 2) return null;

                        return (
                            <motion.div
                                key={image.src}
                                initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -10 }}
                                animate={{
                                    scale: diff === 0 ? 1 : 1 - diff * 0.05,
                                    opacity: diff === 0 ? 1 : 1 - diff * 0.3,
                                    y: diff * 20,
                                    z: -diff * 50,
                                    rotateX: diff === 0 ? 0 : -5,
                                    zIndex: images.length - diff
                                }}
                                exit={{ scale: 1.1, opacity: 0, y: -50, rotateX: 10 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className={`
                                    absolute inset-0 rounded-3xl overflow-hidden
                                    border border-white/40 shadow-2xl backdrop-blur-md
                                    bg-white/10 flex flex-col items-center justify-center p-8
                                `}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Inner Glass Sheen */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                                {/* Image Container */}
                                <div className="relative z-10 w-full aspect-square mb-6 flex items-center justify-center">
                                    <div className="relative w-40 h-40 bg-white/20 rounded-full flex items-center justify-center shadow-inner blur-sm">
                                        <div className="absolute w-32 h-32 bg-white/40 rounded-full" />
                                    </div>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="absolute w-48 h-48 object-contain drop-shadow-2xl"
                                    />
                                </div>

                                <motion.h3
                                    layoutId={`title-${image.src}`}
                                    className="text-2xl font-display font-bold text-text-primary text-center z-10"
                                >
                                    {image.alt}
                                </motion.h3>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GlassCarousel;
