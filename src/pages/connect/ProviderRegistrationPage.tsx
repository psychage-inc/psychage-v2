import React, { useState, useRef } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, User, Briefcase, FileText, Lock, Upload, ArrowLeft, ShieldCheck, X, Image } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/context/ToastContext';
import SEO from '@/components/SEO';

const steps = [
    { id: 1, title: 'Account', icon: User },
    { id: 2, title: 'Professional', icon: Briefcase },
    { id: 3, title: 'Profile', icon: FileText },
    { id: 4, title: 'Verification', icon: Lock },
];

const ProviderRegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const { success, error: showError } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '',
        title: '', licenseNumber: '', state: '', specialties: '',
        bio: '', education: '',
        agreedToTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showError('Please upload an image file (JPG or PNG)');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showError('File size must be less than 5MB');
            return;
        }

        setPhotoFile(file);

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemovePhoto = () => {
        setPhotoFile(null);
        setPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        if (!formData.agreedToTerms) {
            showError('Please agree to the Provider Terms to continue');
            return;
        }

        setIsSubmitting(true);
        try {
            // Create FormData to include photo if present
            const submitData = {
                ...formData,
                hasPhoto: !!photoFile,
            };

            const response = await api.providers.register(submitData);
            if (response.success) {
                // If we have a photo and the registration returned a provider ID, upload the photo
                // Note: This depends on backend implementation
                success("Application submitted successfully! We will be in touch shortly.");
                navigate('/connect');
            }
        } catch (error) {
            console.error(error);
            showError('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6 transition-colors duration-300">
            <SEO title="Join as a Provider | Psychage Connect" />

            <div className="container mx-auto max-w-2xl">
                <Link to="/connect" className="flex items-center gap-2 text-text-tertiary hover:text-text-primary mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Hub
                </Link>

                <div className="text-center mb-10">
                    <Display as="h1" className="text-3xl md:text-4xl mb-4">Join Psychage Connect</Display>
                    <Text className="text-text-secondary">Expand your practice and connect with patients who match your specialty.</Text>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-hover -z-10 -translate-y-1/2 rounded-full" />
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${currentStep >= step.id
                                ? 'bg-primary border-primary text-white'
                                : 'bg-surface border-border text-text-tertiary'
                                }`}>
                                {currentStep > step.id ? <CheckCircle2 size={20} /> : <step.icon size={18} />}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-primary' : 'text-text-tertiary'}`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>

                <Card className="p-8 md:p-10 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* STEP 1: ACCOUNT */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-text-primary mb-6">Create your account</h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-secondary">First Name</label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="Jane"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-secondary">Last Name</label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="jane.doe@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: PROFESSIONAL */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-text-primary mb-6">Professional Details</h2>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Professional Title</label>
                                        <select
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                                        >
                                            <option value="">Select Title</option>
                                            <option value="Ph.D.">Ph.D. (Psychologist)</option>
                                            <option value="Psy.D.">Psy.D. (Psychologist)</option>
                                            <option value="MD">MD (Psychiatrist)</option>
                                            <option value="LCSW">LCSW (Social Worker)</option>
                                            <option value="LMFT">LMFT (Marriage & Family)</option>
                                            <option value="LPC">LPC (Professional Counselor)</option>
                                        </select>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-secondary">License Number</label>
                                            <input
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="Lic-123456"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-secondary">Issuing State</label>
                                            <input
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="California"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Education / Alma Mater</label>
                                        <input
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            placeholder="Stanford University"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: PROFILE */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-text-primary mb-6">Build your profile</h2>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-secondary">Professional Bio (Short)</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={4}
                                            maxLength={300}
                                            className="w-full p-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            placeholder="Tell patients about your approach..."
                                        />
                                        <p className="text-xs text-text-tertiary text-right">{formData.bio.length}/300 characters</p>
                                    </div>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handlePhotoChange}
                                    />

                                    {photoPreview ? (
                                        <div className="relative border-2 border-primary rounded-xl p-4 bg-primary/5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={photoPreview}
                                                    alt="Preview"
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-bold text-text-primary flex items-center gap-2">
                                                        <Image size={16} className="text-primary" />
                                                        {photoFile?.name}
                                                    </p>
                                                    <p className="text-sm text-text-secondary">
                                                        {photoFile ? `${(photoFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleRemovePhoto}
                                                    className="p-2 text-text-tertiary hover:text-error hover:bg-error/10 rounded-full transition-colors"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-surface-hover/50 hover:bg-surface-hover hover:border-primary/50 transition-colors cursor-pointer group"
                                        >
                                            <Upload className="mx-auto text-text-tertiary group-hover:text-primary mb-4 transition-colors" size={32} />
                                            <p className="font-bold text-text-primary mb-1">Upload Profile Photo</p>
                                            <p className="text-sm text-text-secondary">JPG or PNG, max 5MB</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* STEP 4: VERIFICATION */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-text-primary mb-6">Verification & Consent</h2>

                                    <div className="bg-surface-hover rounded-xl p-6 border border-border mb-6">
                                        <h3 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                                            <ShieldCheck size={18} className="text-primary" />
                                            Provider Agreement
                                        </h3>
                                        <div className="h-32 overflow-y-auto text-sm text-text-secondary pr-2 custom-scrollbar mb-4">
                                            <p className="mb-2">By joining Psychage Connect, you agree to:</p>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Maintain active good standing with your licensing board.</li>
                                                <li>Respond to patient inquiries within 2 business days.</li>
                                                <li>Adhere to HIPAA compliance standards on the platform.</li>
                                                {/* More terms */}
                                            </ul>
                                        </div>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="agreedToTerms"
                                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                                                checked={formData.agreedToTerms}
                                                onChange={handleChange}
                                            />
                                            <span className="text-sm font-medium text-text-primary">I have read and agree to the Provider Terms</span>
                                        </label>
                                    </div>

                                    <div className="bg-primary/5 rounded-xl p-4 text-sm text-text-secondary">
                                        Note: Your profile will be pending approval until we verify your license with the state board (typically 24-48 hours).
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={currentStep === 1 ? 'invisible' : ''}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            rightIcon={currentStep === steps.length ? <CheckCircle2 size={18} /> : <ChevronRight size={18} />}
                        >
                            {currentStep === steps.length ? 'Submit Application' : 'Continue'}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProviderRegistrationPage;
