import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface DisclaimerProps {
    type?: 'medical' | 'general';
    className?: string;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ type = 'medical', className = '' }) => {
    const isMedical = type === 'medical';
    const Icon = isMedical ? AlertTriangle : Info;
    const bgColor = isMedical ? 'bg-amber-50/50 dark:bg-amber-900/10' : 'bg-blue-50/50 dark:bg-blue-900/10';
    const borderColor = isMedical ? 'border-amber-100 dark:border-amber-900/30' : 'border-blue-100 dark:border-blue-900/30';
    const textColor = isMedical ? 'text-amber-800/80 dark:text-amber-400' : 'text-blue-800/80 dark:text-blue-400';
    const iconColor = isMedical ? 'text-amber-500' : 'text-blue-500';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-xl border ${bgColor} ${borderColor} ${className}`}
        >
            <div className="flex gap-4">
                <div className={`shrink-0 ${iconColor} mt-0.5`}>
                    <Icon size={20} />
                </div>
                <div className={`text-sm leading-relaxed ${textColor}`}>
                    {isMedical ? (
                        <>
                            <strong>Medical Disclaimer:</strong> This article is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                        </>
                    ) : (
                        <>
                            <strong>Disclaimer:</strong> The views and opinions expressed in this article are those of the authors and do not necessarily reflect the official policy or position of Psychage.
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Disclaimer;
