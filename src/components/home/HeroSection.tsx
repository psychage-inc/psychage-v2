import React from 'react';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { staggerContainer, slideUp } from '@/lib/animations';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center bg-white text-gray-900 pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >

                    <motion.div variants={slideUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-8">
                        <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                        <span className="text-sm font-medium text-gray-600">Open Learning Platform</span>
                    </motion.div>

                    <Display className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-6 text-gray-900 drop-shadow-sm">
                        The Adaptive <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400">
                            Mental Health OS
                        </span>
                    </Display>
                    <Text className="text-xl text-gray-600 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
                        Psychage is a free, open-source resource for mental health education.
                        Access clinically-validated tools, expert articles, and guided sessions without barriers.
                    </Text>

                    <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            rightIcon={<ArrowRight size={18} />}
                            className="rounded-full px-8 bg-gray-900 text-white hover:bg-gray-800 border-none min-w-[180px]"
                            onClick={() => navigate('/learn')}
                        >
                            Start Learning
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            leftIcon={<Search size={18} />}
                            className="rounded-full px-8 border-gray-200 text-gray-700 hover:bg-gray-50 min-w-[180px]"
                            onClick={() => navigate('/tools')}
                        >
                            Browse Tools
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
