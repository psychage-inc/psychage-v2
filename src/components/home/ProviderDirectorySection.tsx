import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { staggerContainer, slideUp } from '@/lib/animations';
import { useProviderService } from '@/services/providerService';
import { Provider } from '@/types/models';
import { SkeletonProviderCard } from '@/components/ui/Skeletons';

const ProviderDirectorySection: React.FC = () => {
    const providerService = useProviderService();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        providerService.getAll({ verified: true, limit: 3 })
            .then(data => { if (!cancelled) setProviders(data.slice(0, 3)); })
            .catch(() => { /* Silent fallback - service returns mock data */ })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [providerService]);

    if (loading) {
        return (
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-4">
                                <ShieldCheck size={14} className="text-teal-600" />
                                <span className="text-xs font-bold tracking-widest uppercase text-teal-700">Verified Specialists</span>
                            </div>
                            <Display className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Find the right care, <br />
                                <span className="text-gray-400">right now.</span>
                            </Display>
                            <Text className="text-lg text-gray-500 max-w-xl">
                                Connect with top-rated mental health professionals tailored to your specific needs.
                            </Text>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <SkeletonProviderCard key={i} />)}
                    </div>
                </div>
            </section>
        );
    }

    if (providers.length === 0) return null;

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-4"
                        >
                            <ShieldCheck size={14} className="text-teal-600" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700">Verified Specialists</span>
                        </motion.div>
                        <Display className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Find the right care, <br />
                            <span className="text-gray-400">right now.</span>
                        </Display>
                        <Text className="text-lg text-gray-500 max-w-xl">
                            Connect with top-rated mental health professionals tailored to your specific needs. Verified reviews, transparent pricing.
                        </Text>
                    </div>
                    <Button variant="outline" rightIcon={<ArrowRight size={18} />} className="hidden md:flex">
                        View All Providers
                    </Button>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {providers.map((provider) => (
                        <motion.div key={provider.id} variants={slideUp}>
                            <Card hoverEffect className="h-full p-0 overflow-hidden border-gray-100 bg-gray-50">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    {provider.verified && (
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-teal-500">
                                            <ShieldCheck size={16} fill="currentColor" className="text-teal-500/20" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                                            <p className="text-sm text-teal-600 font-medium">{provider.role}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                                            <Star size={14} className="text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-bold text-amber-700">{provider.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                                        <MapPin size={14} />
                                        <span>{provider.location}</span>
                                        <span className="mx-1">•</span>
                                        <span>{provider.reviews} reviews</span>
                                    </div>
                                    <Button variant="secondary" className="w-full justify-center">
                                        Book Consultation
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 md:hidden">
                    <Button variant="outline" rightIcon={<ArrowRight size={18} />} className="w-full justify-center">
                        View All Providers
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ProviderDirectorySection;
