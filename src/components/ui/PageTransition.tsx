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
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth entrance
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.99,
        filter: 'blur(5px)',
        transition: {
            duration: 0.3,
            ease: "easeIn"
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
