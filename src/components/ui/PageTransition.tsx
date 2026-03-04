import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

const variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: 'blur(10px)',
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1], // Apple-like snappy curve
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.99,
        filter: 'blur(5px)',
        transition: {
            duration: 0.2,
            ease: [0.32, 0, 0.67, 0] // Snappy exit curve
        }
    }
};

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
