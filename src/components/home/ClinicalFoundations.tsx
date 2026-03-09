import React from 'react';
import { motion } from 'framer-motion';

const foundations = [
    { name: 'PHQ-9', desc: 'Depression Standard' },
    { name: 'GAD-7', desc: 'Anxiety Assessment' },
    { name: 'CBT', desc: 'Cognitive Behavioral' },
    { name: 'ACT', desc: 'Acceptance & Commitment' },
    { name: 'DBT', desc: 'Dialectical Behavior' }
];

const ClinicalFoundations: React.FC = () => {
    return (
        <section className="py-12 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
                    Built on Clinically-Validated Frameworks
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
                    {foundations.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <h4 className="font-display font-black text-2xl md:text-3xl text-slate-300 dark:text-slate-700 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors duration-300">
                                {item.name}
                            </h4>
                            <span className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium tracking-wide opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                {item.desc}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClinicalFoundations;
