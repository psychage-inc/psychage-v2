import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (can be replaced with real asset loading)
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 1000); // Wait for exit animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

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
                                transition={{ duration: 2.5, ease: "easeInOut" }}
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

                    {/* Curtain Reveal Layers - Exit Animation */}
                    <motion.div
                        className="absolute inset-0 bg-primary z-20"
                        initial={{ height: "0%" }}
                        exit={{ height: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        style={{ bottom: 0, top: 'auto', display: 'none' }} // Hidden initially, used for complex logic if needed, but simplified below
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// Final Export: We use the simpler Wipe effect for that "Curtain" feel.
// Final Export: We use the simpler Wipe effect for that "Curtain" feel.
export const LoadingScreenWipe = ({ onComplete }: { onComplete: () => void }) => {


    useEffect(() => {
        // Trigger the exit animation after a delay
        const timer = setTimeout(() => {

            onComplete();
        }, 3000); // 3 seconds loading time for the full cinematic feel

        return () => clearTimeout(timer);
    }, [onComplete]);

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
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/60 to-primary box-shadow-glow"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.0, ease: "easeInOut", delay: 1 }}
                    />
                    {/* Leading Glow Head */}
                    <motion.div
                        className="absolute top-0 h-full w-[20px] bg-white blur-[5px]"
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: "100%", opacity: 1 }}
                        transition={{ duration: 2.0, ease: "easeInOut", delay: 1 }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default LoadingScreenWipe;
