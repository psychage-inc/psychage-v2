import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LOADING_SHOWN_KEY = 'psychage_loading_shown';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [isLoading, setIsLoading] = useState(() => {
        // Check if loading has been shown this session
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem(LOADING_SHOWN_KEY);
        }
        return true;
    });

    useEffect(() => {
        // If loading was already shown, complete immediately
        if (!isLoading) {
            onComplete();
            return;
        }

        // Mark as shown for this session
        sessionStorage.setItem(LOADING_SHOWN_KEY, 'true');

        // Simulate loading time (reduced from 3000ms)
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete, isLoading]);

    if (!isLoading) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        {/* Teal Gradient Orb */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Central Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo / Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <img
                                src="/images/logo.png"
                                alt="Psychage"
                                className="w-32 md:w-48 h-auto object-contain"
                            />
                        </motion.div>

                        {/* Loading Line */}
                        <div className="w-64 h-1 bg-surface-active rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Status Text */}
                        <motion.p
                            className="mt-4 text-text-secondary text-sm font-medium tracking-widest uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Initializing
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// Final Export: We use the simpler Wipe effect for that "Curtain" feel.
export const LoadingScreenWipe = ({ onComplete }: { onComplete: () => void }) => {
    const [shouldShow] = useState(() => {
        if (typeof window !== 'undefined') {
            const hasShown = sessionStorage.getItem(LOADING_SHOWN_KEY);
            if (!hasShown) {
                sessionStorage.setItem(LOADING_SHOWN_KEY, 'true');
                return true;
            }
            return false;
        }
        return true;
    });

    useEffect(() => {
        if (!shouldShow) {
            onComplete();
            return;
        }

        // Trigger the exit animation after a delay (reduced from 3000ms)
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete, shouldShow]);

    if (!shouldShow) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-background z-0" />

            {/* Subtle Gradient Orb */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"
                animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center">
                    <motion.img
                        src="/images/logo.png"
                        alt="Psychage"
                        className="w-48 md:w-64 h-auto object-contain"
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                </div>

                {/* Tagline / Subtitle */}
                <motion.p
                    className="mt-4 text-text-secondary text-sm font-medium tracking-[0.2em] uppercase"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    Cognitive Optimization
                </motion.p>

                {/* Premium Progress Line */}
                <motion.div
                    className="mt-12 w-64 h-[2px] bg-surface-active/50 rounded-full overflow-hidden relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/60 to-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                    />
                    {/* Leading Glow Head */}
                    <motion.div
                        className="absolute top-0 h-full w-[20px] bg-white blur-[5px]"
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: "100%", opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default LoadingScreenWipe;
