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
        filter: 'blur(10px)',
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Custom Quint easing
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(5px)',
        transition: {
            duration: 0.4,
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
