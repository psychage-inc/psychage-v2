import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Check if hovering over clickable element
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    // Hide on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <motion.div
                className="w-4 h-4 bg-white rounded-full"
                animate={{
                    scale: isPointer ? 3 : 1,
                    opacity: isPointer ? 0.5 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    );
};
