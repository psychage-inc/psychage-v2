import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { staggerContainer, slideUp } from '@/lib/animations';

const providers = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        specialty: "Clinical Psychologist",
        rating: 4.9,
        reviews: 128,
        location: "San Francisco, CA",
        image: "/images/authors/author-placeholder.svg",
        verified: true
    },
    {
        id: 2,
        name: "Dr. Michael Ross",
        specialty: "Psychiatrist",
        rating: 4.8,
        reviews: 93,
        location: "New York, NY",
        image: "/images/authors/author-placeholder.svg",
        verified: true
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        specialty: "Trauma Specialist",
        rating: 5.0,
        reviews: 56,
        location: "Austin, TX",
        image: "/images/authors/author-placeholder.svg",
        verified: true
    }
];

const ProviderDirectorySection: React.FC = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 mb-4"
                        >
                            <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700 dark:text-teal-400">Verified Specialists</span>
                        </motion.div>
                        <Display className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Find the right care, <br />
                            <span className="text-gray-400">right now.</span>
                        </Display>
                        <Text className="text-lg text-gray-500 dark:text-gray-400 max-w-xl">
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
                            <Card hoverEffect className="h-full p-0 overflow-hidden border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111]">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    {provider.verified && (
                                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-teal-500">
                                            <ShieldCheck size={16} fill="currentColor" className="text-teal-500/20" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{provider.name}</h3>
                                            <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">{provider.specialty}</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-800">
                                            <Star size={14} className="text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{provider.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
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
