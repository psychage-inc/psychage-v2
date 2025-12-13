import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Moon, BrainCircuit, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';

const ToolsSection: React.FC = () => {
    const navigate = useNavigate();

    const tools = [
        {
            id: 'mood-journal',
            name: 'Mood Journal',
            description: 'Track your emotional patterns and identify triggers.',
            icon: PenTool,
            link: '/tools/mood-journal'
        },
        {
            id: 'sleep-architect',
            name: 'Sleep Architect',
            description: 'Optimize your sleep cycles for better cognitive performance.',
            icon: Moon,
            link: '/tools/sleep-architect'
        },
        {
            id: 'clarity-score',
            name: 'Clarity Score',
            description: 'Measure your current mental clarity and focus levels.',
            icon: BrainCircuit,
            link: '/clarity-score'
        }
    ];

    return (
        <section className="py-24 px-6 bg-white border-y border-gray-100">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">
                            Interactive Tools
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                            Tools for your mind
                        </h2>
                        <p className="text-lg text-gray-600 max-w-xl">
                            Clinically-validated exercises and trackers to help you understand and improve your mental well-being.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={18} />}
                        onClick={() => navigate('/tools')}
                        className="shrink-0 border-gray-200"
                    >
                        View All Tools
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(tool.link)}
                            className="group cursor-pointer bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors">
                                <tool.icon size={24} className="text-gray-900" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:underline decoration-gray-300 underline-offset-4 transition-all">
                                {tool.name}
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                {tool.description}
                            </p>
                            <div className="flex items-center text-sm font-bold text-gray-900 group-hover:gap-2 transition-all">
                                Open Tool <ArrowRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
