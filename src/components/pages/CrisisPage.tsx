import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Globe, Heart, ArrowLeft, AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';
import MeshGradient from '../ui/MeshGradient';
import Button from '../ui/Button';

const additionalResources = [
    {
        name: 'SAMHSA National Helpline',
        phone: '1-800-662-4357',
        description: 'Free, confidential help for substance use disorders'
    },
    {
        name: 'Veterans Crisis Line',
        phone: '988 (Press 1)',
        description: 'Support for veterans and their families'
    },
    {
        name: 'Trevor Project (LGBTQ+)',
        phone: '1-866-488-7386',
        description: 'Crisis intervention for LGBTQ+ youth'
    },
    {
        name: 'National Domestic Violence Hotline',
        phone: '1-800-799-7233',
        description: 'Support for domestic violence survivors'
    },
];

const CrisisPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 relative">
            <SEO
                title="Crisis Support | Psychage"
                description="If you're in crisis or need immediate support, you're not alone. Free, confidential help is available 24/7."
            />

            <MeshGradient className="opacity-30" />

            <div className="container mx-auto max-w-4xl px-6 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors"
                    aria-label="Go back to previous page"
                >
                    <ArrowLeft size={20} aria-hidden="true" />
                    <span className="font-medium">Go Back</span>
                </button>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-6">
                        <Heart size={40} aria-hidden="true" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                        You Are Not Alone
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                        If you're experiencing a mental health crisis, help is available right now.
                        Please reach out to one of these free, confidential resources.
                    </p>
                </motion.div>

                {/* Emergency Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full text-amber-600 dark:text-amber-400 hidden md:block shrink-0">
                                <AlertTriangle size={24} aria-hidden="true" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                    Need immediate help?
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                    Call <span className="font-semibold text-gray-900 dark:text-white">988</span> or text <span className="font-semibold text-gray-900 dark:text-white">HOME</span> to <span className="font-semibold text-gray-900 dark:text-white">741741</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <a href="tel:988">
                                <Button
                                    leftIcon={<Phone size={16} />}
                                    className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                                >
                                    Call 988
                                </Button>
                            </a>
                            <a href="sms:741741&body=HOME">
                                <Button
                                    variant="outline"
                                    leftIcon={<MessageSquare size={16} />}
                                    className="bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                >
                                    Text Crisis Line
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Main Resources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    <a
                        href="tel:988"
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-800 transition-all group"
                    >
                        <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                            <Phone size={28} aria-hidden="true" />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white text-2xl mb-1">988</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Suicide & Crisis Lifeline</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">Available 24/7</div>
                    </a>

                    <a
                        href="sms:741741&body=HOME"
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-800 transition-all group"
                    >
                        <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                            <MessageSquare size={28} aria-hidden="true" />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white text-lg mb-1">Text HOME to 741741</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Crisis Text Line</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">Available 24/7</div>
                    </a>

                    <a
                        href="https://findtreatment.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-rose-200 dark:hover:border-rose-800 transition-all group"
                    >
                        <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                            <Globe size={28} aria-hidden="true" />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white text-lg mb-1">FindTreatment.gov</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">Treatment Locator</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
                            Find help nearby <ExternalLink size={12} aria-hidden="true" />
                        </div>
                    </a>
                </motion.div>

                {/* Additional Resources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800"
                >
                    <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                        <AlertTriangle className="text-amber-500" size={24} aria-hidden="true" />
                        Additional Support Resources
                    </h2>

                    <div className="grid gap-4">
                        {additionalResources.map((resource) => (
                            <div
                                key={resource.name}
                                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 gap-4"
                            >
                                <div>
                                    <h3 className="font-bold text-text-primary">{resource.name}</h3>
                                    <p className="text-sm text-text-secondary">{resource.description}</p>
                                </div>
                                <a href={`tel:${resource.phone.replace(/[^\d]/g, '')}`}>
                                    <Button
                                        variant="outline"
                                        leftIcon={<Phone size={16} />}
                                        className="whitespace-nowrap"
                                    >
                                        {resource.phone}
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Safety Planning */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <p className="text-text-secondary mb-4">
                        Want to create a personal safety plan?
                    </p>
                    <a
                        href="https://suicidepreventionlifeline.org/wp-content/uploads/2016/08/Brown_StanleySafetyPlanTemplate.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" rightIcon={<ExternalLink size={16} />}>
                            Download Safety Plan Template
                        </Button>
                    </a>
                </motion.div>

                {/* Reassurance */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 text-center text-text-tertiary text-sm"
                >
                    <p>
                        All resources listed are free and confidential. You matter, and help is always available.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CrisisPage;
