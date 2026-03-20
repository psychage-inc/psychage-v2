import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollAnimationOptions {
    /** Only trigger once (default: true) */
    once?: boolean;
    /** Fraction of element visible to trigger (default: 0.05) */
    amount?: number;
    /** IntersectionObserver root margin */
    margin?: string;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
    const { once = true, amount = 0.05, margin } = options;
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once,
        amount,
        ...(margin ? { margin: margin as `${number}px` } : {}),
    });
    const prefersReducedMotion = useReducedMotion();

    return {
        ref,
        isInView: true,
        shouldAnimate: !prefersReducedMotion,
    };
}
