import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Upload, FileText, User, Building, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import SEO from '../SEO';

const ProviderOnboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        licenseType: '',
        licenseNumber: '',
        practiceName: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        // Mock submission
        setTimeout(() => {
            setIsLoading(false);
            setStep(5); // Success step
        }, 2000);
    };

    const steps = [
        { id: 1, title: 'Basic Info', icon: User },
        { id: 2, title: 'Credentials', icon: FileText },
        { id: 3, title: 'Practice', icon: Building },
        { id: 4, title: 'Review', icon: CheckCircle2 },
    ];

    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] pt-32 pb-20 px-6 transition-colors duration-300">
            <SEO title="Provider Application | Psychage" description="Join the Psychage provider network." />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-display font-bold text-4xl text-gray-900 dark:text-white mb-4">
                        Join the Network
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        Expand your practice and reach patients who need your expertise.
                    </p>
                </div>

                {step < 5 && (
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
                        {/* Progress Bar */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center relative">
                                {/* Line */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10" />

                                {steps.map((s) => (
                                    <div key={s.id} className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900 px-2">
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors
                                            ${step >= s.id ? 'bg-teal-500 text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-400'}
                                        `}>
                                            {step > s.id ? <CheckCircle2 size={20} /> : s.id}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`}>
                                            {s.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                                <input
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                                <input
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Credentials</h2>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">License Type</label>
                                            <select
                                                name="licenseType"
                                                value={formData.licenseType}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            >
                                                <option value="">Select License Type</option>
                                                <option value="MD">MD / DO (Psychiatrist)</option>
                                                <option value="PhD">PhD / PsyD (Psychologist)</option>
                                                <option value="LCSW">LCSW / LICSW</option>
                                                <option value="LMFT">LMFT</option>
                                                <option value="LPC">LPC / LPCC</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">License Number</label>
                                            <input
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="p-6 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-800">
                                            <div className="flex items-start gap-3">
                                                <Upload className="text-teal-600 dark:text-teal-400 mt-1" size={20} />
                                                <div>
                                                    <h4 className="font-bold text-teal-900 dark:text-teal-200 mb-1">Upload License Document</h4>
                                                    <p className="text-sm text-teal-700 dark:text-teal-300 mb-3">Please upload a PDF or image of your current state license.</p>
                                                    <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                                        Choose File
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Practice Details</h2>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Practice Name</label>
                                            <input
                                                name="practiceName"
                                                value={formData.practiceName}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Office Address</label>
                                            <input
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review & Submit</h2>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                                                <span className="text-gray-500 dark:text-gray-400">Name</span>
                                                <span className="font-bold text-gray-900 dark:text-white">{formData.firstName} {formData.lastName}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                                                <span className="text-gray-500 dark:text-gray-400">Email</span>
                                                <span className="font-bold text-gray-900 dark:text-white">{formData.email}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                                                <span className="text-gray-500 dark:text-gray-400">License</span>
                                                <span className="font-bold text-gray-900 dark:text-white">{formData.licenseType} - {formData.licenseNumber}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Practice</span>
                                                <span className="font-bold text-gray-900 dark:text-white">{formData.practiceName}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-blue-800 dark:text-blue-200">
                                            <input type="checkbox" className="mt-1" />
                                            <p>I attest that the information provided is accurate and I agree to the Provider Terms of Service.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                                {step > 1 ? (
                                    <Button variant="outline" onClick={handleBack} leftIcon={<ArrowLeft size={18} />}>
                                        Back
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {step < 4 ? (
                                    <Button onClick={handleNext} rightIcon={<ChevronRight size={18} />}>
                                        Next Step
                                    </Button>
                                ) : (
                                    <Button onClick={handleSubmit} isLoading={isLoading} className="bg-teal-600 hover:bg-teal-700 text-white">
                                        Submit Application
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center shadow-xl border border-gray-100 dark:border-gray-800"
                    >
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Application Received!</h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                            Thank you for applying to join Psychage. Our credentialing team will review your information and contact you within 2-3 business days.
                        </p>
                        <Button onClick={() => navigate('/')} size="lg">
                            Return to Home
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProviderOnboarding;
