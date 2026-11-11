import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EDGE = 24; // matches the right-6 / bottom-6 offset used by the other floating widgets
const SIZE = 44;
const GAP = 12;

/**
 * Bottom-right offset that clears every other bottom-anchored floating element
 * (crisis card, chat launcher, mobile bottom nav, cookie bar). Those elements
 * opt in with a `data-floating` attribute.
 */
function clearOffset(): number {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = vw - EDGE - SIZE;
    const right = vw - EDGE;
    let bottom = EDGE;
    document.querySelectorAll<HTMLElement>('[data-floating]').forEach((el) => {
        if (el.dataset.floating === 'back-to-top') return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.top < vh / 2) return; // only elements anchored to the bottom half
        if (r.right <= left || r.left >= right) return; // not in the button's column
        bottom = Math.max(bottom, vh - r.top + GAP);
    });
    return Math.round(bottom);
}

const BackToTop: React.FC = () => {
    const reduceMotion = useReducedMotion();
    const [visible, setVisible] = useState(false);
    const [bottom, setBottom] = useState(EDGE);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                setVisible(window.scrollY > window.innerHeight);
                setBottom(clearOffset());
            });
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        // Floating widgets mount, animate in and get dismissed independently.
        const observer = new MutationObserver(update);
        observer.observe(document.body, { childList: true, subtree: true });
        const settle = window.setInterval(update, 1000);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            observer.disconnect();
            window.clearInterval(settle);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    data-floating="back-to-top"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
                    style={{ bottom }}
                    className="fixed right-6 z-[100] w-11 h-11 rounded-full bg-surface border border-border shadow-lg shadow-black/10 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Back to top"
                >
                    <ChevronUp size={20} aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
