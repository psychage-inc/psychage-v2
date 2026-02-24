import React from 'react';
import { Phone } from 'lucide-react';

export const CrisisStickyBanner: React.FC = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-charcoal-950/80 backdrop-blur-md border-t border-white/10 p-4 sm:p-0 z-40 hidden sm:block shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
            <div className="max-w-4xl mx-auto flex items-center justify-between sm:px-4 sm:h-14">
                <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-crisis-red drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                    <span className="text-sm font-medium text-white tracking-wide">
                        In crisis? Call or text 988 (US)
                    </span>
                </div>

                <a
                    href="tel:988"
                    className="text-sm font-semibold text-crisis-red hover:text-red-700 transition-colors focus-visible:outline-none focus-visible:underline"
                >
                    Call Now
                </a>
            </div>
        </div>
    );
};
