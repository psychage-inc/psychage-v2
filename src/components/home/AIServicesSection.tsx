import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Moon, PenTool, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Display, Text } from '@/components/ui/Typography';
import { staggerContainer, slideUp } from '@/lib/animations';

const services = [
    {
        id: 'clarity',
        title: 'Clarity Score',
        description: 'Real-time cognitive load analysis and optimization.',
        icon: Brain,
        color: 'text-teal-400',
        bg: 'bg-teal-400/10',
        colSpan: 'md:col-span-2'
    },
    {
        id: 'journal',
        title: 'Mood Journal',
        description: 'AI-powered emotional pattern recognition.',
        icon: PenTool,
        color: 'text-amber-400',
        bg: 'bg-amber-400/10',
        colSpan: 'md:col-span-1'
    },
    {
        id: 'sleep',
        title: 'Sleep Architect',
        description: 'Circadian rhythm synchronization.',
        icon: Moon,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10',
        colSpan: 'md:col-span-1'
    },
    {
        id: 'chat',
        title: 'AI Companion',
        description: '24/7 empathetic support and guidance.',
        icon: MessageSquare,
        color: 'text-rose-400',
        bg: 'bg-rose-400/10',
        colSpan: 'md:col-span-2'
    }
];

const AIServicesSection: React.FC = () => {
    return (
        <section className="py-24 bg-[#050505] text-white relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Display className="text-4xl md:text-6xl font-bold mb-6">
                            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Intelligence.</span>
                        </Display>
                        <Text className="text-xl text-gray-400">
                            A suite of adaptive tools designed to understand and optimize your unique mental landscape.
                        </Text>
                    </motion.div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {services.map((service) => (
                        <motion.div key={service.id} variants={slideUp} className={service.colSpan}>
                            <Card hoverEffect className="h-full p-8 bg-[#111] border-white/5 group">
                                <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                    <service.icon size={24} className={service.color} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 mb-6 text-lg">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                                    <span>Learn more</span>
                                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AIServicesSection;
