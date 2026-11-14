import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { isAdultByBirthYear, isAgeGateLocked, lockAgeGate } from '@/lib/auth/ageGate';

// Counsel-approved copy (compliance item 5). Do not edit without counsel sign-off.
const UNDER_18_MESSAGE =
    'Psychage accounts are for adults 18 and over. You can still read our free articles and watch our videos. If you need help now, call or text 988.';

// The list spans 120 years so the options themselves do not reveal the cutoff.
const YEAR_SPAN = 120;

interface AgeGateProps {
    /** Called once the user picks a birth year that passes the gate. */
    onPass: () => void;
    /** Called when the user follows a link away from the blocked notice (e.g. to close a modal). */
    onLeave?: () => void;
}

const AgeGate: React.FC<AgeGateProps> = ({ onPass, onLeave }) => {
    const [locked, setLocked] = useState(() => isAgeGateLocked(new Date()));
    const [birthYear, setBirthYear] = useState('');
    const noticeRef = useRef<HTMLDivElement>(null);
    const lockedOnSubmit = useRef(false);

    useEffect(() => {
        if (locked && lockedOnSubmit.current) noticeRef.current?.focus();
    }, [locked]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: YEAR_SPAN + 1 }, (_, i) => currentYear - i);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const now = new Date();
        if (isAdultByBirthYear(Number(birthYear), now)) {
            onPass();
            return;
        }
        lockAgeGate(now);
        lockedOnSubmit.current = true;
        setLocked(true);
    };

    const linkClass = 'font-semibold text-primary hover:text-primary-hover hover:underline';

    return (
        <div>
            <div ref={noticeRef} role="status" tabIndex={-1} className="focus:outline-none">
                {locked && (
                    <div className="space-y-4 text-center">
                        <p className="text-text-primary leading-relaxed">{UNDER_18_MESSAGE}</p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                            <Link to="/learn" onClick={onLeave} className={linkClass}>
                                Browse articles
                            </Link>
                            <a href="tel:988" className={linkClass}>
                                Call 988
                            </a>
                            <a href="sms:988" className={linkClass}>
                                Text 988
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {!locked && (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="age-gate-birth-year" className="block text-sm font-medium text-text-primary">
                            What year were you born?
                        </label>
                        <select
                            id="age-gate-birth-year"
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            required
                            className="flex h-12 w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
                        >
                            <option value="" disabled>
                                Select year
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={birthYear === ''}>
                        Continue
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AgeGate;
