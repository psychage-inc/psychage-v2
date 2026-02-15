import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toolService } from '@/services/toolService';
import { Tool } from '@/types/models';
import { BrainCircuit, PenTool, Moon, Wind, Users, ShieldAlert, ArrowRight, Lock, HelpCircle, CheckCircle2, LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import SEO from '@/components/SEO';
import { Card } from '@/components/ui/Card';

const iconMap: Record<string, LucideIcon> = {
    BrainCircuit, PenTool, Moon, Wind, Users, ShieldAlert
};

// Color mapping for Tailwind classes (can't use dynamic classes due to purging)
const colorClasses: Record<string, { bg: string; text: string }> = {
    teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    sky: { bg: 'bg-sky-100', text: 'text-sky-600' },
    rose: { bg: 'bg-rose-100', text: 'text-rose-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
};

const ToolsLandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [tools, setTools] = useState<Tool[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    React.useEffect(() => {
        const fetchTools = async () => {
            try {
                const data = await toolService.getAll();
                setTools(data);
            } catch (error) {
                console.error("Failed to fetch tools:", error);
            } finally {
                // setIsLoading(false); // Removed as isLoading state is no longer used
            }
        };
        fetchTools();
    }, []);

    const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))];

    const filteredTools = tools.filter(tool =>
        selectedCategory === 'All' || tool.category === selectedCategory
    );

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <SEO title="Mental Health Toolkit | Psychage" description="Clinically-validated tools and exercises." />

            {/* Hero */}
            <section className="px-6 mb-20 text-center">
                <div className="container mx-auto max-w-4xl">
                    <Display as="h1" className="text-5xl md:text-6xl mb-6">
                        Tools for your <span className="text-primary">mental fitness</span>.
                    </Display>
                    <Text className="text-xl max-w-2xl mx-auto mb-10">
                        A collection of clinically-validated exercises to help you understand, manage, and optimize your cognitive state.
                    </Text>
                </div>
            </section>

            {/* Clarity Score Card (Featured) */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-5xl">
                    <Card className="bg-surface-elevated border-primary/20 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                        <div className="p-8 md:p-12 md:flex items-center gap-12 relative z-10">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                    <BrainCircuit size={14} />
                                    <span>Signature Assessment</span>
                                </div>
                                <Display as="h2" className="text-4xl mb-4">Clarity Score™</Display>
                                <Text className="text-lg mb-8">
                                    Understand your mental baseline with our clinical-grade assessment. Measures depression, anxiety, and stress indicators in less than 2 minutes.
                                </Text>
                                <div className="flex flex-wrap gap-4">
                                    <Button size="xl" onClick={() => navigate('/tools/clarity-score')}>
                                        Start Assessment
                                    </Button>
                                    <div className="flex items-center gap-2 text-sm text-text-secondary px-4">
                                        <Wind size={16} /> 5-7 mins
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 mt-8 md:mt-0 bg-background/50 rounded-2xl p-6 border border-border/50 backdrop-blur-sm">
                                <h3 className="font-bold text-text-primary mb-4">What you'll get:</h3>
                                <ul className="space-y-4">
                                    {[
                                        'Personalized mental health score',
                                        'Depression & Anxiety severity screening (PHQ-9/GAD-7)',
                                        'Tailored action plan & resources',
                                        'Progress tracking over time'
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                                            <CheckCircle2 className="text-success shrink-0" size={18} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* All Tools Grid */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <Display as="h2" className="text-3xl">Browse All Tools</Display>
                        <div className="flex gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-text-primary text-white' : 'bg-surface hover:bg-surface-hover text-text-secondary'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map((tool, index) => {
                            const Icon = iconMap[tool.iconName] || BrainCircuit;
                            const link = tool.id === 1 ? '/tools/clarity-score' : tool.id === 2 ? '/tools/mood-journal' : tool.id === 3 ? '/tools/sleep-architect' : '#';
                            const isLocked = link === '#';

                            return (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group bg-surface rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg transition-all relative overflow-hidden ${isLocked ? 'opacity-75' : ''}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${colorClasses[tool.color]?.bg || 'bg-gray-100'} ${colorClasses[tool.color]?.text || 'text-gray-600'}`}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="font-display font-bold text-xl text-text-primary mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                                    <p className="text-text-secondary text-sm mb-6 line-clamp-3">{tool.description}</p>

                                    {isLocked ? (
                                        <div className="w-full py-2 bg-surface-hover rounded-lg text-center text-xs font-bold text-text-tertiary uppercase tracking-wider">Coming Soon</div>
                                    ) : (
                                        <Link to={link}>
                                            <Button variant="outline" className="w-full" rightIcon={<ArrowRight size={16} />}>Open Tool</Button>
                                        </Link>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Privacy & FAQ */}
            <section className="px-6 mb-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldAlert className="text-text-primary" size={24} />
                                <Display as="h3" className="text-2xl">Privacy First</Display>
                            </div>
                            <Text className="mb-6">
                                Your mental health data is sensitive. We treat it that way.
                            </Text>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-text-secondary text-sm">
                                    <Lock size={18} className="text-primary shrink-0" />
                                    <span>Your assessment results are private by default.</span>
                                </li>
                                <li className="flex gap-3 text-text-secondary text-sm">
                                    <Users size={18} className="text-primary shrink-0" />
                                    <span>We never share your data with advertisers or third parties.</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <HelpCircle className="text-text-primary" size={24} />
                                <Display as="h3" className="text-2xl">FAQ</Display>
                            </div>
                            <div className="space-y-4">
                                <details className="group p-4 bg-surface rounded-xl border border-border cursor-pointer">
                                    <summary className="font-bold text-text-primary list-none flex justify-between items-center">
                                        Is this a diagnosis?
                                        <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                                        No. These tools are for screening and educational purposes only. Please consult a professional provided in our Connect section for medical advice.
                                    </p>
                                </details>
                                <details className="group p-4 bg-surface rounded-xl border border-border cursor-pointer">
                                    <summary className="font-bold text-text-primary list-none flex justify-between items-center">
                                        Can I save my results?
                                        <span className="group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                                        Yes, if you create an account, your progress history will be saved to your private dashboard.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ToolsLandingPage;
