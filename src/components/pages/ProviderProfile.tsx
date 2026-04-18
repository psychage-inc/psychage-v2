import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, MapPin, Clock, Video, GraduationCap, Languages, ArrowLeft, MessageSquare } from 'lucide-react';
import { providerService } from '../../services/providerService';
import { bookingService } from '../../services/bookingService';
import { messagingService } from '../../services/messagingService';
import { Provider } from '../../types/models';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import SEO from '../SEO';
import BookingModal, { BookingDetails } from '../booking/BookingModal';
import MessagingModal, { MessageDetails } from '../messaging/MessagingModal';
import { useAuth } from '../../context/AuthContext';

// Default fallback avatar
const FallbackAvatar: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
    <div className={`bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center ${className}`}>
        <span className="text-white font-bold text-3xl">
            {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </span>
    </div>
);

const ProviderProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [provider, setProvider] = useState<Provider | undefined>();
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isMessagingOpen, setIsMessagingOpen] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState(false);

    const handleBookingConfirm = async (booking: BookingDetails) => {
        if (user && provider) {
            const result = await bookingService.createBooking({
                patient_id: user.id,
                provider_id: String(provider.id),
                booking_date: booking.date,
                booking_time: booking.time,
                visit_type: booking.visitType === 'in-person' ? 'in_person' : 'video',
                reason: booking.reason,
            });
            if (!result.success) {
                console.error('Booking failed:', result.error);
            }
        }
        setIsBookingOpen(false);
        setBookingSuccess(true);
        setTimeout(() => setBookingSuccess(false), 5000);
    };

    const handleMessageSend = async (message: MessageDetails) => {
        if (user && provider) {
            const result = await messagingService.sendMessage({
                sender_id: user.id,
                provider_id: String(provider.id),
                subject: message.subject,
                body: message.message,
                is_urgent: message.urgent,
            });
            if (!result.success) {
                console.error('Message failed:', result.error);
            }
        }
        setIsMessagingOpen(false);
        setMessageSuccess(true);
        setTimeout(() => setMessageSuccess(false), 5000);
    };

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
        return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
    }

    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-text-primary mb-4">Provider not found</h2>
                    <Button onClick={() => navigate('/providers')}>Back to Directory</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 transition-colors duration-300">
            <SEO title={`${provider.name} - ${provider.role} | Psychage`} description={`Book an appointment with ${provider.name}, ${provider.role} in ${provider.location}.`} />

            <div className="container mx-auto max-w-[68.75rem] px-6">
                <button onClick={() => navigate('/providers')} className="flex items-center gap-2 text-text-tertiary hover:text-text-primary mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Directory
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Hero Card */}
                        <div className="bg-surface rounded-3xl p-8 border border-border shadow-sm">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative shrink-0">
                                    {!imageError && provider.image ? (
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-surface shadow-lg"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <FallbackAvatar
                                            name={provider.name}
                                            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface shadow-lg"
                                        />
                                    )}
                                    {provider.verified && (
                                        <div className="absolute bottom-1 right-1 bg-surface rounded-full p-1.5 shadow-md">
                                            <ShieldCheck size={24} className="text-teal-500 fill-teal-50 dark:fill-teal-900/30" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                                            {provider.name}
                                        </h1>
                                        {provider.isVideoVisit && (
                                            <Badge variant="neutral" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800">
                                                <Video size={12} className="mr-1" /> Video Visits
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-lg text-text-secondary font-medium mb-4">{provider.role}</p>

                                    <div className="flex flex-wrap gap-6 text-sm text-text-secondary mb-6">
                                        {provider.rating != null && (
                                            <div className="flex items-center gap-2">
                                                <Star className="text-amber-500 fill-amber-500" size={18} />
                                                <span className="font-bold text-text-primary">{provider.rating}</span>
                                                <span className="underline decoration-dotted">({provider.reviews ?? 0} reviews)</span>
                                            </div>
                                        )}
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
                                            <Badge key={spec} variant="neutral" className="bg-surface-active text-text-secondary">
                                                {spec}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-bold text-text-primary mb-6">About</h2>
                            <p className="text-text-secondary leading-relaxed text-lg mb-8">
                                {provider.bio || provider.approach}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                        <GraduationCap size={20} className="text-teal-500" /> Education & Training
                                    </h3>
                                    <ul className="space-y-3">
                                        {provider.education.map((edu, idx) => (
                                            <li key={idx} className="text-text-secondary text-sm flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-text-tertiary/40 shrink-0" />
                                                {edu}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                                        <Languages size={20} className="text-teal-500" /> Languages
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.languages.map(lang => (
                                            <span key={lang} className="px-3 py-1 bg-surface-hover rounded-lg text-sm text-text-secondary font-medium border border-border">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Reviews Section */}
                        <section className="bg-surface rounded-3xl p-8 border border-border shadow-sm">
                            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                                Patient Reviews <span className="text-text-tertiary text-lg font-normal">({provider.reviews ?? 0})</span>
                            </h2>

                            {provider.reviewsList && provider.reviewsList.length > 0 ? (
                                <div className="space-y-6">
                                    {provider.reviewsList.map(review => (
                                        <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-text-primary">{review.user}</span>
                                                <span className="text-sm text-text-tertiary">{review.date}</span>
                                            </div>
                                            <div className="flex text-amber-500 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-border" : ""} />
                                                ))}
                                            </div>
                                            <p className="text-text-secondary italic">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-text-tertiary">
                                    No written reviews yet.
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-surface rounded-3xl p-6 border border-border shadow-lg shadow-gray-200/50 dark:shadow-none">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <p className="text-sm text-text-tertiary font-medium">Availability</p>
                                        <p className="font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            {provider.availability}
                                        </p>
                                    </div>
                                    {provider.nextAvailable && (
                                        <div className="text-right">
                                            <p className="text-sm text-text-tertiary font-medium">Next Opening</p>
                                            <p className="font-bold text-text-primary">{provider.nextAvailable.split(',')[0]}</p>
                                        </div>
                                    )}
                                </div>

                                {bookingSuccess && (
                                    <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-300 font-medium">
                                        ✓ Appointment booked successfully!
                                    </div>
                                )}
                                {messageSuccess && (
                                    <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-300 font-medium">
                                        ✓ Message sent successfully!
                                    </div>
                                )}
                                <Button
                                    className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary-hover text-white mb-3"
                                    onClick={() => setIsBookingOpen(true)}
                                >
                                    Book Appointment
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 font-bold border-border hover:bg-surface-hover"
                                    onClick={() => setIsMessagingOpen(true)}
                                >
                                    Message Provider
                                </Button>

                                <div className="mt-6 pt-6 border-t border-border">
                                    <p className="text-sm text-text-tertiary font-medium mb-3">Accepted Insurance</p>
                                    <div className="flex flex-wrap gap-2">
                                        {provider.insurance.map(ins => (
                                            <span key={ins} className="text-xs font-bold px-2 py-1 bg-surface-active text-text-secondary rounded">
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

            {/* Booking Modal */}
            {provider && (
                <BookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    provider={provider}
                    onConfirm={handleBookingConfirm}
                />
            )}

            {/* Messaging Modal */}
            {provider && (
                <MessagingModal
                    isOpen={isMessagingOpen}
                    onClose={() => setIsMessagingOpen(false)}
                    provider={provider}
                    onSend={handleMessageSend}
                />
            )}
        </div>
    );
};

export default ProviderProfile;