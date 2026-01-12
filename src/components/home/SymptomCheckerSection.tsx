import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { slideUp } from '@/lib/animations';

const SymptomCheckerSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        variants={slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-6">
                            <Activity size={14} className="text-teal-600" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700">AI Diagnostic Tool</span>
                        </div>
                        <Display className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Understand your <br />
                            <span className="text-teal-600">symptoms better.</span>
                        </Display>
                        <Text className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Our advanced AI symptom checker analyzes your inputs against a vast medical database to provide preliminary insights and recommended next steps.
                        </Text>

                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            {[
                                "Confidential analysis",
                                "Instant preliminary report",
                                "Guided pathways to care"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-teal-600" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            rightIcon={<ArrowRight size={18} />}
                            className="rounded-full bg-gray-900 text-white hover:bg-gray-800 border-none shadow-lg"
                            onClick={() => navigate('/clarity-score')}
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
