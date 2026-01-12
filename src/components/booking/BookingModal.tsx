import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Provider } from '@/types/models';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: Provider;
    onConfirm: (booking: BookingDetails) => void;
}

export interface BookingDetails {
    providerId: string | number;
    providerName: string;
    date: string;
    time: string;
    visitType: 'video' | 'in-person';
    reason?: string;
}

const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, provider, onConfirm }) => {
    const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirm'>('date');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [visitType, setVisitType] = useState<'video' | 'in-person'>('video');
    const [reason, setReason] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate calendar days for current month
    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startPadding = firstDay.getDay();
        const days: (Date | null)[] = [];

        // Add padding for days before the first of the month
        for (let i = 0; i < startPadding; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    }, [currentMonth]);

    const isDateAvailable = (date: Date | null): boolean => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Available if it's today or in the future, and not a Sunday
        return date >= today && date.getDay() !== 0;
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleNext = () => {
        if (step === 'date' && selectedDate) setStep('time');
        else if (step === 'time' && selectedTime) setStep('details');
        else if (step === 'details') setStep('confirm');
    };

    const handleBack = () => {
        if (step === 'time') setStep('date');
        else if (step === 'details') setStep('time');
        else if (step === 'confirm') setStep('details');
    };

    const handleConfirm = async () => {
        if (!selectedDate || !selectedTime) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const booking: BookingDetails = {
            providerId: provider.id,
            providerName: provider.name,
            date: selectedDate.toISOString(),
            time: selectedTime,
            visitType,
            reason
        };

        onConfirm(booking);
        setIsSubmitting(false);

        // Reset state
        setStep('date');
        setSelectedDate(null);
        setSelectedTime(null);
        setReason('');
    };

    const handleClose = () => {
        setStep('date');
        setSelectedDate(null);
        setSelectedTime(null);
        setReason('');
        onClose();
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={`Book with ${provider.name}`} maxWidth="lg">
            <div className="space-y-6">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2">
                    {['date', 'time', 'details', 'confirm'].map((s, i) => (
                        <React.Fragment key={s}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                step === s ? 'bg-primary text-white' :
                                ['date', 'time', 'details', 'confirm'].indexOf(step) > i ? 'bg-green-500 text-white' :
                                'bg-surface-hover text-text-tertiary'
                            }`}>
                                {['date', 'time', 'details', 'confirm'].indexOf(step) > i ? <CheckCircle size={16} /> : i + 1}
                            </div>
                            {i < 3 && <div className={`w-12 h-0.5 ${['date', 'time', 'details', 'confirm'].indexOf(step) > i ? 'bg-green-500' : 'bg-surface-hover'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step 1: Select Date */}
                {step === 'date' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                            <Calendar size={20} className="text-primary" />
                            Select a Date
                        </h3>

                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={prevMonth} className="p-2 hover:bg-surface-hover rounded-lg">
                                <ChevronLeft size={20} />
                            </button>
                            <h4 className="font-bold text-text-primary">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h4>
                            <button onClick={nextMonth} className="p-2 hover:bg-surface-hover rounded-lg">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-center text-xs font-bold text-text-tertiary py-2">
                                    {day}
                                </div>
                            ))}
                            {calendarDays.map((date, i) => (
                                <button
                                    key={i}
                                    onClick={() => date && isDateAvailable(date) && setSelectedDate(date)}
                                    disabled={!date || !isDateAvailable(date)}
                                    className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                                        !date ? 'invisible' :
                                        !isDateAvailable(date) ? 'text-text-tertiary cursor-not-allowed' :
                                        selectedDate?.toDateString() === date.toDateString() ? 'bg-primary text-white' :
                                        'hover:bg-surface-hover text-text-primary'
                                    }`}
                                >
                                    {date?.getDate()}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleNext} disabled={!selectedDate}>
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Select Time */}
                {step === 'time' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                            <Clock size={20} className="text-primary" />
                            Select a Time
                        </h3>
                        <p className="text-sm text-text-secondary">
                            {selectedDate && formatDate(selectedDate)}
                        </p>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {timeSlots.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                                        selectedTime === time
                                            ? 'bg-primary text-white'
                                            : 'bg-surface-hover hover:bg-primary/10 text-text-primary'
                                    }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <Button onClick={handleNext} disabled={!selectedTime}>Continue</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Visit Details */}
                {step === 'details' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-text-primary">Visit Details</h3>

                        {/* Visit Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-secondary">Visit Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setVisitType('video')}
                                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                                        visitType === 'video'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                >
                                    <Video className={visitType === 'video' ? 'text-primary' : 'text-text-tertiary'} />
                                    <div className="text-left">
                                        <div className="font-bold text-text-primary">Video Visit</div>
                                        <div className="text-xs text-text-secondary">Online appointment</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setVisitType('in-person')}
                                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                                        visitType === 'in-person'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                >
                                    <MapPin className={visitType === 'in-person' ? 'text-primary' : 'text-text-tertiary'} />
                                    <div className="text-left">
                                        <div className="font-bold text-text-primary">In-Person</div>
                                        <div className="text-xs text-text-secondary">At their office</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Reason for Visit */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-text-secondary">Reason for Visit (Optional)</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Briefly describe what you'd like to discuss..."
                                className="w-full px-4 py-3 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <Button onClick={handleNext}>Review Booking</Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 'confirm' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-text-primary">Confirm Your Appointment</h3>

                        <div className="bg-surface-hover rounded-2xl p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-bold text-text-primary">{provider.name}</div>
                                    <div className="text-sm text-text-secondary">{provider.role}</div>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4 space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar size={18} className="text-primary" />
                                    <span className="text-text-primary">{selectedDate && formatDate(selectedDate)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Clock size={18} className="text-primary" />
                                    <span className="text-text-primary">{selectedTime}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    {visitType === 'video' ? (
                                        <Video size={18} className="text-primary" />
                                    ) : (
                                        <MapPin size={18} className="text-primary" />
                                    )}
                                    <span className="text-text-primary">
                                        {visitType === 'video' ? 'Video Visit' : 'In-Person Visit'}
                                    </span>
                                </div>
                                {reason && (
                                    <div className="pt-2 border-t border-border">
                                        <p className="text-sm text-text-secondary">{reason}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-text-tertiary text-center">
                            By confirming, you agree to our cancellation policy.
                            You can cancel or reschedule up to 24 hours before your appointment.
                        </p>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={handleBack}>Back</Button>
                            <Button onClick={handleConfirm} disabled={isSubmitting}>
                                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default BookingModal;
