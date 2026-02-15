import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from '../assets/final_animation.json';

const STORAGE_KEY = 'psychage_intro_shown';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === 'true';
    const [phase, setPhase] = useState<'skip' | 'playing' | 'exiting'>(
        alreadyShown ? 'skip' : 'playing'
    );
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const hasCompleted = useRef(false);

    useEffect(() => {
        if (phase === 'skip') {
            onComplete();
        }
    }, [phase, onComplete]);

    const handleAnimationComplete = () => {
        if (hasCompleted.current) return;
        hasCompleted.current = true;

        setPhase('exiting');
        sessionStorage.setItem(STORAGE_KEY, 'true');
    };

    if (phase === 'skip') return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onAnimationComplete={() => {
                if (phase === 'exiting') {
                    onComplete();
                }
            }}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                    scale: phase === 'exiting' ? 1.05 : 1,
                    opacity: phase === 'exiting' ? 0 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ width: '280px', height: '280px' }}
            >
                <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    loop={false}
                    autoplay={true}
                    onComplete={handleAnimationComplete}
                    style={{ width: '100%', height: '100%' }}
                />
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
