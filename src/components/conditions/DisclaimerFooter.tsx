import React from 'react';
import { Info } from 'lucide-react';
import { CONDITION_DISCLAIMER } from '@/types/condition';

/**
 * The fixed educational disclaimer shown verbatim at the foot of every condition page.
 */
const DisclaimerFooter: React.FC = () => (
    <footer className="mt-16 border-t border-border pt-6">
        <p className="flex items-start gap-2.5 text-sm text-text-tertiary">
            <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{CONDITION_DISCLAIMER}</span>
        </p>
    </footer>
);

export default DisclaimerFooter;
