import React from 'react';
import { Link } from 'react-router-dom';

export interface ConsentState {
    termsAccepted: boolean;
    privacyAccepted: boolean;
    dataProcessingAccepted: boolean;
    ageVerified: boolean;
    newsletterOptIn: boolean;
}

interface ConsentCheckboxesProps {
    consent: ConsentState;
    onChange: (consent: ConsentState) => void;
    compact?: boolean; // smaller text for modal usage
}

const ConsentCheckboxes: React.FC<ConsentCheckboxesProps> = ({ consent, onChange, compact }) => {
    const update = (field: keyof ConsentState, value: boolean) => {
        onChange({ ...consent, [field]: value });
    };

    const textSize = compact ? 'text-xs' : 'text-sm';
    const labelSize = compact ? 'text-xs' : 'text-sm';

    return (
        <div className="space-y-3">
            {/* Terms of Service — required */}
            <ConsentCheckbox
                id="consent-terms"
                checked={consent.termsAccepted}
                onChange={(v) => update('termsAccepted', v)}
                required
                textSize={textSize}
            >
                <span className={labelSize}>
                    I agree to the{' '}
                    <Link to="/legal/terms" className="text-primary hover:text-primary-hover hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                        Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/legal/privacy" className="text-primary hover:text-primary-hover hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                    </Link>
                    .
                </span>
            </ConsentCheckbox>

            {/* Data processing consent — required */}
            <ConsentCheckbox
                id="consent-data"
                checked={consent.dataProcessingAccepted}
                onChange={(v) => update('dataProcessingAccepted', v)}
                required
                textSize={textSize}
            >
                <span className={labelSize}>
                    I understand that my wellness data is stored locally on my device for privacy.
                    Psychage does not store or transmit my personal health information to its servers.
                    I can delete my data at any time from my device.
                </span>
            </ConsentCheckbox>

            {/* Age verification — required */}
            <ConsentCheckbox
                id="consent-age"
                checked={consent.ageVerified}
                onChange={(v) => update('ageVerified', v)}
                required
                textSize={textSize}
            >
                <span className={labelSize}>
                    I confirm that I am <strong>18 years of age or older</strong>.
                </span>
            </ConsentCheckbox>

            {/* Newsletter — optional, NOT pre-checked */}
            <ConsentCheckbox
                id="consent-newsletter"
                checked={consent.newsletterOptIn}
                onChange={(v) => update('newsletterOptIn', v)}
                textSize={textSize}
            >
                <span className={`${labelSize} text-text-tertiary`}>
                    I'd like to receive Psychage updates and mental health insights via email.
                    <span className="ml-1 text-text-tertiary/60">(optional)</span>
                </span>
            </ConsentCheckbox>
        </div>
    );
};

interface ConsentCheckboxProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
    textSize: string;
    children: React.ReactNode;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
    id,
    checked,
    onChange,
    required,
    children,
}) => (
    <div className="flex items-start space-x-3">
        <input
            id={id}
            type="checkbox"
            required={required}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer"
        />
        <label htmlFor={id} className="font-normal text-text-secondary leading-tight cursor-pointer">
            {children}
        </label>
    </div>
);

export const isConsentValid = (consent: ConsentState): boolean => {
    return consent.termsAccepted && consent.dataProcessingAccepted && consent.ageVerified;
};

export const defaultConsentState: ConsentState = {
    termsAccepted: false,
    privacyAccepted: false,
    dataProcessingAccepted: false,
    ageVerified: false,
    newsletterOptIn: false,
};

export default ConsentCheckboxes;
