import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, MapPin, Clock, Video, GraduationCap, Languages, ArrowLeft, MessageSquare } from 'lucide-react';
import { providerService } from '../../services/providerService';
import { Provider } from '../../types/models';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SEO from '../SEO';

const ProviderProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [provider, setProvider] = useState<Provider | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProvider = async () => {
            if (id) {
                setLoading(true);
                try {
                    const foundProvider = await providerService.getById(Number(id));
                    setProvider(foundProvider);
                } catch (error) {
                    console.error("Failed to fetch provider", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProvider();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [provider]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] dark:bg-[#050505]">Loading...</div>;
    }

    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] dark:bg-[#050505]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Provider not found</h2>
                    <Button onClick={() => navigate('/find-care')}>Back to Directory</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] pt-24 pb-20 transition-colors duration-300">
            <SEO title={`${provider.name} - ${provider.role} | Psychage`} description={`Book an appointment with ${provider.name}, ${provider.role} in ${provider.location}.`} />

            <div className="container mx-auto max-w-[1100px] px-6">
                <button onClick={() => navigate('/find-care')} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Directory
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Hero Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative shrink-0">
                                    <img
                                        src={provider.image}
                                        alt={provider.name}
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                                    />
                                    {provider.verified && (
                                        <div className="absolute bottom-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md">
                                            <ShieldCheck size={24} className="text-teal-500 fill-teal-50 dark:fill-teal-900/30" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                                            {provider.name}
                                        </h1>
                                        {provider.isVideoVisit && (
                                            <Badge variant="neutral" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800">
                                                <Video size={12} className="mr-1" /> Video Visits
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-4">{provider.role}</p>

                                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        <div className="flex items-center gap-2">
                                            <Star className="text-amber-500 fill-amber-500" size={18} />
                                            <span className="font-bold text-gray-900 dark:text-white">{provider.rating}</span>
                                            <span className="underline decoration-dotted">({provider.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} />
                                            <span>{provider.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} />
                                            <span>{provider.yearsExperience} Years Exp.</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {provider.specialties.map(spec => (
                                            <Badge key={spec} variant="neutral" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                                {provider.bio || provider.approach}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <GraduationCap size={20} className="text-teal-500" /> Education & Training
                                    </h3>
                                    <ul className="space-y-3">
                                        {provider.education.map((edu, idx) => (
                                            <li key={idx} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
                                                {edu}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Languages size={20} className="text-teal-500" /> Languages
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.languages.map(lang => (
                                            <span key={lang} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 font-medium border border-gray-100 dark:border-gray-700">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Reviews Section */}
                        <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                Patient Reviews <span className="text-gray-400 text-lg font-normal">({provider.reviews})</span>
                            </h2>

                            {provider.reviewsList && provider.reviewsList.length > 0 ? (
                                <div className="space-y-6">
                                    {provider.reviewsList.map(review => (
                                        <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-900 dark:text-white">{review.user}</span>
                                                <span className="text-sm text-gray-400">{review.date}</span>
                                            </div>
                                            <div className="flex text-amber-500 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300 dark:text-gray-700" : ""} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 italic">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No written reviews yet.
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-none">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Availability</p>
                                        <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            {provider.availability}
                                        </p>
                                    </div>
                                    {provider.nextAvailable && (
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Next Opening</p>
                                            <p className="font-bold text-gray-900 dark:text-white">{provider.nextAvailable.split(',')[0]}</p>
                                        </div>
                                    )}
                                </div>

                                <Button className="w-full h-12 text-lg font-bold bg-teal-600 hover:bg-teal-700 text-white mb-3">
                                    Book Appointment
                                </Button>
                                <Button variant="outline" className="w-full h-12 font-bold border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                    Message Provider
                                </Button>

                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">Accepted Insurance</p>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.insurance.map(ins => (
                                            <span key={ins} className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                                                {ins}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
                                <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2 flex items-center gap-2">
                                    <MessageSquare size={18} /> Free Consultation
                                </h4>
                                <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-4">
                                    Not sure if this is the right fit? {provider.name.split(' ')[1]} offers a free 15-minute introductory call.
                                </p>
                                <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Request Intro Call →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;