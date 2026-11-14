/**
 * MindMate consent gate (compliance item 5). Shown before the first message:
 * the chat renders only once the signed-in user has a consent at the current
 * text version. The server (api/ai/chat.ts) enforces the same rule; this
 * screen only collects the consent.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LifeBuoy } from 'lucide-react';
import {
    MINDMATE_CONSENT_AGREE,
    MINDMATE_CONSENT_CHANGE_SUMMARY,
    MINDMATE_CONSENT_INTRO,
    MINDMATE_CONSENT_LEAD,
    MINDMATE_CONSENT_NOT_NOW,
    MINDMATE_CONSENT_POINTS,
    MINDMATE_CONSENT_POLICY_HREF,
    MINDMATE_CONSENT_POLICY_LINK,
    MINDMATE_CONSENT_TITLE,
    MINDMATE_CONSENT_WITHDRAW,
    MINDMATE_RECONSENT_CLOSING,
    MINDMATE_RECONSENT_HEADING,
    MINDMATE_RECONSENT_REVIEW,
    MINDMATE_RECONSENT_TURN_OFF,
    MINDMATE_SESSION_GREETING,
    type MindMateConsentStatus,
} from '@/lib/ai/mindmateConsent';
import {
    getMindMateConsentStatus,
    grantMindMateConsent,
    withdrawMindMateConsent,
} from '@/services/mindmateDataService';

type GateState =
    | { kind: 'loading' }
    | { kind: 'error'; message: string }
    | { kind: 'status'; status: MindMateConsentStatus; reviewing: boolean };

interface MindMateConsentGateProps {
    /** "Not now" or "Turn off MindMate": leave MindMate. */
    onDecline: () => void;
    /**
     * The chat. `onConsentLost` re-checks consent, for when the server
     * rejects a request with CONSENT_REQUIRED (e.g. withdrawn in another tab).
     */
    children: (onConsentLost: () => void) => React.ReactNode;
    compact?: boolean;
}

const primaryBtn =
    'w-full px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50';
const secondaryBtn =
    'w-full px-5 py-3 border border-border text-text-primary hover:bg-surface-hover rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50';

export const MindMateConsentGate: React.FC<MindMateConsentGateProps> = ({ onDecline, children, compact }) => {
    const [state, setState] = useState<GateState>({ kind: 'loading' });
    const [busy, setBusy] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setState({ kind: 'loading' });
        try {
            const status = await getMindMateConsentStatus();
            setState({ kind: 'status', status, reviewing: false });
        } catch (err) {
            setState({ kind: 'error', message: err instanceof Error ? err.message : 'Could not load MindMate.' });
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

    const agree = async () => {
        setBusy(true);
        setActionError(null);
        try {
            await grantMindMateConsent();
            setState({ kind: 'status', status: 'current', reviewing: false });
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Could not turn on MindMate.');
        } finally {
            setBusy(false);
        }
    };

    const turnOff = async () => {
        setBusy(true);
        setActionError(null);
        try {
            await withdrawMindMateConsent();
            onDecline();
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Could not turn off MindMate.');
        } finally {
            setBusy(false);
        }
    };

    const pad = compact ? 'px-5 py-5' : 'px-6 py-10 max-w-2xl w-full mx-auto';
    const wrap = `relative z-10 flex-grow overflow-y-auto ${pad}`;

    if (state.kind === 'loading') {
        return (
            <div className={wrap} role="status" aria-live="polite">
                <p className="text-sm text-text-tertiary">Loading MindMate...</p>
            </div>
        );
    }

    if (state.kind === 'error') {
        return (
            <div className={wrap}>
                <p role="alert" className="text-sm text-text-secondary mb-4">{state.message}</p>
                <button type="button" className={primaryBtn} onClick={() => void load()}>
                    Try again
                </button>
            </div>
        );
    }

    if (state.status === 'current') {
        return <>{children(() => void load())}</>;
    }

    const errorLine = actionError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400 mt-3">{actionError}</p>
    );

    if (state.status === 'outdated' && !state.reviewing) {
        if (MINDMATE_CONSENT_CHANGE_SUMMARY === null) {
            throw new Error(
                'MindMate consent is outdated but MINDMATE_CONSENT_CHANGE_SUMMARY is not set for this version.',
            );
        }
        return (
            <section className={wrap} aria-labelledby="mindmate-reconsent-heading">
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    <strong id="mindmate-reconsent-heading" className="text-text-primary">{MINDMATE_RECONSENT_HEADING}</strong>{' '}
                    {MINDMATE_CONSENT_CHANGE_SUMMARY} {MINDMATE_RECONSENT_CLOSING}
                </p>
                <div className="space-y-2">
                    <button
                        type="button"
                        className={primaryBtn}
                        disabled={busy}
                        onClick={() => setState({ kind: 'status', status: 'outdated', reviewing: true })}
                    >
                        {MINDMATE_RECONSENT_REVIEW}
                    </button>
                    <button type="button" className={secondaryBtn} disabled={busy} onClick={() => void turnOff()}>
                        {MINDMATE_RECONSENT_TURN_OFF}
                    </button>
                </div>
                {errorLine}
            </section>
        );
    }

    return (
        <section className={wrap} aria-labelledby="mindmate-consent-title">
            <h2 id="mindmate-consent-title" className="font-display font-semibold text-lg text-text-primary mb-3">
                {MINDMATE_CONSENT_TITLE}
            </h2>
            <div className="text-sm text-text-secondary leading-relaxed space-y-3">
                <p>{MINDMATE_CONSENT_INTRO}</p>
                <p>{MINDMATE_CONSENT_LEAD}</p>
                <ul className="list-disc pl-5 space-y-2">
                    {MINDMATE_CONSENT_POINTS.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
                <p>{MINDMATE_CONSENT_WITHDRAW}</p>
                <p>
                    <Link
                        to={MINDMATE_CONSENT_POLICY_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover hover:underline font-medium"
                    >
                        {MINDMATE_CONSENT_POLICY_LINK}
                    </Link>
                </p>
            </div>
            <div className="space-y-2 mt-6">
                <button type="button" className={primaryBtn} disabled={busy} onClick={() => void agree()}>
                    {MINDMATE_CONSENT_AGREE}
                </button>
                <button type="button" className={secondaryBtn} disabled={busy} onClick={onDecline}>
                    {MINDMATE_CONSENT_NOT_NOW}
                </button>
            </div>
            {errorLine}
        </section>
    );
};

interface MindMateGreetingProps {
    /** Help Now: open crisis resources. Defaults to a link to /crisis. */
    onHelpNow?: () => void;
    className?: string;
}

/** Shown at the start of every MindMate session. */
export const MindMateGreeting: React.FC<MindMateGreetingProps> = ({ onHelpNow, className = '' }) => {
    const helpClass =
        'inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400';
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <p className="text-sm text-text-secondary leading-relaxed">{MINDMATE_SESSION_GREETING}</p>
            <div>
                {onHelpNow ? (
                    <button type="button" onClick={onHelpNow} className={helpClass}>
                        <LifeBuoy size={14} aria-hidden="true" /> Help Now
                    </button>
                ) : (
                    <Link to="/crisis" className={helpClass}>
                        <LifeBuoy size={14} aria-hidden="true" /> Help Now
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MindMateConsentGate;
