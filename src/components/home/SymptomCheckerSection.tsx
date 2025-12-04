import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { slideUp } from '@/lib/animations';

const SymptomCheckerSection: React.FC = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#050505] border-t border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        variants={slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 mb-6">
                            <Activity size={14} className="text-teal-600 dark:text-teal-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700 dark:text-teal-400">AI Diagnostic Tool</span>
                        </div>
                        <Display className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Understand your <br />
                            <span className="text-teal-600 dark:text-teal-400">symptoms better.</span>
                        </Display>
                        <Text className="text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Our advanced AI symptom checker analyzes your inputs against a vast medical database to provide preliminary insights and recommended next steps.
                        </Text>

                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            {[
                                "Confidential analysis",
                                "Instant preliminary report",
                                "Guided pathways to care"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-teal-600 dark:text-teal-500" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            rightIcon={<ArrowRight size={18} />}
                            className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-none shadow-lg"
                        >
                            Start Symptom Check
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SymptomCheckerSection;
