import { useEffect, useState, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

const STORAGE_KEY = 'psychage_intro_shown';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === 'true';
    const [phase, setPhase] = useState<'skip' | 'playing' | 'exiting'>(
        alreadyShown ? 'skip' : 'playing'
    );
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const hasCompleted = useRef(false);
    const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    // Skip immediately if already shown this session
    useEffect(() => {
        if (phase === 'skip') {
            onCompleteRef.current();
        }
    }, [phase]);

    // Simulate progress
    useEffect(() => {
        if (phase !== 'playing' || hasCompleted.current) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                // Quickly reach ~90%, then wait
                if (prev >= 90) return prev;
                // Add random increment for natural feel
                return Math.min(prev + Math.random() * 3, 90);
            });
        }, 100);

        return () => clearInterval(interval);
    }, [phase]);

    // Initialize lottie-web directly.
    useEffect(() => {
        if (phase !== 'playing' || !containerRef.current) return;

        // Clear any leftover content
        containerRef.current.innerHTML = '';

        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: '/animations/preloader.json',
        });

        animationRef.current = anim;

        const handleComplete = () => {
            if (hasCompleted.current) return;
            hasCompleted.current = true;

            // Force progress to 100%
            setProgress(100);

            // Wait briefly at 100% before exiting
            exitTimeoutRef.current = setTimeout(() => {
                setPhase('exiting');
                sessionStorage.setItem(STORAGE_KEY, 'true');
            }, 500);
        };

        anim.addEventListener('complete', handleComplete);

        return () => {
            anim.destroy();
            animationRef.current = null;
            if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
        };
    }, [phase]);

    // Safety timeout: force exit if animation never finishes
    useEffect(() => {
        if (phase !== 'playing') return;
        const timeout = setTimeout(() => {
            if (!hasCompleted.current) {
                hasCompleted.current = true;
                setProgress(100);
                exitTimeoutRef.current = setTimeout(() => {
                    setPhase('exiting');
                    sessionStorage.setItem(STORAGE_KEY, 'true');
                }, 500);
            }
        }, 5000);
        return () => {
            clearTimeout(timeout);
            if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
        };
    }, [phase]);

    // Exit-phase: fade out then signal completion
    useEffect(() => {
        if (phase !== 'exiting') return;
        const timeout = setTimeout(() => {
            onCompleteRef.current();
        }, 600);
        return () => clearTimeout(timeout);
    }, [phase]);

    if (phase === 'skip') return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: phase === 'exiting' ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            <div
                ref={containerRef}
                style={{ width: 280, height: 280 }}
            />

            {/* Percentage Text */}
            <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-live="polite"
                style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 4vw, 64px)',
                    color: '#000000',
                    pointerEvents: 'none',
                }}
            >
                {Math.round(progress)}%
            </div>
        </div>
    );
};

export default Preloader;
